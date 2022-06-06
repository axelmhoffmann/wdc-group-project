var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('609304362450-1tfan4m8cutuq818jb9573dggaoglnbr.apps.googleusercontent.com');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/login', function(req, res, next)
{
    // We have a standard login
    if ('user' in req.body && 'password' in req.body)
    {
        var username = req.body.user;
        var password = req.body.password;

        var success = true;
        // Find user in sql database

        if (success)
        {
            // TODO: add session token and stuff
            res.send(200);
        }
        else
        {
            res.send(401);
        }
    }
    // We have a google login
    else if ('token' in req.body)
    {
        var token = req.body.token;
        let email = null;
        // Process token
        async function verify()
        {
          const ticket = await client.verifyIdToken({
              idToken: token,
              audience: '609304362450-1tfan4m8cutuq818jb9573dggaoglnbr.apps.googleusercontent.com',
          });
          const payload = ticket.getPayload();
          const userid = payload['sub'];
          email = payload['email'];
        }

        verify().then(function()
        {
            // Add user to database if not there
        }).catch(function()
        {
            // Send 403 if fail
            res.sendStatus(403);
        });
    }
});

app.post('/signup', function(req, res, next)
{
    var username = req.body.user;
    var password = req.body.password;

    var success = true;
    // Add user to database

    if (success)
    {
        // ALSO LOG IN THE USER HERE
        res.sendStatus(200);
    }
    else
    {
        res.sendStatus(401);
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
