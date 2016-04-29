var express = require('express');
var router = express.Router();
var strava = require('strava-v3');

// Sends the Strava ID to strava to get their stats
router.get('/:id', function(req, res) {
  strava.athletes.stats({id: req.params.id}, function(err, payload) {
    res.send(payload);
  });
});

module.exports = router;
