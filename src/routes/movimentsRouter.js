import express from 'express';
import { creatMoviment,getMoviments } from '../controllers/movimentsController.js';

const movimentRouter = express.Router();

movimentRouter.get("/moviments",getMoviments);
movimentRouter.post("/moviments",creatMoviment);

export default movimentRouter;