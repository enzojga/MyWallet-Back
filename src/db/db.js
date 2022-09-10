import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function mongo(){

    let conn;

    try{
        conn = await mongoClient.db('myWallet');
        return conn;
    }catch(error){
        console.log(error);
        return error;
    }
}
