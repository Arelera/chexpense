const express = require('express');
const app = express();
const cors = require('cors');
const expenseRouter = require('./routes/expense');
const userRouter = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// routes
app.use('/api/expense', expenseRouter);
app.use('/api/user', userRouter);

// error handler
app.use((error, req, res, next) => {
  console.log('ERROR: ', error);
  res.status(400).send(error.message);
});

module.exports = app;
