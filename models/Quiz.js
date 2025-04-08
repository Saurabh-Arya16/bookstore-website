const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number // index of the correct option
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);
