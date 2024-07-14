import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cors from "cors"

const app = express();

// .env
dotenv.config({
    path:"./.env"
})
// cors
app.use(cors())
app.use(express.json({limit:"100kb"}))
// recieving data from url
app.use(express.urlencoded({extended:true,limit:"50kb"}))
// for static file storage
app.use(express.static("public"))


// Routes imports
import userRouter from "./routes/userRoutes.js"

//routes middleware declearation
app.use("/api/v1/users",userRouter);

app.listen(process.env.PORT || 8080,()=>{
    console.log("paytm server started...",process.env.PORT || 8080);
    connectDB()
})

