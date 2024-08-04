const { Router } = require('express');
const messagesRouter = Router();
const controller = require('../controllers/messagesController');

messagesRouter.get('/', controller.showMessages);

module.exports = messagesRouter;


