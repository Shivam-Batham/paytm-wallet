import mongoose from "mongoose";
import {databaseName} from "../constants.js"

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${databaseName}`);
        console.log("db",databaseName)
        console.log(`mongoDB is connected...`,connectionInstance.connection.host);
    }catch(e){
        console.log("DB connection failed...");
        process.exit(1);
    }
}
 
export default connectDB;