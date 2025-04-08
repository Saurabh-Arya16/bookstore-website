const express = require('express');
const router = express.Router();
const Ranking = require('../models/Ranking');

router.get('/', async (req, res) => {
  try {
    const rankedBooks = await Ranking.find().sort({ popularity: -1 }); // Descending
    res.render('ranking', { books: rankedBooks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
