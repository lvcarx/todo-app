
const express = require('express');
const router = express.Router();
const jwtDecode = require('jwt-decode');

// Authentification middleware
const auth = require('../middleware/auth');

// Get Todo model
const Todo = require('../models/todo');

// create todo item handle
router.post('/create', auth, (req, res) => {
    const { name } = req.body;
    const decoded = jwtDecode(req.body.author);
    let author = decoded;
    const newTodo = new Todo({
        name,
        author
    });
    newTodo.save()
        .then(todo => {
           console.log(todo)
        })
        .catch(err => console.log(err));
});

// fetch todo item handle
router.post('/fetch', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    console.log(decoded);
    Todo.find({ author: decoded._id }).then(todos => {
        return res.send(todos)
        //console.log(todos)
    })
    .catch(err => console.log(err))
});

module.exports = router; 