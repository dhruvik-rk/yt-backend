import dotenv from 'dotenv';
dotenv.config({path: "./env"});
import { connectDB } from './db/index.js';
import { app } from './app.js';

//server connection with app
connectDB()
.then(() => {
    app.on("Error", (error) => {
        console.log("Connection error!! - ", error);
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server run at port ${ process.env.PORT }`);
    })
})
.catch((error) => {
    console.log("Connection error ", error);
})