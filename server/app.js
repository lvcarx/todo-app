const express = require('express');
const mongoose = require('mongoose');
const db_connection = require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require('path');
const auth = require('./middleware/auth');
const multer = require('multer');
const cloudinary = require("cloudinary");
const  { CloudinaryStorage } = require("multer-storage-cloudinary");

// Load api routes
const users = require('./routes/users.js');
const todo = require('./routes/todo.js');
const settings = require('./routes/settings.js');
const sections = require('./routes/sections.js');
const main = require('./routes/main.js');

// DB config
const db = process.env.DB_CONNECTION;

// connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

const server = express()

server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log(`Ready on Port ${process.env.PORT}`)
})

// Express body parser
server.use(express.urlencoded({ extended: true }));

// CORS
server.use(cors());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Body parser
server.use(express.json());
server.use(bodyParser.json());

server.use(cookieParser());

// use production build
server.use(express.static(path.join(__dirname, '../client/build')));
server.get('/*', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
}); 



  

server.use('/api/users', users);
server.use('/api/todo', auth, todo);
server.use('/api/settings', auth, settings);
server.use('/api/sections', auth, sections);