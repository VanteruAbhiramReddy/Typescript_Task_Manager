import express from 'express'
import { fetchTasks,postTask,updateTask,deleteTask, getTask } from './tasks.controllers.js';
import validator from '../../shared/Utilities/validator.js';
import authMiddleware from '../../shared/Middlewares/auth.middleware.js';
import { deleteTaskSchema,updateTaskSchema,createTaskSchema } from './tasks.schemas.js';

const tasks = express.Router()

tasks.use(authMiddleware)

tasks.get('/',fetchTasks);
tasks.get('/:id',getTask);
tasks.post('/',validator(createTaskSchema),postTask);
tasks.put('/',validator(updateTaskSchema),updateTask);
tasks.delete('/:id',deleteTask);

export default tasks;