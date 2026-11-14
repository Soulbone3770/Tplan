import { ForbiddenError, NotFoundError } from "../errors/AppError.js";
import type { estadosTarea, TaskInputType, TaskType, TaskUpdateType } from "../models/tasks.model.js";
import tasksRepository from "../repositories/tasks.repository.js";

const tasksService = {

    async create(taskInput: TaskInputType, userId: number): Promise<TaskType>{

        const task = await tasksRepository.insert(taskInput, userId);

        return task;

    },

    async getAll(userId: number): Promise<TaskType[]>{
        
        const tasks = await tasksRepository.selectAll(userId);

        return tasks;

    },

    async updateContent(TI: TaskUpdateType, userId: number) {

        const update = await tasksRepository.updateContent(TI, userId);

        if(update.affectedRows === 0) throw new NotFoundError("Tarea no encontrada tras actualizar");

    },

    async delete(id: number, userId: number): Promise<void> {

        const task = await tasksRepository.selectById(id);

        if(!task) throw new NotFoundError("Tarea no encontrada por ID para borrar");

        if(task.userId !== userId) throw new ForbiddenError("No tienes permiso para borrar esta tarea");

        await tasksRepository.delete(task.id);

    },

    async updateEstado(id: number, userId: number, estado: estadosTarea) {

        const resultado = await tasksRepository.updateEstado(id, userId, estado);

        if(resultado.affectedRows === 0) throw new NotFoundError("La tarea no fue encontrada para actualizar su estado");

    }

};

export default tasksService;