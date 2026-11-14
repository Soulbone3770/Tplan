import useForm from "../../../shared/hooks/useForm";
import useRegisterUser from "../hooks/useRegisterUser";
import type { UserInputType } from "../types/UserType";
import { useNavigate } from "react-router-dom";

const RegisterUserForm = () => {

    const navigate = useNavigate();

    const { valores, handleOnChange, resetForm } = useForm<UserInputType>({"username": "", "email": "", "password": ""});
    const { register, loading, error, fatalError } = useRegisterUser();

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const exito = await register(valores);
        if(exito){
            resetForm();
            alert("Usuario registrado correctamente");
            navigate("/");
        }
    }

    if(fatalError) return <h2>{fatalError}</h2>

    return (
        <form onSubmit={handleSubmit}>
            {/* Quitamos el duplicado de aquí adentro; dejamos solo los campos */}
            
            <div>
                <label>Usuario</label>
                <input 
                    type="text" 
                    name="username" 
                    value={valores.username} 
                    onChange={handleOnChange} 
                    placeholder="Elige un nombre de usuario" 
                />
            </div>

            <div>
                <label>Correo Electrónico</label>
                <input 
                    type="email" 
                    name="email" 
                    value={valores.email} 
                    onChange={handleOnChange} 
                    placeholder="tucorreo@example.com" 
                />
            </div>

            <div>
                <label>Contraseña</label>
                <input 
                    type="password" 
                    name="password" 
                    value={valores.password} 
                    onChange={handleOnChange} 
                    placeholder="••••••••" 
                />
            </div>

            {error && <p role="alert" style={{ color: '#f87171' }}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Registrando..." : "Regístrate"}
            </button>
        </form>
    );
};

export default RegisterUserForm;