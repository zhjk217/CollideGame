
const { reset_solo, reset_next } = require("../maps/maps_reset");

const update_room = (room,update) => {

    room_check(room, update);

    room_countdown(room);

    reset_next(room);

}

module.exports = {
    update_room
}

const { parentPort } = require('worker_threads');

const Matter = require("matter-js");

const room_check = (room, update) => {
    if (room.playercount == room.playingPlayers) return;
    check_players(room);
    switch (room.status) {
        case "begin":
            if (!room.iswaiting) return;
            room.iswaiting = false;
            room.isReset = false;
            break;
        case "solo":
            room.iswaiting = true;
            room.phase = "playing";
            reset_solo(room);
            break;
        case "close":
            Matter.World.clear(room.engine.world);
            Matter.Engine.clear(room.engine);
            delete room;
            parentPort.postMessage(room.number);
            clearInterval(update);
            break;
        default:
    }
}

const check_players = (room) => {

    if (room.playercount > 1) {
        room.status = "begin";
        return;
    }
    if (room.playercount < 1) {
        room.status = "close";
        return
    }
    room.status = "solo";
}

const room_countdown = room =>{
    if (room.phase != "countdown") return;
        room.countdown -= 0.001 * 70 / 4;
}
