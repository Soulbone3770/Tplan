import { useCallback, useEffect, useState } from "react"
import useManageErrors from "../../../shared/hooks/useManageErrors";
import authService from "../services/auth.service";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: {children: React.ReactNode}) => {

    const[autenticado, setAutenticado] = useState(false);
    const[userId, setUserId] = useState<number | null>(null);
    const[loading, setLoading] = useState(true);
    const { error, fatalError, handleErrors, resetErrors } = useManageErrors();

    const authCheck = useCallback(async() => {

        setLoading(true);
        resetErrors();

        try {

            const data = await authService.authCheck();
            setAutenticado(data.autenticado ?? false);
            setUserId(data.userId ?? null);

        } catch(err) {
            handleErrors(err);
            console.error(fatalError ?? error);
        } finally {
            setLoading(false);
        }

    },[resetErrors, handleErrors, error, fatalError]);

    useEffect(() => {
        let cancelado = false;

        const get = async() => {
            if(!cancelado) await authCheck();
        }

        get();

        return () => { cancelado = true }
    },[authCheck]);

    return (
        <AuthContext value={{loading, userId, autenticado, authCheck }}>
            { children }
        </AuthContext>
    )

};

export default AuthProvider;