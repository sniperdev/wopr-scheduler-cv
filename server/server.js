import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();


app.listen(8800,()=>{
	console.log("Server is up and running on "+process.env.PORT)
})
