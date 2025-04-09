const express = require('express');
const router = express.Router();
const Community = require('../models/Community');

// View all community posts
router.get('/', async (req, res) => {
  const posts = await Community.find({});
  res.render('community', { posts });
});

// Save a post
router.post('/save/:id', async (req, res) => {
  await Community.findByIdAndUpdate(req.params.id, { saved: true });
  res.redirect('/community');
});

// Delete a post
router.post('/delete/:id', async (req, res) => {
  await Community.findByIdAndDelete(req.params.id);
  res.redirect('/community');
});

// Add a post
router.post('/', async (req, res) => {
  const { name, email, topic, message } = req.body;
  await Community.create({ name, email, topic, message });
  res.redirect('/community');
});

module.exports = router;
