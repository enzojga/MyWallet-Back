import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

export default function mongo(){

    let conn;

    try{
        conn = mongoClient.db('myWallet');
        console.log("conectado");
        return conn;
    }catch(error){
        console.log(error);
        return error;
    }
}
