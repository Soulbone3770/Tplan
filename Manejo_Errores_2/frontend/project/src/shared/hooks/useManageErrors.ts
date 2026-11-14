import { useCallback, useState } from "react";
import { ApiError } from "../lib/ApiError";
import { comprobarCorregible } from "../lib/corregibleErrors";

const useManageErrors = () => {

    const [error, setError] = useState("");
    const [fatalError, setFatalError] = useState("");

    const handleErrors = useCallback((err: unknown) => {
        if (err instanceof ApiError) {
            const esCorregible = comprobarCorregible(err.code)
            if (esCorregible) {
                setError(err.message);
            } else {
                setFatalError(err.message);
            }
            return
        }

        setFatalError("Ocurrio un error inesperado");
    },[]);

    const resetErrors = useCallback(() => {
        setError("");
        setFatalError("");
    },[]);

    return { error, fatalError, handleErrors, resetErrors };

};

export default useManageErrors;