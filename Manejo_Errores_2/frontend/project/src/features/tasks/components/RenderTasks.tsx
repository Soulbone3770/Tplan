import { useState } from "react";
import type { TaskType } from "../types/TasksType";
import EditTaskForm from "./EditTaskForm";
import DeleteTaskButton from "./DeleteTaskButton";
import EstadoSelect from "./EstadoSelect";

interface Props {
    tasks: TaskType[];
    loading: boolean;
    error: string;
    fatalError: string;
    getTasks: () => Promise<void>;
}

const RenderTasks = ({ tasks, loading, error, fatalError, getTasks }: Props) => {

    const [editando, setEditando] = useState<number | null>(null);

    const render = () => (
        tasks?.map(t => (
            editando === t.id
            ? <EditTaskForm key={t.id} task={t} onSubmit={() => {setEditando(null); getTasks()}} /> 
            :
                <div key={t.id}>
                    <h3>{t.titulo}</h3>
                    <p>{t.descripcion}</p>
                    <p>{t.fechaVencimiento}</p>
                    <EstadoSelect id={t.id} estado={t.estado} onUpdate={getTasks} />
                    <p>{t.prioridad}</p>
                    <button onClick={() => setEditando(t.id)} disabled={loading}>{editando ? "Guardar" : "Editar"}</button>
                    <DeleteTaskButton id={t.id} onDelete={getTasks} />
                </div>
        ))
    );

    if (fatalError) return <h2>{fatalError}</h2>

    return (
        <>
            {error && <p role="alert">{error}</p>}
            {tasks?.length === 0
                ? <p>No hay tareas</p>
                : render()
            }
        </>
    );
};

export default RenderTasks;