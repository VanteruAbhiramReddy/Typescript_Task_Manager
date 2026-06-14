import asyncHandler from '../../shared/Utilities/asyncHandler.js';
import { createUser,loginUser } from './users.services.js';
import { LoginDTO, SignUpDTO } from './users.types.js';

export const signUpController = asyncHandler(async (req,res,next) => {
    const data = req.validated as SignUpDTO;
    const user = await createUser(data);
    req.userId = user;
    next()
})

export const loginController = asyncHandler(async (req,res,next) => {
    const data = req.validated as LoginDTO; 
    const user = await loginUser(data);
    req.userId = user;
    next()
})

export const manageNewSession = asyncHandler(async (req,res) => {
    const id = req.userId;
    req.session.userId = id;

    res.json({"success":true})
})

export const logoutController = asyncHandler(async (req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie("connect.sid");
        res.json({"success":true})
    })
})