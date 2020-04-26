
const express = require('express');
const router = express.Router();

// Authentification middleware
const auth = require('../middleware/auth');

// Get Todo model
const Todo = require('../models/todo');

// create todo item handle
router.post('/create', auth, (req, res) => {
    const { name, author } = req.body;
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
    //const author = req.body;
    console.log("no string" + req.body.data);
    //author.toString()
    console.log("string" + req.body.author);
    Todo.find({ author: req.body.author})
        .then(todos => {
            res.send(todos)})
        .catch(err => console.log(err))
});

module.exports = router; 