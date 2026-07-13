import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../shared/Utilities/asyncHandler.js';
import { createUser, loginUser, deleteUser, getDashboard } from './users.services.js';
import { DeleteDTO, LoginDTO, SignUpDTO } from './users.types.js';


export const signUpController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.validated as SignUpDTO;
    const user = await createUser(data);
    req.userId = user;
    next()
})

export const loginController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.validated as LoginDTO;
    const user = await loginUser(data);
    req.userId = user;
    next()
})

export const deleteUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.validated as DeleteDTO
    const id = req.userId;
    await deleteUser(id, password);
    next()
})

export const dashboardController = asyncHandler(async (req: Request, res: Response) => {
    console.log("Cookie:", req.headers.cookie);
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    const id = req.userId;
    const data = await getDashboard(id);
    res.json({ "success": true, data });
})

export const manageNewSession = asyncHandler(async (req, res, next) => {
    console.log("Before:", req.session);

    req.session.userId = req.userId;

    req.session.save((err) => {
        console.log("Save error:", err);
        console.log("After:", req.session);

        if (err) {
            return next(err);
        }

        res.json({ success: true });
    });
});
export const logoutController = asyncHandler(async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ "success": true })
    })
})