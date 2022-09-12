import bcrypt from 'bcrypt';
import mongo from '../db/db.js';
import { v4 as uuid } from 'uuid';
import joi from 'joi';

const db = mongo();

const singUp = async (req, res) => {

    const useScheme = joi.object({
        name: joi.string().required().min(1),
        email: joi.string().required().min(1),
        password: joi.string().required().min(1),
    });
    const validation = useScheme.validate({ ...req.body }, { abortEarly: true });


    if (validation.error) {
        return res.sendStatus(422);
    }

    const { name, email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if(user){
        return res.sendStatus(409);
    }

    const hashPassowrd = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({ name, email, password: hashPassowrd });
    res.sendStatus(201);
}

const singIn = async (req, res) => {

    const useScheme = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    });
    const validation = useScheme.validate({ ...req.body }, { abortEarly: true });

    if (validation.error) {
        return res.sendStatus(422)
    }

    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        });
        return res.status(200).send(token);
    }

    res.status(404).send("Dados invalidos");
}

export {
    singIn,
    singUp
}
