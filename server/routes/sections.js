
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

// Authentification middleware
const auth = require('../middleware/auth');

// Get User & Settings
const User = require('../models/user');

// delete setting item handle
router.post('/create', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    console.log("Hey " + decoded);
    console.log(req.body);
    User.findOneAndUpdate({_id: decoded}, { $addToSet: { sections: req.body.sectionName } }, function(err,data)
    {
        if(!err){
            console.log("Updated");
        }
        if(err) {
            console.log(err);
        }
    });
});


router.post('/delete', auth, (req, res) => {
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