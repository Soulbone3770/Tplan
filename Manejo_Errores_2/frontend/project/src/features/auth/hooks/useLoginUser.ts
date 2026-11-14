import { useState } from "react";
import useManageErrors from "../../../shared/hooks/useManageErrors";
import type { AuthInputType } from "../types/UserAuthType";
import authService from "../services/auth.service";

const useLoginUser = () => {

    const[loading, setLoading] = useState(false);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const login = async(userInput: AuthInputType): Promise<boolean> => {

        setLoading(true);
        resetErrors();

        try {

            await authService.login(userInput);
            return true

        } catch(err) {
            handleErrors(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, fatalError };

};

export default useLoginUser;