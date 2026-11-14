import { useState } from "react";
import useManageErrors from "../../../shared/hooks/useManageErrors";
import type { estadosTarea } from "../types/TasksType";
import tasksService from "../services/tasks.service";

const useUpdateEstado = () => {

    const [loading, setLoading] = useState(false);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const updateEstado = async(id: number, estado: estadosTarea): Promise<boolean> => {

        setLoading(true);
        resetErrors();

        try {

            await tasksService.updateEstado(id, estado);
            return true;

        } catch (err) {
            handleErrors(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { updateEstado, loading, error, fatalError };


};

export default useUpdateEstado;