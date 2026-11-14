
export interface UserType{
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string; 
}

export type NewUserType = Omit<UserType, "id" | "createdAt">

export type UserInputType = Omit<UserType, "id" | "createdAt" | "passwordHash"> & {
    password: string;
}

export type PublicUserType = Omit<UserType, "passwordHash">