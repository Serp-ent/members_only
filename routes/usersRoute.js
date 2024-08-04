const express = require('express');
const controller = require('../controllers/usersController');

const usersRouter = express.Router();
usersRouter.use(express.urlencoded({ extended: true }));

usersRouter.get('/sign-up', controller.createUserGet);

usersRouter.post('/sign-up', controller.createUserPost);


module.exports = usersRouter;