import express from 'express';
import { singIn, singUp } from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.post("/sing-up", singUp);
loginRouter.post("/sing-in", singIn);

export default loginRouter;