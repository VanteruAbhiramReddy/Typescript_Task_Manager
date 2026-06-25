import { Router } from "express";
import authMiddleware from "../../shared/Middlewares/auth.middleware.js";
import { signUpController,loginController,manageNewSession,logoutController,deleteUserController, dashboardController } from "./users.controllers.js";
import validator from "../../shared/Utilities/validator.js";
import { signUpSchema,loginSchema, deleteSchema } from "./users.schemas.js";

const users = Router();

users.post('/signup',validator(signUpSchema),signUpController,manageNewSession);
users.post('/login',validator(loginSchema),loginController,manageNewSession);

users.delete('/logout',authMiddleware,logoutController)
users.post('/delete',validator(deleteSchema),authMiddleware,deleteUserController,logoutController)

users.get('/dashboard',authMiddleware,dashboardController);

export default users;