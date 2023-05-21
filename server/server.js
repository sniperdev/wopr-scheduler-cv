import express from 'express';
const app = express();
import authRoute from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"


app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use("/api/auth", authRoute);

app.listen(8800,()=>{
	console.log("Server is up and running")
})
