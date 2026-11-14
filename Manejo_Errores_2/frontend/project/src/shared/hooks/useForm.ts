import { useState } from "react"

const useForm = <T extends object>(valoresIniciales: T) => {

    const [valores, setValores] = useState<T>(valoresIniciales);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValores(prev => ({
            ...prev,
            [e.target.name]: e.target.type !== "checkbox" ? e.target.value : (e as React.ChangeEvent<HTMLInputElement>).target.checked
        }))
    };

    const resetForm = () => {
        setValores(valoresIniciales);
    }

    return { valores, handleOnChange, resetForm };

};

export default useForm;