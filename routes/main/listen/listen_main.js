
const join = (socket, player, room, room_number) => {
    socket.join("room-" + room_number);
    player.isJoin = true;
    player.to = "join";
    player.inRoom = room_number;
    room.playercount++;
    room.work.postMessage(player);
}

const { initRoomWorker } = require("../../init/init_Main");

const findroom = (socket, playerData, name, rooms, find_number) => {
    playerData.name = name;
    if (!rooms[find_number]) {
        rooms[find_number] = new initRoomWorker(find_number);
    }
    if (rooms[find_number].playercount >= 4) {
        findroom(socket, playerData, name, rooms, ++find_number);
        return;
    }
    join(socket, playerData, rooms[find_number], find_number);
    socket.emit("inRoom", playerData.inRoom);
    console.log(socket.id + "in the " + playerData.inRoom);
}

const private_room = (socket, playerData, name, rooms) =>{
    playerData.name = name;
    let roll = 
    rooms[find_number] = new initRoomWorker(find_number);
}

const Move = (player, move, room) => {
    if (!room) return;
    player.move = move;
    player.to = "move";
    room.work.postMessage(player);
}

const player_message = (player, room, message) => {
    if (!room) return;
    player.message = message;
    player.to = "message";
    room.work.postMessage(player);
}

const leaveGame = (player, rooms) => {
    if (!rooms[player.inRoom]) return;
    player.to = "leave";
    rooms[player.inRoom].playercount--;
    rooms[player.inRoom].work.postMessage(player);

    rooms[player.inRoom].work.on('message', (number) => {

        delete rooms[number];

    });
}

module.exports = {
    findroom,
    Move,
    player_message,
    leaveGame,
}