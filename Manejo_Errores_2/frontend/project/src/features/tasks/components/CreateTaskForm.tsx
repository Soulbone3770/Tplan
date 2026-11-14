import { useState } from "react";
import useForm from "../../../shared/hooks/useForm";
import useCreateTask from "../hooks/useCreateTask";
import { PRIORIDAD_TAREA, type prioridadTarea, type TaskInputType } from "../types/TasksType";

interface Props{
    onCreada: () => Promise<void>
}

const CreateTaskForm = ({ onCreada }: Props) => {

    const { loading, create, error, fatalError } = useCreateTask();
    const { valores, handleOnChange, resetForm } = useForm<TaskInputType>({"titulo": "", "descripcion": "", "fechaVencimiento": "", "prioridad": "" as prioridadTarea});
    const [creando, setCreando] = useState(false);

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();

        const exito = await create(valores);

        if(exito){
            await onCreada();
            resetForm();
            setCreando(false);
        }

    }

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="titulo" 
                placeholder="Título de la tarea" 
                value={valores.titulo} 
                onChange={handleOnChange}
            />
            <textarea 
                name="descripcion" 
                placeholder="Descripción de la tarea..." 
                value={valores.descripcion} 
                onChange={handleOnChange}
            />
            <input 
                type="date" 
                name="fechaVencimiento" 
                value={valores.fechaVencimiento} 
                onChange={handleOnChange}
            />
            <select disabled={loading} name="prioridad" value={valores.prioridad} onChange={handleOnChange}>
                <option value="">Prioridad...</option>
                {PRIORIDAD_TAREA.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>

            {error && <p role="alert">{error}</p>}

            <button type="submit" disabled={loading}>{loading ? "Creando..." : "Crear la tarea"}</button>
            <button onClick={(e) => {e.preventDefault(); setCreando(false); resetForm()}} disabled={loading}>Cancelar</button>

        </form>
    )

    if(fatalError) return <h2>{fatalError}</h2>

    return (
        <>
            {creando
                ? renderForm()
                : <button onClick={(e) => {e.preventDefault(); setCreando(true)}} disabled={loading}>Crear tarea</button>
            }
        </>
    )

};

export default CreateTaskForm;