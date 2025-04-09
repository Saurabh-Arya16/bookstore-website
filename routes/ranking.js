const express = require('express');
const router = express.Router();
const Ranking = require('../models/Ranking');

router.get('/', async (req, res) => {
  const rankings = await Ranking.find().sort({ views: -1 });
  res.render('ranking', { rankings });
});

module.exports = router;
