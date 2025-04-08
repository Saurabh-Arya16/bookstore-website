const express = require('express');
const router = express.Router();
const HelpSupport = require('../models/HelpSupport');

// Help & Support form page
router.get('/support', (req, res) => {
  res.render('support');
});

// Handle form submission
router.post('/support', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.render('support', { error: 'Please fill in all fields' });
  }

  try {
    const newTicket = new HelpSupport({ name, email, subject, message });
    await newTicket.save();
    res.render('support', { success: 'Your message has been sent!' });
  } catch (err) {
    console.error(err);
    res.render('support', { error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
