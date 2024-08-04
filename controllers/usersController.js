const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { User } = require('../db/queries');
const bcrypt = require('bcryptjs');

const alphaErr = 'must only contain letters'

// TODO: add validation for each field
// TODO: check if password is matching
const validateSignUpForm = [
  body('firstName').trim()
    .isAlpha().withMessage(`First name ${alphaErr}`),
];

const createUserPost = [
  validateSignUpForm,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('signup', {
        errors: errors.array(),
      });
    }

    // TODO: check if already exists user with that username
    const user = req.body;
    user.password  = await bcrypt.hash(user.password, 10);
    await User.create(user.firstName, user.lastName, user.userName, user.password);
  
    res.redirect('/');
  }),
]


const createUserGet = (req, res) => {
  res.render('signup');
}

module.exports = {
  createUserGet,
  createUserPost,
}