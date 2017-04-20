var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var game = require('./routes/game');
var user = require('./routes/user');

var app = express();

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/js', express.static(__dirname + '/public/controllers'));
app.use('/js', express.static(__dirname + '/public/mediators'));
app.use('/lib', express.static(__dirname + '/public/lib'));
app.use('/templates', express.static(__dirname + '/public/templates'));
app.use('/views', express.static(__dirname + '/public/views'));


app.use('/', index);
app.use('/game', game);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.write('error');
});

module.exports = app;