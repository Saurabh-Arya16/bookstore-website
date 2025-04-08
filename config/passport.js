const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'No user found with this email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? done(null, user) : done(null, false, { message: 'Incorrect password' });
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // ✅ async/await instead of callback
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
