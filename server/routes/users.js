
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const bearer = require('passport-http-bearer');
const jwt = require('jsonwebtoken');

// Get user
const User = require('../models/user');

// Register handle
router.post('/register', (req, res) => {

    //res.send('hello');
    const { name, email, password } = req.body;

    const newUser = new User({
        name,
        email,
        password
    });

    // Hash password
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
           newUser.password = hash;
            newUser.save()
                .then(user => {
                    const token = jwt.sign({ _id: user._id}, process.env.JWT);
                    res.header('x-auth-token', token).send({ _id: user._id, email: user._email});
                    res.send('User registered!');
                })
                .catch(err => console.log(err));
                    
        })
)});

// Login handle
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        email: email
        }).then(user => {
            if (!user) {
                console.log(null, false, { message: 'That email is not registered' });
            }
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign({ _id: user._id}, process.env.JWT);
                        res.header('x-auth-token', token).send({ _id: user._id, email: user._email});
                    } else {
                      console.log(null, false, { message: 'Password incorrect' });
                    }
                });
            }

    });

    }
);


router.post('/delete', (req, res) => {
    console.log(req.user);
    Note.deleteMany({ "author": req.user.email }, function (err) {
        if (err)
            res.send(err);
        else {
            console.log('test');
        }
    });
    User.findOneAndRemove({ email: req.user.email }, function (err) {
        if (err)
            res.send(err);
        else {
            console.log('test');
        }
    });
});

module.exports = router; 