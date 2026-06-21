import { z } from 'zod'

export const emptySchema = z.object({});

export const getTaskSchema = z.object({
    id : z.number()
})

export const createTaskSchema = z.object({
    title: z.string().trim().min(5).max(50),
    description: z.string().optional(),
    completed: z.boolean().default(false).optional()
})

export const updateTaskSchema = z.object({
    id: z.number(),
    title: z.string().trim().min(5).max(50).optional(),
    description: z.string().trim().optional(),
    completed: z.boolean().default(false).optional(),
})

export const deleteTaskSchema = z.object({
    id: z.number()
})