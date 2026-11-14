import type { Request, Response, NextFunction } from "express"
import { ValidationError } from "../errors/AppError.js"

const checkFields = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for(const field of fields){
            if(!req.body[field]) throw new ValidationError("Todos los campos son necesarios");
        }

        next();
    }
}

export default checkFields;