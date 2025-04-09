const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  image:String,
  title: String,
  author: String,
  description: String,
  price: Number,
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', BookSchema);
