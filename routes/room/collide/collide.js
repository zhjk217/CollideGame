
const { collide_start, collide_in, collide_out } = require("./collide_room");

const Matter = require("matter-js");

module.exports.collide = room => {

    Matter.Events.on(room.engine, 'collisionStart', event => collide_start(room,event));

    Matter.Events.on(room.engine, 'collisionActive', event => collide_in(event));

    Matter.Events.on(room.engine, 'collisionEnd', event => collide_out(event));

}


