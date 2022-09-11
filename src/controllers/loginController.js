import bcrypt from 'bcrypt';
import mongo from '../db/db.js';
import { v4 as uuid } from 'uuid';

const db = mongo();

const singUp = async (req, res) => {
    const { name, email, password } = req.body;

    const hashPassowrd = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({ name, email, password: hashPassowrd });
    res.sendStatus(201);
}

const singIn = async (req, res) => {
    const {email,password} = req.body;

    const user = await db.collection("users").findOne({email});
    console.log(user, password);

    if (user && bcrypt.compareSync( password, user.password)) {
        const token = uuid();
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        });
        return res.status(200).send(token);
    }

    res.status(404).send("Dados invalidos");
}

export{
    singIn,
    singUp
}
