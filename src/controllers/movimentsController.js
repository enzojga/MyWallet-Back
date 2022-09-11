import mongo from '../db/db.js';
import dayjs from 'dayjs';

const db = mongo();

async function creatMoviment(req, res) {
    const { user } = req.headers;
    const { type, value, description } = req.body;
    console.log(user);

    const userObj = await db.collection('users').findOne({name:user});

    await db.collection('moviments').insertOne({
        userId: userObj._id,
        type,
        value,
        description,
        date: dayjs().format("DD/MM")
    });

    res.sendStatus(200);
}

async function getMoviments(req, res) {

    const { user } = req.headers; 

    const userObj = await db.collection('users').findOne({name:user});

    const users = await db.collection("moviments").find({userId:userObj._id}).toArray();
    return res.send(users);

}

export { creatMoviment, getMoviments };