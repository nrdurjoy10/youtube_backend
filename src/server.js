import dotenv, { config } from "dotenv";
import connectDB from "./db/connectDB.js";
import app from "./app.js";

dotenv/config({
    path: './.env'
})

connectDB().then(
    ()=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`Listening to port ${process.env.PORT}`);
        })
    }
).catch(
    (e)=>{
        console.log(`Connection to MongoDB failed!`);
        
    }
)

