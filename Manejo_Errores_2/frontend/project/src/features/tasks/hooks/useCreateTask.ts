import { useState } from "react";
import useManageErrors from "../../../shared/hooks/useManageErrors";
import type { TaskInputType } from "../types/TasksType";
import tasksService from "../services/tasks.service";

const useCreateTask = () => {

    const[loading, setLoading] = useState(false);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const create = async(taskInput: TaskInputType): Promise<boolean> => {

        setLoading(true);
        resetErrors();

        try {

            await tasksService.create(taskInput);
            return true;

        } catch(err) {
            handleErrors(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, create, error, fatalError };

};

export default useCreateTask;