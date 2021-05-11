
const { initPlayerData } = require("../init/init_main");

const { findroom, Move, player_message, leaveGame } = require("./listen/listen_main");

module.exports.Server_main = (socket, rooms_workers) => {

    const playerData = new initPlayerData(socket.id);

    socket.on("join", player => findroom(socket, playerData, player, rooms_workers, 0));

    socket.on("private_join", player => private_room(socket,playerData,player,rooms_workers));

    socket.on("move", move => Move(playerData, move, rooms_workers[playerData.inRoom]));

    socket.on("message", message => player_message(playerData, rooms_workers[playerData.inRoom], message));

    socket.on('leave', () => leaveGame(playerData, rooms_workers));

    socket.on('disconnect', () => leaveGame(playerData, rooms_workers));

}