import type { Request, Response, NextFunction } from "express"
import { UnauthenticatedError } from "../errors/AppError.js"

const getUserId = (userId: number | undefined) => {
    if(!userId) throw new UnauthenticatedError("No hay userId");
    return Number(userId);
};

export default getUserId;