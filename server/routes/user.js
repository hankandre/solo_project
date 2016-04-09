var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles Ajax request for user information if user is authenticated
router.post('/', function(req, res) {
    // check if logged in
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) {
        // send back user object from database
        res.send(req.body.email);
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});


module.exports = router;
