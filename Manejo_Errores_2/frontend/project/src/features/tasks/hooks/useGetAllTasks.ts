import { useCallback, useEffect, useState } from "react";
import useManageErrors from "../../../shared/hooks/useManageErrors";
import type { TaskType } from "../types/TasksType";
import tasksService from "../services/tasks.service";

const useGetAllTasks = () => {

    const[loading, setLoading] = useState(true);
    const[tasks, setTasks] = useState<TaskType[]>([]);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const getTasks = useCallback(async() => {

        setLoading(true);
        resetErrors();

        try {

            const data = await tasksService.getAll();
            setTasks(data.data.items);

        } catch(err) {
            handleErrors(err);
        } finally {
            setLoading(false);
        }

    },[handleErrors, resetErrors]);

    useEffect(() => {

        let cancelado = false;

        const get = async() => {
            if(!cancelado) await getTasks();
        }

        get();

        return () => { cancelado = true }

    },[getTasks]);

    return { tasks, loading, error, fatalError, getTasks };

};

export default useGetAllTasks;