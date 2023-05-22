import express from "express";
const app = express();
import authRoute from "./routes/auth.js";
import datesRoute from "./routes/dates.js";
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/dates", datesRoute);

app.listen(8800, () => {
  console.log("Server is up and running");
});
