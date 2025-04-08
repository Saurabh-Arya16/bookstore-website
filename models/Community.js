const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Community', communitySchema);
