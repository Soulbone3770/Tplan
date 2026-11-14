import type { Request, Response, NextFunction } from "express"
import pkg from 'jsonwebtoken'
import envGetter from "../config/envGetter.js";
import { ForbiddenError, UnauthenticatedError } from "../errors/AppError.js";

const jwt = pkg;

const { JWT_SECRET_KEY } = envGetter();

interface PayLoad{
    userId: number;
}

type EstadosFuncion = "auth" | "check";

const authCheck = (estado: EstadosFuncion) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.token

        if(!token){
            return estado === "auth" 
            ? next(new ForbiddenError("No tiene permiso para acceder a este recurso"))
            : estado === "check" 
            ? res.status(200).json({
                ok: true,
                autenticado: false
            })
            : next(new Error("EL ESTADO PUESTO DEL MIDDLEWARE authCheck ES INCORRECTO, POR FAVOR INGRESAR UN ESTADO VÁLIDO"))
        }

        try {
            
            const payload = jwt.verify(token, JWT_SECRET_KEY) as PayLoad;

            req.userId = payload.userId;

            next();

        } catch(err) {

            if(err instanceof jwt.JsonWebTokenError){
                return next(new UnauthenticatedError("Sesión inválida o vencida"));
            }
            next(err);

        }
    }
}

export default authCheck;