import { useState } from "react";
import useManageErrors from "../../../shared/hooks/useManageErrors";
import usersService from "../services/users.service";
import type { UserInputType } from "../types/UserType";

const useRegisterUser = () => {

    const[loading, setLoading] = useState(false);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const register = async(userInput: UserInputType): Promise<boolean> => {

        setLoading(true);
        resetErrors();

        try {

            await usersService.register(userInput);
            return true;

        } catch(err) {

            handleErrors(err);
            return false;

        } finally {
            setLoading(false);
        }

    };

    return { register, loading, error, fatalError };

};

export default useRegisterUser;