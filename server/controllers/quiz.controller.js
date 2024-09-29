import Quiz from '../models/quiz.model.js';

export const createQuiz = async (req, res) => {
  try {
    console.log('Received quiz data:', JSON.stringify(req.body, null, 2));
    const newQuiz = new Quiz(req.body);
    console.log('Created new Quiz instance:', newQuiz);
    const savedQuiz = await newQuiz.save();
    console.log('Saved quiz:', savedQuiz);
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      console.error('Validation errors:', errors);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    if (error.name === 'MongoError') {
      console.error('MongoDB error:', error.message);
      return res.status(500).json({ message: 'Database Error', error: error.message });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};