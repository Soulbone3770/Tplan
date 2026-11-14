import type { Request, Response } from "express";
import usersService from "../services/users.service.js";
import envGetter from "../config/envGetter.js";

const { JWT_SECRET_KEY } = envGetter();

const usersController = {

    async register(req: Request, res: Response){

        const user = await usersService.createUser(req.body);

        res.status(201).json({
            ok: true,
            user
        });

    },

    async login(req: Request, res: Response){

        const { token, maxAge } = await usersService.createSesion(req.body);

        res.cookie("token", token, {httpOnly: true, maxAge: maxAge, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"});

        res.status(200).json({
            ok: true
        })
    },

    async authCheck(req: Request, res: Response){
        const userId = req.userId;
        res.status(200).json({
            ok: true,
            autenticado: true,
            userId
        });
    }

};

export default usersController;