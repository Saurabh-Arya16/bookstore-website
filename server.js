const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
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


// Express session
app.use(session({
  secret: 'bookstore-secret',
  resave: true,
  saveUninitialized: true,
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
const quizRoutes = require('./routes/quiz');
app.use('/quiz', quizRoutes);
const rankingRoutes = require('./routes/ranking');
app.use('/ranking', rankingRoutes);
const communityRoutes = require('./routes/community');
app.use('/community', communityRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
