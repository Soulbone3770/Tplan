import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, NotFoundError } from "../errors/AppError.js";

const codeToStatus = ({
    "NOT_FOUND": 404,
    "CONFLICT": 409,
    "VALIDATION": 400,
    "UNAUTHENTICATED": 401,
    "FORBIDDEN": 403
});

export const notFoundErrorHandler: RequestHandler = (req, res, next) => {
    next(new NotFoundError("Error, ruta no encontrada"));
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if(res.headersSent) return next(err);

    if(err instanceof AppError){
        console.error(err);
        return res.status(codeToStatus[err.code]).json({
            ok: false,
            error: err.message,
            code: err.code
        });
    };

    console.error(err);

    res.status(500).json({
        ok: false,
        error: "Ocurrio un error insesperado en el servidor",
        code: "INTERNAL"
    });

}