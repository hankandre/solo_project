var express = require('express');
var router = express.Router();
var strava = require('strava-v3');


router.get('/:id', function(req, res) {
  strava.activities.get({}, function(err, payload) {
    console.log('strava-v3 err ', err);
    console.log('strava-v3 payload ', payload);
    res.send(payload);
  });
});

module.exports = router;
