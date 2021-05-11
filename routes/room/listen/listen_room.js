
const { initPlayer } = require('../../init/init_Room');

const { chat_emit } = require("../update/update_emit");

module.exports.listen = (room, message) => {
    {
        switch (message.to) {
            case "join":
                room.players[message.socket_id] = new initPlayer(message.name);
                chat_emit(room.number, "房間 ： " + room.players[message.socket_id].name + " 加入房間 ");
                room.playercount++;
                break;
            case "move":
                if (room.players[message.socket_id])
                    room.players[message.socket_id].move = message.move;
                break;
            case "message":
                chat_emit(room.number, room.players[message.socket_id].name+" ： " + message.message);
                break;
            case "leave":
                if (room.players[message.socket_id]) {
                    room.players[message.socket_id].isLeave = true;
                    chat_emit(room.number, "房間 ： " + room.players[message.socket_id].name + " 離開房間 ");
                }
                break;
            default:
        }
    }
}