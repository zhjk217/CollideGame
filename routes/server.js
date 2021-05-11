
module.exports.Server = server => {

    const io = require('socket.io', { transports: ['WebSocket'] })(server);

    const socketio_redis = require("socket.io-redis");

    const config = require("./config.json");

    const rooms_workers = {};

    io.adapter(socketio_redis(config['redis-adapter']));

    const { Server_main } = require('./main/server_main');

    io.on("connection", socket => Server_main(socket, rooms_workers));

}