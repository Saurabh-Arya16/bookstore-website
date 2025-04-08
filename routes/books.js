const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Show all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('book', { books });
  } catch (err) {
    console.error(err);
    res.send('Error fetching books');
  }
});

router.get('/seed-books', async (req, res) => {
    await Book.deleteMany({});
    await Book.insertMany([
      {
        title: "Learn JavaScript",
        author: "John Doe",
        description: "A complete guide to mastering JS.",
        price: 399,
        level: "beginner"
      },
      {
        title: "MongoDB in Action",
        author: "Jane Smith",
        description: "Understand MongoDB with real-world examples.",
        price: 499,
        level: "intermediate"
      },
      {
        title: "Node.js Mastery",
        author: "Dev Expert",
        description: "Become a backend expert with Node.js.",
        price: 599,
        level: "advanced"
      }
    ]);
    res.send('Books seeded');
  });
  

module.exports = router;
