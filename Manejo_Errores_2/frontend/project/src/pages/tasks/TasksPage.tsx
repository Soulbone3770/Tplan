import { CreateTaskForm, RenderTasks, TasksFilter, useGetAllTasks, type TaskType } from "../../features/tasks";
import useForm from "../../shared/hooks/useForm";
import type { estadosTarea, prioridadTarea } from "../../features/tasks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TasksPage = () => {

    const { tasks, loading, error, fatalError, getTasks } = useGetAllTasks();
    const { valores, handleOnChange, resetForm } = useForm({ "estado": "" as estadosTarea, "prioridad": "" as prioridadTarea });

    const [busqueda, setBusqueda] = useState("");
    const [filtrando, setFiltrando] = useState(false);

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    const baseTasks: TaskType[] = tasks || [];
    
    const visibles: TaskType[] = baseTasks.filter(t => {
        const titulo = t.titulo || "";
        const coincideTitulo = titulo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEstado = !valores.estado || valores.estado === t.estado;
        const coincidePrioridad = !valores.prioridad || valores.prioridad === t.prioridad;
        
        return coincideTitulo && (filtrando ? (coincideEstado && coincidePrioridad) : true);
    });

    const filter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFiltrando(true);
    };

    const getAndBorrarFiltro = async () => {
        await getTasks();
        resetForm();
        setFiltrando(false);
    }
    
    return (
        <div className="tasks-container">
            <Link to="/" style={{ marginBottom: '20px', display: 'inline-block', width: 'auto' }}>← Volver al inicio</Link>
            
            <h1 style={{ textAlign: 'left', marginBottom: '6px' }}>
                Mis <span className="brand-title">Tareas</span>
            </h1>
            <p style={{ textAlign: 'left', marginBottom: '24px' }}>
                Organiza y gestiona tus pendientes de forma eficiente.
            </p>

            <CreateTaskForm onCreada={getAndBorrarFiltro} />
            
     
            <div style={{ margin: '20px 0' }}>
                <input 
                    type="text" 
                    placeholder="Buscar tarea por título..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

  
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                {filtrando ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <TasksFilter handleOnChange={handleOnChange} valores={valores} filter={filter} />
                        <button onClick={() => setFiltrando(false)} style={{ padding: '10px 16px', cursor: 'pointer' }}>Dejar de filtrar</button>
                    </div>
                ) : (
                    <button onClick={() => setFiltrando(true)} style={{ padding: '10px 16px', cursor: 'pointer' }}>Filtrar tareas</button>
                )}
                
                <button onClick={() => { resetForm(); setBusqueda(""); setFiltrando(false); getTasks(); }} style={{ padding: '10px 16px', cursor: 'pointer' }}>
                    Borrar filtro
                </button>
            </div>

            <RenderTasks tasks={visibles} loading={loading} error={error} fatalError={fatalError} getTasks={getAndBorrarFiltro} />
        </div>
    );

};

export default TasksPage;