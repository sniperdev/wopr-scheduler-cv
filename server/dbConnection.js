import dotenv from 'dotenv';
dotenv.config();

import mysql from "mysql";

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.PORT,
})

db.connect((err)=>{
	if(err) console.log("Error connecting",err)
	else console.log("Connected to database")
})