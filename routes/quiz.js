const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Show quiz
router.get('/', async (req, res) => {
  const quiz = await Quiz.findOne({});
  res.render('quiz', { quiz });
});

// Handle quiz submission
router.post('/submit', (req, res) => {
  const answers = Object.values(req.body);

  const resultMap = {
    'Maths': 0,
    'MongoDB': 0,
    'Node.js': 0,
    'English': 0,
    'Computer Science': 0,
    'Science': 0,
    'PHP': 0,
    'SQL': 0,
    'Harry Potter': 0,
    'Lord of the Rings': 0,
    'Invisible Man': 0,
    'Web Development': 0,
  };

  answers.forEach(ans => {
    if (resultMap[ans] !== undefined) {
      resultMap[ans]++;
    }
  });

  // Get book with highest count
  const recommended = Object.entries(resultMap).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  res.render('quiz-result', { recommended });
});

module.exports = router;
