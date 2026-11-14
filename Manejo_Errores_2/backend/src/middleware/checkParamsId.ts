import type { Request, Response, NextFunction } from "express"
import { ValidationError } from "../errors/AppError.js";

const checkParamsId = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id <= 0) throw new ValidationError("El ID debe ser un número posotivo")
    next();
};

export default checkParamsId;