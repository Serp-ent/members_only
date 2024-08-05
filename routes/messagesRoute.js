const express = require('express');
const messagesRouter = express.Router();
const controller = require('../controllers/messagesController');

messagesRouter.use(express.urlencoded({ extended: true }));

messagesRouter.get('/', controller.showMessages);
messagesRouter.post('/', controller.addMessages);

module.exports = messagesRouter;


