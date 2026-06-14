import { email, z } from "zod";

export const signUpSchema = z.object({
    name : z.string().min(1).max(50),
    email : z.email(),
    password : z.string().min(8).max(18)
})

export const loginSchema = z.object({
    email : z.email(),
    password : z.string().min(8).max(18)
})

