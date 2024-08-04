const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { User } = require('../db/queries');
const bcrypt = require('bcryptjs');

const alphaErr = 'must only contain letters'
const lengthErr = 'must be minimum 1 and maximum 50 length'

// TODO: add validation for each field
// TODO: check if password is matching
const validateSignUpForm = [
  body('firstName').trim()
    .notEmpty().withMessage('First name cannot be empty')
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 50 }).withMessage(`First name ${lengthErr}`),

  body('lastName').trim()
    .notEmpty().withMessage('Last name cannot be empty')
    .isAlpha().withMessage(`Last name name ${alphaErr}`)
    .isLength({ min: 1, max: 50 }).withMessage(`Last name ${lengthErr}`),

  // TODO: check that the user name is not taken
  body('userName').trim()
    .notEmpty().withMessage('username cannot be empty')
    .isAlpha().withMessage(`username name ${alphaErr}`)
    // TODO: move general error message instead of hard coding 
    .isLength({ min: 1, max: 255 }).withMessage(`username must be minimum 1 and maxium 255 length`)
    .custom(async username => {
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        throw new Error(`A user with name ${username} alread exists`);
      }
    }),

  body('password').trim()
    .notEmpty().withMessage('Password cannot be empty')
    .isLength({ min: 8 }).withMessage('Password should be minium 8 characters'),

  body('passwordConfirm')
    .custom((value, { req }) => {
      console.log('password: ', req.body.password);
      console.log('passwordConfirm: ', value);
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }

      return true;
    }),
];

const createUserPost = [
  // WARNING: enable validation
  // validateSignUpForm,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('signup', {
        errors: errors.array(),
      });
    }

    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
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