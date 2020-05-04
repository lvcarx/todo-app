
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
            res.end();
        })
        .catch(err => console.log(err));
});

// delete todo item handle
router.post('/delete', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    const { author, todoItem } = req.body;
    Todo.findOneAndRemove({ _id: todoItem, author: decoded._id }, req.body, function (err, data) {
        if (!err) {
            console.log("Deleted");
            res.end();
        } 
    });
});

// delete todo item handle
router.post('/update', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    const { author, todoItem, favorite, done, category } = req.body;
    Todo.findOneAndUpdate({ _id: todoItem, author: decoded._id }, req.body, function (err, data) {
        if (!err) {
            console.log("Updated");
            res.end();
        }
    });
});

// fetch todo item handle
router.post('/fetch', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    console.log(decoded);
    Todo.find({ author: decoded._id }).then(todos => {
        return res.send(todos)
    })
        .catch(err => console.log(err))
});

module.exports = router; 