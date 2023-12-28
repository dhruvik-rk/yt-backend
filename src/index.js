import dotenv from 'dotenv';
dotenv.config({path: "./env"});
import connectDB from './db/index.js';
import { app } from './app.js';

const port = process.env.PORT;

//server connection with app
connectDB()
.then(() => {
    app.on(error, () => {
        console.log("Connection error!! - ", error);
    })

    app.listen(port || 8000, () => {
        console.log(`Server run at port ${ port }`);
    })
})
.catch((error) => {
    console.log("Connection error ", error);
})

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