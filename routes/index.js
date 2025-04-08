const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../utils/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('home', { user: req.user });
});

module.exports = router;
