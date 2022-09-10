import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongo from './db/db.js';

const app = express();
app.use(cors());
app.use(express.json());

const db = mongo();


app.post("/sing-up", async (req, res) => {
    const { name, login, password } = req.body;

    const hashPassowrd = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ name, login, password: hashPassowrd });
    res.sendStatus(201);
});

app.post("/sing-in", async (req, res) => {
    const {name,password} = req.body;

    const user = await db.collection("users").findOne({name});
    console.log(user, password);

    if (user && bcrypt.compareSync( password, user.password)) {
        return res.sendStatus(200);
    }

    res.sendStatus(401);
})

app.listen(5000, () => { console.log("ouvindo porta 5000") });