import type { Request, Response } from "express"
import tasksService from "../services/tasks.service.js"
import getUserId from "../utils/getUserId.js";

const tasksController = {

    async register(req: Request, res: Response){

        const userId = getUserId(req.userId);

        const task = await tasksService.create(req.body, userId);

        res.status(201).json({
            ok: true,
            task
        });

    },

    async getAll(req: Request, res: Response){

        const userId = getUserId(req.userId);

        const tasks = await tasksService.getAll(userId);

        res.status(200).json({
            ok: true,
            data: { items: tasks }
        });

    },

    async editContent(req: Request, res: Response){

        const userId = getUserId(req.userId);

        await tasksService.updateContent(req.body, userId);

        res.status(200).json({
            ok: true
        });

    },

    async delete(req: Request, res: Response){

        const userId = getUserId(req.userId);

        await tasksService.delete(Number(req.params.id), userId);

        res.status(200).json({
            ok: true
        });
    },

    async changeEstado(req: Request, res: Response){

        const userId = getUserId(req.userId);

        await tasksService.updateEstado(req.body.id, userId, req.body.estado);

        res.status(200).json({
            ok: true
        });
    }

};

export default tasksController;