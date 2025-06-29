import mongoose  from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`MongoDB connected: DB Host - ${connectionInstance.connection.host}`);
        
    } catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);  // Re-throw the error to stop the server
    }
}


export default connectDB;

