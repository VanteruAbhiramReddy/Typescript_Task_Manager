import { getTasks,putTask,dropTask,createTask, getTaskById } from "./tasks.services.js";
import asyncHandler from "../../shared/Utilities/asyncHandler.js";
import { createTaskDTO, deleteTaskDTO, getTaskDTO, updateTaskDTO } from "./tasks.types.js";
import { Request,Response } from "express";


export const fetchTasks = asyncHandler(async (req:Request, res:Response) => {
    const userId = req.userId;
    const tasks = await getTasks(userId);
    res.status(200).json({"success":true,tasks});
})

export const getTask = asyncHandler(async (req:Request<getTaskDTO>,res:Response)=>{
    const {id} = req.params;
    const userId = req.userId;;
    const task = await getTaskById(id,userId);
    res.status(200).json({"success":true,task})
})

export const postTask = asyncHandler(async (req:Request, res:Response) => {
    const data = req.validated as createTaskDTO;
    const userId = req.userId;
    const task = await createTask(data,userId);
    res.status(201).json({"success":true,task})
})

export const updateTask = asyncHandler(async (req:Request, res:Response) => {
    const userId = req.userId;
    const data = req.validated as updateTaskDTO;
    const task = await putTask(data,userId)
    res.json({ "success" : true, task })
})

export const deleteTask = asyncHandler(async (req:Request<deleteTaskDTO>, res:Response) => {
    const userId = req.userId;
    const {id} = req.params
    const data = await dropTask({id},userId);
    res.json({ "success": true, data });
})