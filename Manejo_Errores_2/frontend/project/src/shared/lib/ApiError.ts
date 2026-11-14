
export class ApiError extends Error{
    readonly code: string;
    readonly status: number;

    constructor(code: string, status: number, message: string){
        super(message);

        this.code = code;
        this.status = status;
        this.name = "ApiError";
    }
}