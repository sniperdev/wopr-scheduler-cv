import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.PORT,
})

app.listen(8800,()=>{
	console.log("Server is up and running on "+process.env.PORT)
})

db.connect((err)=>{
	if(err) console.log("Error connecting",err)
	else console.log("Connected to database")
})