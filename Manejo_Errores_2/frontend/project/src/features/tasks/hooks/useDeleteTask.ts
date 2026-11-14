import { useState } from "react"
import useManageErrors from "../../../shared/hooks/useManageErrors";
import tasksService from "../services/tasks.service";

const useDeleteTask = () => {

    const[loading, setLoading] = useState(false);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const deleteTask = async(id: number): Promise<boolean> => {

        setLoading(true);
        resetErrors();

        try {

            await tasksService.delete(id);
            return true;

        } catch(err){
            handleErrors(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTask, error, fatalError, loading};

};

export default useDeleteTask;