const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore=require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
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




const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res)=>{
  console.log(`Server running at http://localhost:${PORT}`)
})
