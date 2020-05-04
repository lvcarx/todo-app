
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
    console.log(req.body);
    User.findOneAndUpdate({_id: decoded}, { $addToSet: { sections: req.body.sectionName } }, function(err,data)
    {
        if(!err){
            console.log("Updated");
            res.end();
        }
        if(err) {
            console.log(err);
        }
    });
});

// delete setting item handle
router.post('/fetch', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    User.find({_id: decoded})
    .then(todos => {
        return res.send(todos)
})});

router.post('/delete', auth, (req, res) => {
    const decoded = jwtDecode(req.body.token);
    User.updateOne({ _id: decoded }, { "$pull": { "sections": req.body.sections } }, { safe: true, multi: true }, function (err, obj) {
        //do something smart
        res.end();
    });

});

module.exports = router; 