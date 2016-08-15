'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const usf4 = require('./main/routes/usf4');
const sfv = require('./main/routes/sfv');

const app = express();

// Config
app.set('usf4-data-path', 'data/title/usf4/json');
app.set('sfv-data-path', 'data/title/sfv/json');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usf4', usf4);
app.use('/sfv', sfv);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler: will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler: no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err.stacktrace);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

app.disable('x-powered-by');

module.exports = app;
