var express = require('express');
var router = express.Router();
var request = require('request');
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;



// Sends the Strava ID to strava to get their stats
router.get('/:id', function(req, res) {
  var options = {
    url: 'https://www.strava.com/api/v3/athletes/' + req.params.id + '/stats/',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Ratelimit-Limit': '600,30000',
      'Authorization': 'Bearer ' + STRAVA_ACCESS_TOKEN
    }
  }
  request
  .get(,
    function(err,httpResponse,body) {
      console.log('Error contacting Strava: ', err);
      console.log('httpResponse from Strava: ', httpResponse);
      console.log('Response from Strava: ', body);
      res.status(200).send(body);
  });

});

module.exports = router;
