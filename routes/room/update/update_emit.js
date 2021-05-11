
const { Server } = require("socket.io");

const io = new Server();

const socket_redis = require("socket.io-redis");

io.adapter(socket_redis({ host: "localhost", port: 6379 }));

const { send_objs,send_players,send_lines,send_room } = require("../maps/maps_send");

const update_emit = (room) => {
    io.to("room-" + room.number).emit("update state",
        {
            players: send_players(room.players),
            maps: send_objs(room.obj.maps, room.obj,room.obj.event.obj),
            lines: send_lines(room.obj.maps, room.obj.constraint),
            room: send_room(room)
        }
    );
}

const player_emit = (id,player_option)=>{
    io.sockets.to(id).emit("getplace", player_option.place);
}

const rank_emit = (number,ranklist) => {
    io.to("room-" + number).emit("getRank",ranklist);
}

const chat_emit = (number,message) =>{
    io.to("room-" + number).emit("getChat",message);
}

module.exports = {
    update_emit,
    player_emit,
    rank_emit,
    chat_emit
}