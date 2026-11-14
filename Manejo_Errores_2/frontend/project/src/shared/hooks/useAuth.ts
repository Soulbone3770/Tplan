import { useContext } from "react"
import { AuthContext } from "../../features/auth"

const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("Error con el contexto, revisa si la ruta esta dentro de <AuthProvider>");
    return context
};

export default useAuth;