import { createTaskSchema,updateTaskSchema,deleteTaskSchema,getTaskSchema } from "./tasks.schemas.js";
import {z} from 'zod'

export type createTaskDTO = z.infer<typeof createTaskSchema>
export type updateTaskDTO = z.infer<typeof updateTaskSchema>
export type deleteTaskDTO = z.infer<typeof deleteTaskSchema>
export type getTaskDTO = z.infer<typeof getTaskSchema>

export interface Task{
    id : number,
    title : string,
    description : string,
    completed : string,
    userId : number
}

export type deleteTaskType = Pick<Task,"id"|"userId">