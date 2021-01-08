const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index.route');

const consts = require('./consts/consts');

const mongoose = require('mongoose');

const app = express();
//cors
var cors = require('cors');
app.use(cors());

//bodyParser
app.use(express.json());
app.use('/', indexRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

//db connection
mongoose.connect(consts.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Databse Connected!");
    //server code
    app.listen(consts.PORT, () => {
      console.log(`server is listening at http://localhost:` + consts.PORT);
    });
  })
  .catch(error => {
    console.log(error);
  });

module.exports = app;
