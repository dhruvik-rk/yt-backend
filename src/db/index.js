import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//mongoDB connection
const connectDB = async () => {
    try {
        const connectionSTR = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        //console this statement
        //console.log(`\n MONGODB connected ! DB Host : ${connectionSTR}`);
        console.log(`\nMONGODB connected ! DB Host : ${connectionSTR.connection.host}`);
    } catch (error) {
        console.log(`MONGODB connection ERROR ${ error }`);
        process.exit(1);
    }
}

export { connectDB };

// another way to connect database
/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';
import express  from "express";
const app = express();

//use iife (imidiate excecution)
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log("Connection Error : ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App run at port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error : ", error);
        throw error;
    }
} )()
*/