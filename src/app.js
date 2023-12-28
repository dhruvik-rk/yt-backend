import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//configure cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) //you use ape.use() also instaed of this.

//configure express & syntax is : express.json([options])
app.use(express.json({limit:"16kb"})) //for json data
app.use(express.urlencoded({extended:true, limit:"16kb"})) //for dynamic url
app.use(express.static("public")) //here public is folder name

//configure cookieParser
app.use(cookieParser())

export { app };