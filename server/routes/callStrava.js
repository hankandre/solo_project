var router = require('express').Router();
var db = require('../modules/connection');
var request = require('request');

const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;

router.get('/', function (req, res) {
	console.log('"callStrava" req.user ', req.user);

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
					activity_id: activity.id,
					strava_id: activity.athlete.id,
					start_date: activity.start_date,
					distance: activity.distance,
					average_speed: activity.average_speed,
					elevation_gain: activity.total_elevation_gain,
					elapsed_time: activity.elapsed_time,
					moving_time: activity.moving_time
				};
			});


			db.any('SELECT * FROM strava WHERE strava_id = (SELECT strava_id FROM users where login_id = $1)', [req.user.login_id])
				.then(function (data) {

					console.log(data);
					var localData = new Set(data.map(function (activity) {
						return activity.activity_id;
					}));

					console.log(localData);

					var insertData = neededData.filter(function (activity) {
						return !localData.has(activity.activity_id);
					});

					console.log(insertData);


					function Inserts(template, data) {
						if (!(this instanceof Inserts)) {
							return new Inserts(template, data);
						}
						this._rawDBType = true;
						this.formatDBType = function () {
							return data.map(d=>'(' + db.as.format(template, d) + ')').join(',');
						};
					}
					console.log(insertData.length);

					if (insertData.length > 0) {
			
						db.tx(function (t) {
							var queries = insertData.map(function (activity) {
								return t.one('INSERT INTO strava (activity_id, strava_id, start_date, distance, average_speed,' +
									'elevation_gain, elapsed_time, moving_time) VALUES (${activity_id}, ${strava_id}, ${start_date}, ' +
									'${distance}, ${average_speed}, ${elevation_gain}, ${elapsed_time}, ${moving_time})' +
									' RETURNING activity_id', activity);
							});

							return t.batch(queries);
						})
							.then(function (data) {
								console.log(data);
								res.send(data);
							})
							.catch(function (error) {
								console.log('Error doing mass insert for strava activities ', error);
								res.status(500).end();
							});
					}
				});
		}
	}

	request(options, callback);
});

module.exports = router;
