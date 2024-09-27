import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS
import authRoutes from "./routes/auth.route.js";
import quizRoutes from "./routes/quiz.route.js";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for CORS
app.use(cors()); // Enable CORS for all routes

// Middleware for parsing incoming request: req.body and data format: json
app.use(express.json());

// Middleware for parsing incoming cookies
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});
