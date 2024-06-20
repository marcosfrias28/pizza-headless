import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const createUserRouter = ({ userModel }) => {
    const userRouter = Router();

    const userController = new UserController({userModel});
    userRouter.get('/', userController.getUser)
    userRouter.get('/:id', userController.getById)
    userRouter.post('/', userController.create)

    return userRouter;
}


