import useAuth from "../../../shared/hooks/useAuth";
import useForm from "../../../shared/hooks/useForm";
import useLoginUser from "../hooks/useLoginUser";
import type { AuthInputType } from "../types/UserAuthType";
import { useNavigate } from "react-router-dom";

const LoginUserForm = () => {

    const navigate = useNavigate();
    const { authCheck } = useAuth();

    const { valores, handleOnChange, resetForm } = useForm<AuthInputType>({"username": "", "email": "", "password": "", "recuerdame": false});
    const { login, loading, error, fatalError } = useLoginUser();

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const exito = await login(valores);
        if(exito){
            await authCheck();
            resetForm();
            alert("Iniciaste sesión correctamente");
            navigate("/tasks/view");
        }
    }

    if(fatalError) return <h2>{fatalError}</h2>

    return (
        <form onSubmit={handleSubmit}>
            <h2>Inicia Sesión</h2>

            <div>
                <label>Usuario</label>
                <input type="text" name="username" value={valores.username} onChange={handleOnChange} placeholder="Ingresa tu usuario" />
            </div>

            <div>
                <label>Correo Electrónico</label>
                <input type="email" name="email" value={valores.email} onChange={handleOnChange} placeholder="tucorreo@example.com" />
            </div>

            <div>
                <label>Contraseña</label>
                <input type="password" name="password" value={valores.password} onChange={handleOnChange} placeholder="••••••••" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0' }}>
                <input type="checkbox" name="recuerdame" checked={valores.recuerdame} onChange={handleOnChange} id="recuerdame" style={{ width: 'auto', margin: 0 }} />
                <label htmlFor="recuerdame" style={{ margin: 0, cursor: 'pointer' }}>Recuérdame</label>
            </div>

            {error && <p role="alert" style={{ color: '#f87171' }}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Inicia sesión"}
            </button>
        </form>
    );
};

export default LoginUserForm;