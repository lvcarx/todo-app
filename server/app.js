const express = require('express');
const mongoose = require('mongoose');
const db_connection = require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors");

const auth = require('./middleware/auth');

// Load api routes
const users = require('./routes/users.js');
const todo = require('./routes/todo.js');
const settings = require('./routes/settings.js');
const sections = require('./routes/sections.js');

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

server.use(cookieParser());

// CORS
server.use(cors());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', auth, (req, res, next) => {
    res.send('protected');
    return next();
});

// protect
server.get('/#/');
server.get('/');

server.use('/api/users', users);
server.use('/api/todo', todo);
server.use('/api/settings', settings);
server.use('/api/sections', sections);