import type { NewUserType, UserType } from "../models/users.model.js";
import db from "../lib/dbPool.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { isMysqlError } from "../utils/isMysqlError.js";
import { ConflictError } from "../errors/AppError.js";

const toUser = (row: RowDataPacket): UserType => ({
    id: row.id,
    username: row.username,
    email: row.email,
    passwordHash: row.psw,
    createdAt: row.created_at
})

export const usersRepository = {

    async selectById(id: number): Promise<UserType | null> {

        const sqlSelect = "SELECT id, username, email, psw, created_at FROM users WHERE id = ?";

        const [resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [id]);

        return resultSelect[0] ? toUser(resultSelect[0]) : null;

    },

    async insertUser(newUser: NewUserType): Promise<UserType> {

        try {

            const sqlInsert = "INSERT INTO users(username, email, psw) VALUES(?, ?, ?)";

            const [resultInsert] = await db.query<ResultSetHeader>(sqlInsert, [newUser.username, newUser.email, newUser.passwordHash]);

            const user = await this.selectById(resultInsert.insertId);

            if(!user) throw new Error("Error, usuario no encontrado despues de insert");

            return user;

        } catch (err) {

            if(isMysqlError(err, "ER_DUB_ENTRY")){
                throw new ConflictError("El email ya esta en uso");
            }
            throw err;
        }
    },

    async selectByEmail(email: string): Promise<UserType | null>{

        const sqlSelect = "SELECT id, username, email, psw, created_at FROM users WHERE email = ?";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [email]);

        return resultSelect[0] ? toUser(resultSelect[0]) : null

    },

    async selectByUsernameAndEmail(username: string, email: string): Promise<UserType | null>{

        const sqlSelect = "SELECT id, username, email, psw, created_at FROM users WHERE username = ? AND email = ?";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [username, email]);

        return resultSelect[0] ? toUser(resultSelect[0]) : null

    }

}