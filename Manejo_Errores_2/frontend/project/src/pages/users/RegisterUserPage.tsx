import { RegisterUserForm } from "../../features/users";
import { Link } from "react-router-dom";

const RegisterUserPage = () => {

    return (
        <div>
            <h1>Registrate</h1>
            <RegisterUserForm />
            <Link to="/">Ir a la página principal</Link>
        </div>
        
    )
};

export default RegisterUserPage;