
export type ERRORS = "NOT_FOUND" | "CONFLICT" | "VALIDATION" | "UNAUTHENTICATED" | "FORBIDDEN"

export class AppError extends Error{
    readonly code: ERRORS;

    constructor(code: ERRORS, message: string){
        super(message);

        this.name = new.target.name;
        this.code = code;
    }
};

export class NotFoundError extends AppError{
    constructor(message = "Recurso no encontrado"){
        super("NOT_FOUND", message);
    }
};

export class ConflictError extends AppError{
    constructor(message = "Recurso en conflicto"){
        super("CONFLICT", message);
    }
}

export class ValidationError extends AppError{
    constructor(message = "Error de validación"){
        super("VALIDATION", message);
    }
}

export class UnauthenticatedError extends AppError{
    constructor(message = "Hubo un problema de autenticación"){
        super("UNAUTHENTICATED", message);
    }
}

export class ForbiddenError extends AppError{
    constructor(message = "Esta intentando acceder a un recurso sin el permiso necesario"){
        super("FORBIDDEN", message);
    }
}

