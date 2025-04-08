const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  title: String,
  author: String,
  popularity: Number, // Higher means more popular
});

module.exports = mongoose.model('Ranking', rankingSchema);
