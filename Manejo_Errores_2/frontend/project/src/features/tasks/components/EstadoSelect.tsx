import useForm from "../../../shared/hooks/useForm";
import useUpdateEstado from "../hooks/useUpdateEstado";
import type { estadosTarea } from "../types/TasksType";
import { ESTADOS_TAREA } from "../types/TasksType";

interface Props{
    id: number;
    estado: estadosTarea;
    onUpdate: () => Promise<void>;
}

const EstadoSelect = ({id, estado, onUpdate}: Props) => {

    const { valores, handleOnChange } = useForm({"estado": estado as estadosTarea});
    const { updateEstado, loading, error, fatalError } = useUpdateEstado();
    const ESTADOS_RESTANTES = ESTADOS_TAREA.filter(e => e !== estado);

    const handleOnClick = async(e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        if(fatalError) return alert(fatalError);
        if(error) return alert(error);

        const exito = await updateEstado(id, valores.estado);
        
        if(exito){
            onUpdate();
        }
    }

    return (
        <>
            <select name="estado" value={valores.estado} onChange={handleOnChange}>
                <option>{estado}</option>
                {ESTADOS_RESTANTES.map(e => (
                    <option key={e} value={e}>{e}</option>
                ))}
            </select>
            {valores.estado !== estado && <button onClick={(e) => handleOnClick(e)} disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>}
        </>
    )

};

export default EstadoSelect;