import mongo from '../db/db.js';
import dayjs from 'dayjs';

const db = mongo();

async function creatMoviment(req, res) {

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
    console.log(user,moviemnts);
    return res.send(moviemnts);

}

async function getAllMoviments(req, res) {

    const moviemnts = await db.collection("moviments").find({}).toArray();
    return res.send(moviemnts);

}


export { creatMoviment, getMoviments, getAllMoviments };