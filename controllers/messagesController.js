const { Messages } = require("../db/queries");
const { body, validationResult } = require('express-validator');

const showMessages = async (req, res) => {
  const messages = await Messages.getAllWithAuthors();
  messages.forEach(message => {
    message.added = message.timestamp.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  })


  res.render('posts', {
    messages,
    user: req.user
  });
}

const validateNewMessage = [
  body('title').trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ min: 1, max: 255 }).withMessage(`Title must be min 1 length and 255 max length`),
  body('text').trim()
    .notEmpty().withMessage('Please enter some text')
    .isLength({ max: 4096 }).withMessage(`Text must be maximum 4096 characters long`),
];

// TODO: add messages validations 
const addMessages = [
  validateNewMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO: on failure don't clear form
      // TODO: this should not get new messages from database
      const messages = await Messages.getAllWithAuthors();
      messages.forEach(message => {
        message.added = message.timestamp.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      })

      return res.status(400).render('posts', {
        messages,
        user: req.user,
        errors: errors.array(),
      });
    }

    await Messages.createMessage(req.body.title, req.body.text, req.user.id)
    res.redirect('/');
  },
]

module.exports = {
  showMessages,
  addMessages,
}