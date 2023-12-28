import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//mongoDB connection
const connectDB = async () => {
    try {
        const connectionSTR = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        //console this statement
        //console.log(`\n MONGODB connected ! DB Host : ${connectionSTR}`);
        console.log(`\n MONGODB connected ! DB Host : ${connectionSTR.connection.host}`);
    } catch (error) {
        console.log(`MONGODB connection ERROR ${ error }`);
        process.exit(1);
    }
}

export default connectDB;