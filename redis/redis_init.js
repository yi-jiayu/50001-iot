var redis = require('redis');
var debug = require('debug')('50001-iot:db-setup');

var hash = 'room-availability';
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

exports.redisInit = function (client) {
    rooms.forEach(function (room, index, array) {
        client.hexists(hash, room, function (err, exists) {
            if (!exists) {
                debug(room + ' is not initialised; initialising now');
                client.hset(hash, room, 'Available');
            } else {
                debug(room + ' exists; moving on');
            }
        })
    });
    client.hgetall(hash, function (err, response) {
        debug(response);
    });
};
