require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const path = require("path");

const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'your_secret_key_here',  // Replace with a strong, random string
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// Routes
app.use("/", require("./routes/index"));
app.use("/quiz", require("./routes/quiz"));
app.use("/leaderboard", require("./routes/leaderboard"));
app.use("/review", require("./routes/review"));
app.use("/support", require("./routes/support"));
app.use("/login",require("./routes/login"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

