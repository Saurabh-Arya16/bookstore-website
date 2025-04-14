const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore=require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const Book = require('./models/Book'); // Import your Book model
require('dotenv').config();

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore';

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Bodyparser
app.use(express.urlencoded({ extended: true }));

//public images
app.use(express.static('public'));


// Express session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB connection string
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax'
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/support'));
app.use('/', require('./routes/books'));
app.use('/quiz', require('./routes/quiz'));
const rankingRoutes = require('./routes/ranking');
app.use('/ranking', rankingRoutes);
const communityRoutes = require('./routes/community');
app.use('/community', communityRoutes);
const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

// Automatically insert books if none exist
async function autoSeedBooks() {
  const count = await Book.countDocuments();
  if (count === 0) {
    await Book.insertMany([
      {
        image: "harry.jpg",
        title: "Harry Potter",
        author: "J.K. Rowling",
        description: "A magical journey of Harry Potter.",
        price: 399
      },
      {
        image: "mongo.png",
        title: "MongoDB in Action",
        author: "Jane Smith",
        description: "Understand MongoDB with real-world examples.",
        price: 499
      },
      {
        image: "node.png",
        title: "Node.js Mastery",
        author: "Dev Expert",
        description: "Become a backend expert with Node.js.",
        price: 599
      },
      {
        image: "lord.jpg",
        title: "Lord of rings",
        author: "J.R.R. Tolkien",
        description: "The journey to destroy the One Ring and defeat Sauron in Middle-earth.",
        price: 399
      },
      {
        image: "math.jpg",
        title: "Maths",
        author: "R.D. Sharma",
        description: "Learn mathematics.",
        price: 499
      },
      {
        image: "invisible.jpg",
        title: "Invisible Man",
        author: "H.G. Wells",
        description: "Journey of the invisible scientist.",
        price: 599
      },
      {
        image: "cs.jpg",
        title: "Computer Science",
        author: "Bill Gates",
        description: "The future is here.",
        price: 399
      },
      {
        image: "english.jpg",
        title: "English",
        author: "Jane Smith",
        description: "The universal language.",
        price: 499
      },
      {
        image: "php.jpg",
        title: "PHP",
        author: "SAM",
        description: "Learn PHP backend scripting.",
        price: 599
      },
      {
        image: "science.jpg",
        title: "Science",
        author: "SK Chand",
        description: "Explore the natural world.",
        price: 399
      },
      {
        image: "sql.jpg",
        title: "SQL",
        author: "Jake",
        description: "Create and query databases.",
        price: 499
      },
      {
        image: "web.jpg",
        title: "Web",
        author: "Elon",
        description: "Learn to build websites.",
        price: 599
      }
    ]);
    console.log("Books collection auto-seeded.");
  }
}
autoSeedBooks(); // Call it once on server start




const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res)=>{
  console.log(`Server running at http://localhost:${PORT}`)
})
