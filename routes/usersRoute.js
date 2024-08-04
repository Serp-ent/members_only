const { Router } = require('express');
const usersRouter = Router();

usersRouter.get('/sign-up', (req, res) => {
  res.render('signup');
});

module.exports = usersRouter;