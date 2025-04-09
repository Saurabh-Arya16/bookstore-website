const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  bookTitle: String,
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Ranking', rankingSchema);
