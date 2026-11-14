import { LoginUserForm } from "../../features/auth"
import { Link } from "react-router-dom";

const LoginUserPage = () => {

    return (
        <div>
            <h1>Inicia sesión</h1>
            <LoginUserForm />
            <Link to="/">Ir a la página principal</Link>
        </div>
    )
};

export default LoginUserPage;