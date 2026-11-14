import { useState } from "react";

const useChangeEditando = () => {

    const[editando, setEditando] = useState(false);

    const change = () => {
        setEditando(!editando);
    }

    return { editando, change };

};

export default useChangeEditando;