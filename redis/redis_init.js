var redis = require('redis');

var hash = 'room-availability';
var rooms = [
    'b59.l2.meetingrm',
    'b59.l3.meetingrm',
    'b59.l4.recrm',
    'b59.l9.meetingrm',
    'b57.l2.meetingrm',
    'b57.l3.meetingrm',
    'b57.l4.recrm',
    'b57.l9.meetingrm',
    'b55.l2.meetingrm',
    'b55.l3.meetingrm',
    'b55.l4.recrm',
    'b55.l9.meetingrm'
]

exports.redisInit = function (client) {
    rooms.forEach(function (room, index, array) {
        client.hexists(hash, room, function(err, exists) {
            console.log(room + ' exists; moving on');
            if (!exists) {
                console.log(room + ' is not initialised; initialising now');
                client.hset(hash, room, 'empty');
            }
        })
    });
    client.hgetall(hash, function(err, response) {
        console.log(response);
    });
};