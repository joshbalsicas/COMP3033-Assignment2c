var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// import mongoose and globals
const mongoose = require('mongoose');
const config = require('./config/globals');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// web app endpoint routers
var indexRouter = require('./routes/index');
// api endpoint routers
const syncsRouter = require('./routes/api/syncs');

// import pacakges needed for swaggerui/openapi

// allows you to render a user-friendly swagger ui documentation page
const swaggerUI = require('swagger-ui-express'); 
// allows you to load a yaml file into an object
const YAML = require('yamljs'); 
// for parsing comments into openapi
const swaggerJSDoc = require('swagger-jsdoc'); 

var app = express();

// enable cors using npm package
var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize passport module
app.use(passport.initialize());
// implement Basic Strategy
passport.use(new BasicStrategy((username, password, done) => {
  if (username == 'jbalsicas' && password == 'xVqgtPqrJ8LhkOF0') {
    console.log('Admin authenticated successfully!');
    return done(null, username);
  } else {
    console.log(username + 'Tried to authenticate unsuccessfully!');
    return done(null, false);
  }
}));

app.use('/', indexRouter);
// enable endpoint
app.use(
  '/api/syncs',
  passport.authenticate('basic', {session: false}),
  syncsRouter
);

// connect to mongo db after the router configuration
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((message) => {
    console.log('Connected successfully!');
  })
  .catch((error) => {
    console.log('Error while connecting! ${error}');
  });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
