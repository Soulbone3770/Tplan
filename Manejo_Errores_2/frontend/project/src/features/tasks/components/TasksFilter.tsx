import { ESTADOS_TAREA, PRIORIDAD_TAREA, type estadosTarea, type prioridadTarea} from "../types/TasksType";

interface Props{
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    valores: {estado: estadosTarea | undefined, prioridad: prioridadTarea | undefined};
    filter: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TaskFilter = ({ handleOnChange, valores, filter }: Props) => {

    return (
        <>
            <h2>Filtrar por estado</h2>
            <select name="estado" value={valores.estado} onChange={handleOnChange}>
                <option value="">ninguno</option>
                {ESTADOS_TAREA.map(e => (
                    <option key={e} value={e}>{e}</option>
                ))}
            </select>
            <h2>Filtrar por prioridad</h2>
            <select name="prioridad" value={valores.prioridad} onChange={handleOnChange}>
                <option value="">ninguno</option>
                {PRIORIDAD_TAREA.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
            <button onClick={(e) => filter(e)}>Filtrar</button>
        </>
    )

};

export default TaskFilter;