var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/rooms', function(req, res, next) {
  req.app.client.hgetall('room-availability', function(err, response) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(response);
  })
});

router.get('/:room', function(req, res, next) {
  var room = req.params.room;
  req.app.client.hget('room-availability', room, function(err, response) {
    res.send(response);
  })
});


module.exports = router;
