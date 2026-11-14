import { useState } from "react";
import useManageErrors from "../../../shared/hooks/useManageErrors";
import type { TaskUpdateType } from "../types/TasksType";
import tasksService from "../services/tasks.service";

const useUpdateContentTask = () => {

    const[loading, setLoading] = useState(false);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const updateTask = async(taskInput: TaskUpdateType): Promise<boolean> => {

        setLoading(true);
        resetErrors();

        try {

            await tasksService.updateContent(taskInput);
            return true;

        } catch(err) {
            handleErrors(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, fatalError, updateTask};

};

export default useUpdateContentTask;