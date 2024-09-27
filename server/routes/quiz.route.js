import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz
} from "../controllers/quiz.controller.js";

const router = express.Router();

// Create a new quiz
router.post("/", createQuiz);

// Get all quizzes
router.get("/", getAllQuizzes);

// Get a single quiz by id
router.get("/:id", getQuizById);

// Update a quiz
router.put("/:id", updateQuiz);

// Delete a quiz
router.delete("/:id", deleteQuiz);

export default router;
