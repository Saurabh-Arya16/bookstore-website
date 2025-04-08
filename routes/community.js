const express = require('express');
const router = express.Router();
const Community = require('../models/Community');

// GET community page
router.get('/', async (req, res) => {
  try {
    const posts = await Community.find().sort({ date: -1 });
    res.render('community', { posts });
  } catch (err) {
    res.status(500).send('Error loading community');
  }
});

// POST new message
router.post('/post', async (req, res) => {
  const { name, message } = req.body;
  try {
    await Community.create({ name, message });
    res.redirect('/community');
  } catch (err) {
    res.status(500).send('Error saving message');
  }
});

module.exports = router;
