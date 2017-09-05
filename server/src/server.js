const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('./config/config');
const configurePassport = require('./config/passport');
const auth = require('./routes/auth');
const api = require('./routes/api');
const {Users} = require('./services/users-service');

const app = express();


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // FIXME set to true when serving via https
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

const passport = configurePassport(Users());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

console.log(path.resolve(__dirname, '../../react-ui/build'));
app.use(express.static(path.resolve(__dirname, '../../react-ui/build')));

app.use(auth(passport));
app.use('/api', api());

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../../react-ui/build', 'index.html'));
});

module.exports = app;
