import mongo from '../db/db.js';

const db = mongo();

export default async function tokenVerify (req, res, next){
    const { authorization } = req.headers;
    const tokenHeader = authorization?.replace('Bearer ', '');
    const user = await db.collection("sessions").findOne({token: tokenHeader});
    console.log(tokenHeader);
    if(!user){
        return res.sendStatus(401);
    }
    
    next();
}

