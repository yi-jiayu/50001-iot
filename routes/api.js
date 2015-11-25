var debug = require('debug')('50001-iot:api');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.sendStatus(400);
});

router.get('/getRoomsNames', function (req, res) {
  req.app.client.hkeys('meeting-rooms', function (err, response) {
    if (!err) {
      res.set('Content-Type', 'application/json');
      res.send(response);
    }
  })
});


// returns an object containing rooms and their occupancy except for rooms with cubicles
router.get('/getRoomsStatus', function (req, res) {
  debug('get rooms');
  //
  //var origin = req.header('origin');
  //debug(origin);
  //res.header('Access-Control-Allow-Origin', origin);

  req.app.client.hgetall('meeting-rooms', function (err, response) {
    res.set('Content-Type', 'application/json');
    res.send(response);
  });
});

/*router.options('/getRooms', function(req, res) {
 var origin = req.header('origin');
 debug(origin);
 res.header('Access-Control-Allow-Origin', origin);
 res.header('Access-Control-Allow-Methods', 'GET');
 res.header('Access-Control-Allow-Headers', 'apiKey');
 res.end();
 });*/

router.get('/setRoomStatus', function (req, res) {
  debug('set room status');
  var room = req.query.room;
  var status = req.query.status;
  if (status === 'a' || status === 'o') {
    req.app.client.hexists('meeting-rooms', room, function (err, response) {
      debug('key exists' + response);
      if (response) {
        req.app.client.hset('meeting-rooms', room, status, function (err, response) {
          debug('hello');
          res.status(200);
          var resp = {};
          resp[room] = status;
          res.send(resp);
        });
      } else {
        res.sendStatus(400);
      }
    })
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
