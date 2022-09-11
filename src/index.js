import express from 'express';
import cors from 'cors';
import { singIn, singUp } from './controllers/loginController.js';
import { getUsers } from './controllers/usersController.js';
import { creatMoviment,getMoviments } from './controllers/movimentsController.js';

const app = express();

app.use(cors());
app.use(express.json());


app.post("/sing-up", singUp);
app.post("/sing-in", singIn);

app.get("/users",getUsers);

app.get("/moviments",getMoviments);
app.post("/moviments",creatMoviment);

app.listen(5000, () => { console.log("ouvindo porta 5000") });