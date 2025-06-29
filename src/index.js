import dotenv from "dotenv";
dotenv.config({path: './.env'});  // Load environment variables from .env file

import connectDB from "./db/index.js";
import {app} from "./app.js"; // Import the app instance


connectDB()
    .then(()=>{
        app.on("error", (err)=>{
            console.error("Error in Express app:", err);
            process.exit(1);  // Exit the process if an error occurs in the Express app
        })

        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        })
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);  // Exit the process if connection fails
    })






































/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", ()=>{  // This will catch any errors that occur in the Express app 
                            // after the connection is established with MongoDB
            console.error("Error in Express app:", err);
            throw err;  // Re-throw the error to stop the server
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })

    } catch (err){
        console.error("Error connecting to MongoDB:", err);
    }
})()        // if e executed, this will be a no-op
        */

