const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

// Create a new quiz
router.post('/', quizController.createQuiz);

// Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get a single quiz by id
router.get('/:id', quizController.getQuizById);

// Update a quiz
router.put('/:id', quizController.updateQuiz);

// Delete a quiz
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;