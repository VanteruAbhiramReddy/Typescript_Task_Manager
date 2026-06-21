import db from "../../shared/db/db.js";
import AppError from "../../shared/Utilities/appError.js";
import { createTaskDTO,updateTaskDTO,deleteTaskDTO, Task,deleteTaskType } from "./tasks.types.js";

export async function getTasks(userId: number|unknown):Promise<Task[]> {
    const res = await db.query<Task>('SELECT * FROM TASKS WHERE USER_ID=$1;', [userId]);
    if (res.rows.length === 0) throw new AppError("Tasks not found", 404);
    return res.rows;
}

export async function getTaskById(id:string,userId:number|unknown):Promise<Task> {
    const Id = Number(id);
    const res = await db.query<Task>("SELECT * FROM TASKS WHERE USER_ID=$1 AND ID=$2 RETURNING *;",[Id,userId]);
    const data = res.rows[0]
    if(!data) throw new AppError("Task not found!",404);
    return data;
    
}

export async function createTask(data:createTaskDTO,userId:number|unknown):Promise<Task> {
    const { title, description} = data;
    const res = await db.query<Task>('INSERT INTO TASKS(TITLE,DESCRIPTION,USER_ID) VALUES($1,$2,$3) RETURNING *;', [title, description, userId]);
    return res.rows[0];
}

export async function putTask(data:updateTaskDTO,userId:number|unknown):Promise<Task> {
    const { id, title, description, completed } = data
    const Id = Number(id)
    const res = await db.query<Task>('UPDATE TASKS SET TITLE = $1, DESCRIPTION = $2, COMPLETED = $3 WHERE ID = $4 AND USER_ID = $5 RETURNING *', [title, description, completed, Id, userId]);
    if (res.rows.length === 0) throw new AppError("Task not found", 404);
    return res.rows[0];
}

export async function dropTask(data:deleteTaskDTO,userId:number|unknown):Promise<deleteTaskType> {
    const { id } = data;
    const Id = Number(id)
    const res = await db.query<deleteTaskType>('DELETE FROM TASKS WHERE ID = $1 AND USER_ID = $2 RETURNING *;', [Id, userId]);
    if (res.rows.length === 0) throw new AppError("Task not found", 404);
    return res.rows[0];
}