import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import { useEffect } from "react";

const Index = () => {

    const { autenticado } = useAuth();
    useEffect(() => {
        console.error(autenticado);
    },[autenticado]);

    return (
        <div style={{ textAlign: 'center', width: '100%' }}>

            <h1>
    Bienvenido a <span className="brand-title" style={{ fontSize: '1.2em' }}>Tplan</span>
</h1>
            <p style={{ color: '#9ca3af', marginBottom: '30px', fontSize: '0.95rem' }}>
                Organiza, planifica y gestiona tus tareas de forma eficiente
            </p>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/users/register" className="nav-btn-main">
                    Regístrate
                </Link>
                <Link to="/users/login" className="nav-btn">
                     Inicia Sesión
                </Link>
                <Link to="/tasks/view" className="nav-btn">
                    Ir a las tareas
                </Link>
            </div>
        </div>
    );
};

export default Index;