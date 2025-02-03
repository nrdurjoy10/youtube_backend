import express from "express";
import dotenv, { config } from "dotenv";

dotenv/config({
    path: './.env'
})

const app = express();

app.get('/', ((req, res) => {
    res.send('Hello from server!')
}))


app.listen(process.env.PORT, (()=>{
    console.log(`Listening to port ${process.env.PORT}`);
    
}))

