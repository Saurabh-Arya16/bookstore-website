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
        image:"harry.jpg",
        title: "Harry Potter",
        author: "J.K. Rowling",
        description: "A magical journey of Harry Potter.",
        price: 399,
        level: "beginner"
      },
      {
        image:"mongo.png",
        title: "MongoDB in Action",
        author: "Jane Smith",
        description: "Understand MongoDB with real-world examples.",
        price: 499,
        level: "intermediate"
      },
      {
        image:"node.png",
        title: "Node.js Mastery",
        author: "Dev Expert",
        description: "Become a backend expert with Node.js.",
        price: 599,
        level: "advanced"
      },
      {
        image:"lord.jpg",
        title: "Lord of rings",
        author: "J.R.R. Tolkien",
        description: "A magical journey of Harry Potter.",
        price: 399,
        level: "beginner"
      },
      {
        image:"math.jpg",
        title: "Maths",
        author: "R.D. Sharma",
        description: "Understand MongoDB with real-world examples.",
        price: 499,
        level: "intermediate"
      },
      {
        image:"invisible.jpg",
        title: "invisible man",
        author: "H.G. Wells",
        description: "Become a backend expert with Node.js.",
        price: 599,
        level: "advanced"
      },
      {
        image:"cs.jpg",
        title: "Computer Science",
        author: "J.K. Rowling",
        description: "A magical journey of Harry Potter.",
        price: 399,
        level: "beginner"
      },
      {
        image:"english.jpg",
        title: "English",
        author: "Jane Smith",
        description: "Understand MongoDB with real-world examples.",
        price: 499,
        level: "intermediate"
      },
      {
        image:"php.jpg",
        title: "PHP",
        author: "Dev Expert",
        description: "Become a backend expert with Node.js.",
        price: 599,
        level: "advanced"
      },
      {
        image:"science.jpg",
        title: "Lord of rings",
        author: "J.R.R. Tolkien",
        description: "A magical journey of Harry Potter.",
        price: 399,
        level: "beginner"
      },
      {
        image:"sql.jpg",
        title: "Maths",
        author: "R.D. Sharma",
        description: "Understand MongoDB with real-world examples.",
        price: 499,
        level: "intermediate"
      },
      {
        image:"web.jpg",
        title: "invisible man",
        author: "H.G. Wells",
        description: "Become a backend expert with Node.js.",
        price: 599,
        level: "advanced"
      }
    ]);
    res.send('Books seeded');
  });
  

module.exports = router;
