const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const db_connection = require('dotenv').config()
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const auth = require('./middleware/auth');
// Load api routes
var users = require('./routes/users.js');

// DB config
const db = process.env.DB_CONNECTION;

// connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

const dev = process.env.NODE_ENV !== 'production'

const server = express()

server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log(`Ready on Port ${process.env.PORT}`)
})

// Express body parser
server.use(express.urlencoded({ extended: true }));

// Body parser
server.use(express.json());
server.use(bodyParser.json());

// Passport middleware


server.use(cookieParser());
server.use(passport.initialize());
server.use(passport.session());




server.get('/', auth, (req, res, next) => {
    res.send('protected');
    return next();
});



// protect
server.get('/#/');
server.get('/');

server.get('/dashboard/current', function (req, res, next) {
    res.send({ username: req.user.email });
    return next();
});

server.use('/users', users);

