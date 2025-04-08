const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Book = require('../models/Book');

// Show quiz
router.get('/', async (req, res) => {
  const quiz = await Quiz.findOne(); // get the first quiz
  res.render('quiz', { quiz });
});

// Handle quiz submission
router.post('/submit', async (req, res) => {
  const quiz = await Quiz.findOne();
  const userAnswers = req.body;
  let score = 0;

  quiz.questions.forEach((question, index) => {
    if (parseInt(userAnswers[`q${index}`]) === question.correctAnswer) {
      score++;
    }
  });

  // Recommend a book based on score
  let recommendedBook;
  const allBooks = await Book.find();

  if (score >= 4 && allBooks.length >= 3) {
    recommendedBook = allBooks[2]; // Third book
  } else if (score >= 2 && allBooks.length >= 2) {
    recommendedBook = allBooks[1]; // Second book
  } else if (allBooks.length >= 1) {
    recommendedBook = allBooks[0]; // First book
  }

  res.render('quiz-result', { score, recommendedBook });
});

module.exports = router;
