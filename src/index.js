import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';


const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {console.log("ouvindo porta 5000")})