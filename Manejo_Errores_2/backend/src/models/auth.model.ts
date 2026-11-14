import type { UserType } from "./users.model.js";

export interface AuthDataType{
    expiresIn: string
    cookieOptions: object;
}

export type LoginInputType = Omit<UserType, "id" | "createdAt" | "passwordHash"> & {
    password: string;
    recuerdame: boolean;
}

export interface LoginReturnType{
    token: string;
    maxAge: number | undefined
}
