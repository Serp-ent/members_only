const { Messages } = require("../db/queries");

const showMessages = async (req, res) => {
  const messages = await Messages.getAllWithAuthors();
  res.render('posts', { messages });
}

module.exports = {
  showMessages,
}