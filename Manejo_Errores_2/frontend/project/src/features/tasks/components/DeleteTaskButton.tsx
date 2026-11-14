import useDeleteTask from "../hooks/useDeleteTask";

interface Props{
    id: number;
    onDelete: () => Promise<void>;
}

const DeleteTaskButton = ({id, onDelete}: Props) => {

    const { deleteTask, error, fatalError, loading} = useDeleteTask();

    const handleOnClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(error) return alert(error);
        if(fatalError) return alert(fatalError);

        const exito = await deleteTask(id);

        if(exito){
            onDelete();
        }
    }

    return (
        <>
            <button onClick={(e) => handleOnClick(e)} disabled={loading}>{loading ? "Borrando..." : "Borrar"}</button>
        </>
    )
};

export default DeleteTaskButton;