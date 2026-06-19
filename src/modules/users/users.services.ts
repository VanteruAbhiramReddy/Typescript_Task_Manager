import AppError from "../../shared/Utilities/appError.js";
import db from "../../shared/db/db.js";
import { DatabaseError } from "pg";
import bcrypt from 'bcrypt';
import { SignUpDTO, LoginDTO, UserAuthRow, UserIdRow } from "./users.types.js"
import { number } from "zod";

export async function createUser({ name, email, password }: SignUpDTO): Promise<number> {
    try {
        const hashed = await bcrypt.hash(password, 12);
        const res = await db.query<UserIdRow>('INSERT INTO USERS(NAME,EMAIL,PASSWORD) VALUES($1,$2,$3) RETURNING ID;', [name, email, hashed]);
        return res.rows[0].id;
    } catch (error) {
        if (error instanceof Error) {
            if (error instanceof DatabaseError && error.code === '23505') {
                throw new AppError('Email already registered', 409)
            }
            throw error;
        }
        throw error;
    }
}

export async function loginUser({ email, password }: LoginDTO): Promise<number> {
    const res = await db.query<UserAuthRow>('SELECT id,password from USERS WHERE email = $1;', [email]);
    const data = res.rows[0];

    if (!data) throw new AppError("Invalid Crendentials", 401);
    const verify = await bcrypt.compare(password, data.password);

    if (!verify) throw new AppError("Invalid Credentials!", 401);
    return data.id;
}

export async function deleteUser(id: number|unknown):Promise<number> {
    const res = await db.query<UserIdRow>('DELETE FROM USERS WHERE ID = $1 RETURNING ID;', [id]);
    const data = res.rows[0];
    if(!data) throw new AppError("User not found!",404);
    return data.id;
}