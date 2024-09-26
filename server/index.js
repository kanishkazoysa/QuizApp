import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware for enabling CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//  Middleware for parsing incoming request : req.body and data format : json
app.use(express.json());

// Middleware for parsing incoming cookies
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});
