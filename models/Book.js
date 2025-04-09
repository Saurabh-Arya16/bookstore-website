const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  image:String,
  title: String,
  author: String,
  description: String,
  price: Number,
  level: String // e.g. beginner/intermediate/advanced for future use
});

module.exports = mongoose.model('Book', BookSchema);
