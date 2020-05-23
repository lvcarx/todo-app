
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

// Authentification middleware
const auth = require('../middleware/auth');

// Get User & Settings
const User = require('../models/user');
const Todo = require('../models/todo');
const Setting = require('../models/setting');

// Register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    
    let errors = []

    // check passwords match
    if (email < 6) {
        errors.push({ msg: 'E-Mail too short.' });
        //res.send('E-Mail too short.');
    }  
    if (password < 6) {
        errors.push({ msg: 'Password too short.' });
        //res.send('Password too short.');
    }  
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match.' });
        //res.send('Passwords do not match.');
    } 

    if (errors.length == 0) {
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
                        const newSettings = new Setting({
                            userID: user._id
                        });
                        newSettings.save()
                            .then(console.log('called'))
                            .catch(console.log('called'));
                        const token = jwt.sign({ _id: user._id}, process.env.JWT);
                        //res.header('x-auth-token', token).send({ _id: user._id, email: user._email});
                        //res.send({token: token});
                        res.send({token: token});
                    })
                    .catch(err => console.log(err));      
            })
    )} else {
        console.log("error-occured");
        res.send(errors);
    }
});

// Login handle
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        email: email
        }).then(user => {
            if (!user) {
                console.log(null, false, { message: 'That email is not registered' });
                return res.send("email-not-registered")
            }
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign({ _id: user._id}, process.env.JWT);
                        //res.header('x-auth-token', token).send({ _id: user._id, email: user._email});
                        return res.send({token: token});
                    } else {
                        console.log(null, false, { message: 'Password incorrect' });
                        return res.send("password-incorrect")
                    }
                });
            }

    });
    }
);

router.post('/auth', (req, res) => {
    try {
        var decoded2 = jwt.verify(req.body.token, process.env.JWT);
        console.log("did " + decoded2);
        const decoded = jwtDecode(req.body.token);
        User.findOne({
            _id: decoded._id
        }).then(user => {
            console.log(user.email);
            if (user == false) {
                return res.send("not-valid"); 
            } else {
                return res.send("valid"); 
            } 
        }) 
      } catch(err) {
        return res.send("not-valid");
      }
}) 

router.post('/currentUser', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    console.log(decoded._id);
    User.findOne({
        _id: decoded._id
    }).then(user => {
            return res.send({email: user.email, _id: user._id}); 
       }) 
}) 

router.post('/update', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    console.log(decoded._id);
     const { email, password, name } = req.body;
     User.findOneAndUpdate({ _id: decoded, email: email, password: password }, req.body, function (err, data) {
        if (!err) {
            res.end();
        }
    });
}) 

router.post('/delete', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    Todo.deleteMany({ "author": decoded._id }, function (err) {
        if (err)
            res.send(err);
        else {
            console.log('test');
            res.end();
        }
    });
    
    console.log(decoded._id);
    User.findOneAndRemove({ _id: decoded._id }, function (err) {
        if (err)
            res.send(err);
        else {
            res.end();
        }
    });
});

module.exports = router; 