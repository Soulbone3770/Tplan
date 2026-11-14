import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { estadosTarea, TaskInputType, TaskType, TaskUpdateType } from "../models/tasks.model.js";
import db from '../lib/dbPool.js';

const toTask = (row: RowDataPacket) => ({
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    fechaVencimiento: row.fecha_vencimiento,
    estado: row.estado,
    prioridad: row.prioridad,
    userId: row.userId,
    createdAt: row.created_at
});

const tasksRepository = {

    async selectById(id: number): Promise<TaskType | null>{

        const sqlSelect = "SELECT id, titulo, descripcion, fecha_vencimiento, estado, prioridad, userId, created_at FROM tasks WHERE id = ?";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [id]);

        return resultSelect[0] ? toTask(resultSelect[0]) : null;
    },

    async insert(TI: TaskInputType, userId: number): Promise<TaskType> {

        const sqlInsert = "INSERT INTO tasks(titulo, descripcion, fecha_vencimiento, prioridad, userId) VALUES (?, ?, ?, ?, ?)";

        const[resultInsert] = await db.query<ResultSetHeader>(sqlInsert, [TI.titulo, TI.descripcion, TI.fechaVencimiento, TI.prioridad, userId]);

        const task = await this.selectById(resultInsert.insertId);

        if(!task) throw new Error("Error, no se encontro la tarea despues del insert");

        return task;

    },

    async selectAll(userId: number): Promise<TaskType[]> {

        const sqlSelect = "SELECT id, titulo, descripcion, fecha_vencimiento, estado, prioridad, userId, created_at FROM tasks WHERE userId = ? ORDER BY estado, prioridad";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [userId]);

        return resultSelect.map((t) => toTask(t));
    },

    async updateContent(TI: TaskUpdateType, userId: number): Promise<ResultSetHeader> {

        const sqlUpdate = "UPDATE tasks SET titulo = ?, descripcion =? , fecha_vencimiento = ?, prioridad = ? WHERE id = ? AND userId = ?";

        const[resultUpdate] = await db.query<ResultSetHeader>(sqlUpdate, [TI.titulo, TI.descripcion, TI.fechaVencimiento, TI.prioridad, TI.id, userId]);

        return resultUpdate;
    },

    async delete(id: number): Promise<void>{

        const sqlDelete = "DELETE from tasks WHERE id = ?";

        await db.query(sqlDelete, [id]);

    },

    async updateEstado(id: number, userId: number, estado: estadosTarea): Promise<ResultSetHeader>{

        const sqlUpdate = "UPDATE tasks SET estado = ? WHERE id = ? AND userId = ?";

        const[resultUpdate] = await db.query<ResultSetHeader>(sqlUpdate, [estado, id, userId]);

        return resultUpdate;
    }

};

export default tasksRepository;