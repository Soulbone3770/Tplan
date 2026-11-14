import { Navigate } from "react-router-dom";
import useAuth from "../../../shared/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode}) => {

    const { autenticado } = useAuth()

    if(!autenticado){
        return <Navigate to="/users/login" replace></Navigate>
    }

    return (
        children
    )
};

export default ProtectedRoute;