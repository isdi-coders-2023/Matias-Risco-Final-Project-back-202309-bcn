import { Router } from "express";
import { validate } from "express-validation";
import UsersRepository from "../repository/UsersRepository";
import UserController from "../controller/UserController";
import { addUserValidator } from "../model/validator";

const usersRepository = new UsersRepository();
const usersController = new UserController(usersRepository);
const userRouter = Router();

userRouter.post("/add", validate(addUserValidator), usersController.createUser);

export default userRouter;
