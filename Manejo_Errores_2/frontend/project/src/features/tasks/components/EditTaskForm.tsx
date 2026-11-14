import useUpdateContentTask from "../hooks/useUpdateContentTask";
import useForm from "../../../shared/hooks/useForm";
import type { prioridadTarea, TaskType, TaskUpdateType } from "../types/TasksType";
import { PRIORIDAD_TAREA } from "../types/TasksType";

interface Props{
    task: TaskType;
    onSubmit: () => void;
}

const EditTaskForm = ({ task, onSubmit }: Props) => {

    const { loading, error, fatalError, updateTask } = useUpdateContentTask();
    const { valores, handleOnChange, resetForm } = useForm<TaskUpdateType>({ "titulo": task.titulo, "descripcion": task.descripcion, "fechaVencimiento": task.fechaVencimiento, "prioridad": task.prioridad as prioridadTarea, "id": task.id });

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();

        const exito = await updateTask(valores);
        if(exito){
            onSubmit();
            resetForm();
        }
    }

    if (fatalError) return <h1>{fatalError}</h1>

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="titulo" value={valores.titulo} onChange={handleOnChange} />
            <textarea name="descripcion" value={valores.descripcion} onChange={handleOnChange} />
            <input type="date" name="fechaVencimiento" value={valores.fechaVencimiento} onChange={handleOnChange} />
            <p>{task.estado}</p>
            <select disabled={loading} name="prioridad" value={valores.prioridad} onChange={handleOnChange}>
                {PRIORIDAD_TAREA.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>

            {error && <p role="alert">{error}</p>}

            <button type="submit" disabled={loading}>{loading ? "Aplicando..." : "Editar"}</button>
            <button onClick={() => {onSubmit(); resetForm()}}>{loading ? "Cancelando..." : "Cancelar"}</button>

        </form>
    )

};

export default EditTaskForm;