import mongo from '../db/db.js';
import { v4 as uuid } from 'uuid';

const db = mongo();

async function getUsers(req,res){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const userToken = await db.collection("sessions").findOne({token});
    

    const user = await db.collection("users").findOne({_id:userToken.userId});
    if(user){
        delete user.password;
        delete user._id;
        return res.send(user);
    }
    return res.send(404);
}

export { getUsers }