import mongo from '../db/db.js';
import dayjs from 'dayjs';
import joi from 'joi';

const db = mongo();

async function creatMoviment(req, res) {

    const useScheme = joi.object({
        type: joi.string().required().min(1),
        value: joi.number().required().min(1),
        description: joi.string().required().min(1),
    });
    const validation = useScheme.validate({ ...req.body }, { abortEarly: true });

    if (validation.error) {
        return res.sendStatus(422);
    }


    const { type, value, description } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const user = await db.collection("sessions").findOne({token});

    console.log(user);

    if(type !== "deposit" && type !== "withdraw"){
        return res.sendStatus(422);
    }

    console.log(user);

    await db.collection('moviments').insertOne({
        userId: user.userId,
        type,
        value,
        description,
        date: dayjs().format("DD/MM")
    });

    res.sendStatus(200);
}

async function getMoviments(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const user = await db.collection("sessions").findOne({token});

    const moviemnts = await db.collection("moviments").find({userId:user.userId}).toArray();
    return res.send(moviemnts);

}

export { creatMoviment, getMoviments };