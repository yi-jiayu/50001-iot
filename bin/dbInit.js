var debug = require('debug')('50001-iot:db-setup');
var async = require('async');

var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);

var hash = 'meeting-rooms';
var rooms = [
  '59.2.mr',
  '59.3.qsr',
  '59.4.rr',
  '59.9.mr',
  '57.2.mr',
  '57.3.qsr',
  '57.4.rr',
  '57.9.mr',
  '55.2.mr',
  '55.3.qsr',
  '55.4.rr',
  '55.9.mr'
];

function dbInit(client) {
  async.forEach(rooms, function (room, callback) {
    client.hsetnx(hash, room, 'a', function (err, response) {
      if (err) {
        callback(err);
      } else {
        if (response) {
          debug(room + ' was set');
        } else {
          debug(room + ' already exists, skipped');
        }
        callback();
      }
    })
  }, function (err) {
    if (err) {
      debug(err);
    }
    process.exit();
  })
}

dbInit(client);
