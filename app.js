const express = require('express');
const usersRouter = require('./routes/usersRoute');
const messagesRouter = require('./routes/messagesRoute');

const app = express();
app.set('view engine', 'ejs')

app.use('/', usersRouter);
app.use('/', messagesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});