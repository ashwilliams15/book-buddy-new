const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
module.exports = app;

app.use(morgan('dev'));

app.use(express.json());
//do I need this?
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/api', require('./api'));

//send all unmatched requests to entry index.html page?
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((req, res, next) => {
  const error = Error('page not found');
  error.status = 404;
  next(error);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
})
