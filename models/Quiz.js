const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
});

const QuizSchema = new mongoose.Schema({
  title: String,
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Quiz', QuizSchema);
