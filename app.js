const express = require('express');
const usersRouter = require('./routes/usersRoute');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const messagesRouter = require('./routes/messagesRoute');
const { User } = require('./db/queries');
const bcrypt = require('bcryptjs');

const app = express();
app.set('view engine', 'ejs')
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(new LocalStrategy(async (userName, password, done) => {
  try {
    const user = await User.findByUsername(userName);
    if (!user) {
      return done(null, false, { message: 'Incorrect credentials' });
    }
    // hash password before
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return done(null, false, { message: "Incorrect credentials" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use('/', usersRouter);
app.use('/', messagesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});