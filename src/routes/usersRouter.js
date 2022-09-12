import express  from "express";
import { getUsers } from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.get("/users", getUsers);

export default userRouter;