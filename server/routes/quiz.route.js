import express from "express";
import {
  createQuiz
} from "../controllers/quiz.controller.js";

const router = express.Router();

// Create a new quiz
router.post("/", createQuiz);



export default router;
