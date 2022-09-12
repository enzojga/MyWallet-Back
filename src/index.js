import express from 'express';
import cors from 'cors';
import tokenVerify from './middlewares/tokenMiddleware.js';
import movimentRouter from './routes/movimentsRouter.js';
import loginRouter from './routes/loginRouter.js';
import userRouter from './routes/usersRouter.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use(loginRouter);

app.use(tokenVerify);

app.use(movimentRouter);
app.use(userRouter);


app.listen(5000, () => { console.log("ouvindo porta 5000") });