const { update_room } = require("./update_room");

const { update_players } = require("./update_players");

const { update_maps } = require("./update_maps");

const { update_emit } = require("./update_emit");

const Matter = require("matter-js");

module.exports.Update = (room, update, frameRate) => {
    
    update_room(room, update);

    update_emit(room);

    update_players(room.players, room);

    if(room.phase !== "playing") return;

    Matter.Engine.update(room.engine, frameRate);

    update_maps(room);

}