const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: String,
  email: String,
  topic: String,
  message: String,
  saved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Community', communitySchema);
