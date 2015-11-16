var hash = 'room-availability';
var rooms = ['b57.l9.meetingrm', 'b57.l2.meetingrm'];

// var client = require('redis').createClient(process.env.REDIS_URL);

var init = function (client) {
    rooms.forEach(function (room, index, array) {
        client.hexists(hash, room, function(err, exists) {
            if (!exists) {
                client.hset(hash, room, 'empty');
            }
        })
    });
};

module.exports = init;
