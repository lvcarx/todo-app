
const express = require('express');
const router = express.Router();
const jwtDecode = require('jwt-decode');

// Authentification middleware
const auth = require('../middleware/auth');

// Get Todo model
const Setting = require('../models/setting');

// delete setting item handle
router.post('/update', (req, res) => {
    const decoded = jwtDecode(req.body.token);
    Setting.findOneAndUpdate({userID: decoded}, req.body, function(err,data) {
        if(!err){
            console.log("Updated");
        }
    })
    .then(settings => {
        res.send(settings)
    });
});

// fetch setting item handle
router.post('/fetch', (req, res) => {
    const decoded = jwtDecode(req.body.token);
    Setting.findOne({ userID: decoded._id })
        .then(settings => {
            res.send(settings)
        })
        .catch(err => console.log(err))
});

module.exports = router; 