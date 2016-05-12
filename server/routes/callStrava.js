var router = require('express').Router();
var db = require('../modules/connection');
var request = require('request');

const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;

router.get('/', function (req, res) {
  // console.log('"callStrava" req.user ', req);
  
  var options = {
    url: 'https://www.strava.com/api/v3/athlete/activities',
    headers: {
      'Authorization': 'Bearer ' + STRAVA_ACCESS_TOKEN + ''
    }
  };
  
  // db.any('SELECT')

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);

      var neededData = info.map(function (activity) {
        return {
          id: activity.id,
          user_id: activity.athlete.id,
          start_date: activity.start_date,
          distance: activity.distance,
          average_speed: activity.average_speed,
          elevation_gain: activity.elevation_gain,
          elapsed_time: activity.elapsed_time,
          moving_time: activity.moving_time
        };
      });



      db.any('SELECT * FROM strava WHERE strava_id = (SELECT strava_id FROM users where login_id = $1)', [req.user.login_id])
        .then(function (data) {
          var localData = new Set(data.map(function (activity) {
            return activity.activity_id;
          }));

          var insertData = neededData.filter(function (activity) {
            return !localData.has(activity.activity_id);
          });

          function Inserts(template, data) {
            if (!(this instanceof Inserts)) {
              return new Inserts(template, data);
            }
            this._rawDBType = true;
            this.formatDBType = function () {
              return data.map(d=>'(' + db.as.format(template, d) + ')').join(',');
            };
          }

          if (insertData > 0) {
            db.many('INSERT INTO strava (strava_id, activity_id, start_date, distance, average_speed, elevation_gain' +
              'elapsed_time, moving_time) VALUES $1 RETURNING *', Inserts('$1, $2, $3, $4, $5, $6, $7, $8', insertData))
              .then(function (data) {
                console.log(data);
                res.send(data);
              })
          }
        })
      
    }
  }

  request(options, callback);
});

module.exports = router;
