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
// Buy a book
router.post('/buy/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || !book.isAvailable) {
      return res.send("Book not available.");
    }

    // Simulate a purchase (in real app, this is where payment would go)
    book.isAvailable = false;
    await book.save();

    res.send(`<h1>Thank you for buying "${book.title}"!</h1><a href="/books">Back to Books</a>`);
  } catch (err) {
    res.status(500).send("Error during purchase.");
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
        price: 399
      },
      {
        image:"mongo.png",
        title: "MongoDB in Action",
        author: "Jane Smith",
        description: "Understand MongoDB with real-world examples.",
        price: 499
      },
      {
        image:"node.png",
        title: "Node.js Mastery",
        author: "Dev Expert",
        description: "Become a backend expert with Node.js.",
        price: 599
      },
      {
        image:"lord.jpg",
        title: "Lord of rings",
        author: "J.R.R. Tolkien",
        description: " the journey to destroy the One Ring and defeat the dark lord Sauron in the richly imagined world of Middle-earth.",
        price: 399
      },
      {
        image:"math.jpg",
        title: "Maths",
        author: "R.D. Sharma",
        description: "learn mathematics.",
        price: 499
      },
      {
        image:"invisible.jpg",
        title: "invisible man",
        author: "H.G. Wells",
        description: "journey of the scientist",
        price: 599
      },
      {
        image:"cs.jpg",
        title: "Computer Science",
        author: "Bill gates",
        description: "The future is here.",
        price: 399
      },
      {
        image:"english.jpg",
        title: "English",
        author: "Jane Smith",
        description: "The Universal language.",
        price: 499
      },
      {
        image:"php.jpg",
        title: "PHP",
        author: "SAM",
        description: "learn php",
        price: 599
      },
      {
        image:"science.jpg",
        title: "Science",
        author: "SK chand",
        description: "learn everything around us.",
        price: 399
      },
      {
        image:"sql.jpg",
        title: "SQL",
        author: "jake",
        description: "Create tables through queries.",
        price: 499
      },
      {
        image:"web.jpg",
        title: "Web",
        author: "ELon",
        description: "learn to make websites.",
        price: 599
      }
    ]);
    res.send('Books seeded');
  });

module.exports = router;
