const jwt = require('jsonwebtoken');
const User = require('../models/user');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        next();
        /*const decoded2 = jwtDecode(token);
        console.log(decoded2);
        User.findOne({
            _id: decoded2
        }).then(user => {
            if (!user) {
                console.log("USER NOT FOUND");
                             
            } else {
                console.log("USER FOUND");
                next();
            }
        })*/
    }
    catch {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;