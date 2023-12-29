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