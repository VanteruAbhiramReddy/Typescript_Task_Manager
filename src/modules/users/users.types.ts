import { signUpSchema,loginSchema } from "./users.schemas.js";
import {z} from 'zod'

export type SignUpDTO = z.infer<typeof signUpSchema>
export type LoginDTO = z.infer<typeof loginSchema>

export interface User{
    id:number;
    name:string;
    email:string;
    password:string
}

export type UserIdRow = Pick<User,"id">
export type UserAuthRow = Pick<User,"id"|"password">