export const ESTADOS_TAREA = ["pendiente", "en_progreso", "completada"] as const
export const PRIORIDAD_TAREA = ["alta", "media", "baja"] as const

export type estadosTarea = typeof ESTADOS_TAREA[number];
export type prioridadTarea = typeof PRIORIDAD_TAREA[number];

export interface TaskType{
    id: number;
    titulo: string;
    descripcion: string;
    fechaVencimiento: string;
    estado: estadosTarea;
    prioridad: prioridadTarea;
    userId: number;
    createdAt: string;
}

export type TaskInputType = Omit<TaskType, "id" | "estado" | "createdAt" | "userId" >
export type TaskUpdateType = Omit<TaskType, "estado" | "createdAt" | "userId">