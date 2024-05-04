import express from "express";
import dotenv from "dotenv";
dotenv.config()

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDb.js";
import cookieParser from "cookie-parser";


const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes)





app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on Port ${PORT}`);
});
