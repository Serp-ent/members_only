const express = require('express');
const controller = require('../controllers/usersController');
const auth = require('../controllers/authController');

const usersRouter = express.Router();
usersRouter.use(express.urlencoded({ extended: true }));

usersRouter.get('/sign-up', controller.createUserGet);
usersRouter.post('/sign-up', controller.createUserPost);

usersRouter.get('/log-in', controller.loginUserGet);
usersRouter.post('/log-in', controller.loginUserPost);

usersRouter.post('/log-out', controller.logoutUserPost);

usersRouter.use('/membership', auth.checkAuthentication);
usersRouter.get('/membership', controller.membershipGet);
usersRouter.post('/membership', controller.membershipPost);


usersRouter.use('/admin', auth.checkAuthentication);
usersRouter.get('/admin', controller.adminGet);
usersRouter.post('/admin', controller.adminPost);

module.exports = usersRouter;