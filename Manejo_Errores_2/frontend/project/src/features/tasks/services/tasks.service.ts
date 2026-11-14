import { apiClient } from "../../../shared/lib/apiClient";
import type { DataType } from "../../../shared/types/DataType";
import type { estadosTarea, TaskInputType, TaskType } from "../types/TasksType";

const tasksService = {

    create: async(taskInput: TaskInputType) => {
        return apiClient.post<TaskType>("/tasks/api/create", taskInput);
    },

    getAll: async() => {
        return apiClient.get<DataType<TaskType[]>>("/tasks/api/getAll");
    },

    updateContent: async(taskInput: TaskInputType) => {
        return apiClient.put("/tasks/api/updateContent", taskInput);
    },

    updateEstado: async(id: number, estado: estadosTarea) => {
        return apiClient.put("/tasks/api/updateEstado", {id, estado});
    },

    delete: async(id: number) => {
        return apiClient.delete(`/tasks/api/delete/${id}`);
    }

};

export default tasksService;