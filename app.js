const express = require('express');
const usersRouter = require('./routes/usersRoute');

const app = express();
app.set('view engine', 'ejs')

app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});