var router = require('express').Router();
var db = require('../modules/connection');

// Gets the companies that have signed up with the app, so their employees can specify who they work for
router.get('/', function(req, res) {
  // Attempts to connect to the database.

  db.many('SELECT * FROM companies')
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (error) {
      console.log('Error finding companies ', error);
      res.status(500).send(error);
    });

});

module.exports = router;
