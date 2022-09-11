import mongo from '../db/db.js';
import { v4 as uuid } from 'uuid';

const db = mongo();

async function getUsers(req,res){
    const users = await db.collection("users").find({}).toArray();
    return res.send(users);
}

export { getUsers }