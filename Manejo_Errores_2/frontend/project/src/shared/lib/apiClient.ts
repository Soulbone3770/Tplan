import { ApiError } from "./ApiError";

const API_URL = import.meta.env.VITE_API_URL;

interface ErrorBodyType{
    code?: string;
    error?: string;
}

const request = async <T>(path: string, init: Omit<RequestInit, "headers"> = {}): Promise<T> => {

    let res: Response;

    try {
        res = await fetch(`${API_URL}${path}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json " },
            signal: AbortSignal.timeout(10_000),
            ...init
        });
    } catch(err) {
        if(err instanceof DOMException && err.name === "TimeoutError"){
            throw new ApiError("TIMEOUT", 0, "El servidor tardó demasiado en responder");
        }
        throw new ApiError("NETWORK", 0, "Hubo un problema de conexión con el servidor, reinicia tu conexión");
    }

    const readJson = async(res: Response) => {
        try {
            return await res.json();
        } catch {
            return null
        }
    }

    const body = await readJson(res);

    if(!res.ok){
        const errBody = body as ErrorBodyType | null
        throw new ApiError(errBody?.code ?? "BAD_RESPONSE", res.status, errBody?.error ?? "Algo ha ido mal en el servidor");
    }

    if(body === null){
        throw new ApiError("BAD_RESPONSE", 500, "El servidor lanzó un error inesperado");
    }

    return body as T;

}

export const apiClient = {

    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
    put: <T>(path: string, body: unknown) => request<T>(path, {method: "PUT", body: JSON.stringify(body)}),
    delete: <T>(path: string) => request<T>(path, { method: "DELETE" })

}