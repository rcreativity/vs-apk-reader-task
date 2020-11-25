const express = require('express')
const mongoose = require('mongoose');
const createError = require('http-errors');
const dotenv = require('dotenv').config();

const app = express()

app.use(express.json());


// Initialize DB
require('./connection')();

const ApkRoute = require('./Routes/Apk.route');
app.use('/apk', ApkRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});