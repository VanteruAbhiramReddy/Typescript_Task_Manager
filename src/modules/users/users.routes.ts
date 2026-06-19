import { Router } from "express";
import authMiddleware from "../../shared/Middlewares/auth.middleware.js";
import { signUpController,loginController,manageNewSession,logoutController,deleteUserController } from "./users.controllers.js";
import validator from "../../shared/Utilities/validator.js";
import { signUpSchema,loginSchema } from "./users.schemas.js";

const users = Router();

users.post('/signup',validator(signUpSchema),signUpController,manageNewSession);
users.post('/login',validator(loginSchema),loginController,manageNewSession);

users.delete('/logout',authMiddleware,logoutController)
users.delete('/delete',authMiddleware,deleteUserController,logoutController)

export default users;