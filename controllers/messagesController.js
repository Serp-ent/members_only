const { Messages } = require("../db/queries");

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

module.exports = {
  showMessages,
}