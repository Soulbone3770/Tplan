import { useEffect, useState } from "react";
import useForm from "./useForm";

interface Props<T>{
    criterioBusqueda: keyof T;
    arrayBusqueda: T[];
}

const useSearchBar = <T extends object>({criterioBusqueda, arrayBusqueda}: Props<T>) => {

    const[array, setArray] = useState<T[]>(arrayBusqueda);
    const { valores, handleOnChange } = useForm({"criterio": ""});

    useEffect(() => {
        const get = () => {
            setArray(arrayBusqueda)
        };

        get();
    },[arrayBusqueda]);

    const filter = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(valores.criterio === "") return setArray(arrayBusqueda);
        setArray(array.filter(e => String(e[criterioBusqueda]).toLowerCase().startsWith(valores.criterio.toLowerCase())));
    }

    const renderBarra = () => (
        <>
            <form onSubmit={filter}>
                <label>Barra de búsqueda</label>
                <input type="text" name="criterio" value={valores.criterio} onChange={handleOnChange} />
                <button type="submit">Buscar</button>
            </form>
        </>
    )
        
    return { array, filter, renderBarra };

};

export default useSearchBar;