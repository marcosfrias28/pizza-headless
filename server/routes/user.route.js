import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const createUserRouter = ({ userModel }) => {
    const userRouter = Router();

    const userController = new UserController({userModel});

    userRouter.post('/login', userController.login)
    userRouter.post('/logout', userController.logout)
    userRouter.post('/register', userController.register)

    return userRouter;
}


