import { signUpSchema,loginSchema } from "./users.schemas.js";
import {z} from 'zod'

export type SignUpDTO = z.infer<typeof signUpSchema>
export type LoginDTO = z.infer<typeof loginSchema>