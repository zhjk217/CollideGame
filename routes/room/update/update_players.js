
const Matter = require("matter-js");
//update player
const update_players = (players, room) => {
    let dead = 0;
    for (let id in players) {

        players_leave(room, players, id);

        if (room.phase !== "playing" || !players[id] || !players[id].obj) continue;

        players_fall(room, players[id].obj);

        players_dead(dead,room,players[id].obj);

        players_move(players[id].obj,{to:players[id].move.left,speed:players[id].speed.left});

        players_move(players[id].obj,{to:players[id].move.right,speed:players[id].speed.right});

        players_jump(players[id]);
       
    }
}
module.exports = {
    update_players
}

const players_leave = (room, players, id) => {

    if (!players[id].isLeave) return;

    if (players[id].obj) {

        Matter.World.remove(room.engine.world, players[id].obj);

    }

    room.playercount--;

    delete players[id];

}

const players_fall = (room, player) => {

    if (!fall(player, room.obj.event.java)) return;

    if (room.iswaiting) {

        Matter.Body.setPosition(player, { x: 400, y: 0 });

        return;

    }

    player.isdead = true;

    Matter.World.remove(room.engine.world, player);

}

const fall = (player, java) => {

    return player.position.y > 610 - java - player.size && !player.isdead;

}

const players_dead = (dead,room,player) => {

    if (!player.isdead) return;

    dead++;

    if (player.render.opacity > 0) {

        player.render.opacity -= 0.05;

    } else {

        player.render.opacity = 0;

    }
    if (dead >= room.playingPlayers - 1) {

        room.isReset = false;

    }
}

const players_move = (player,direction) =>{
    if (!direction.to) return;
        Matter.Body.applyForce(
            player,
            {
                x: player.position.x,
                y: player.position.y
            },
            { x: direction.speed * (player.size) / 10, y: 0 }
        );
}

const players_jump = player =>{
    if (player.move.jump &&player.obj.isgrounded &&player.obj.jumpcolddown) {
       player.obj.jumpcolddown = false;
        Matter.Body.applyForce(
           player.obj,
            {
                x:player.obj.position.x,
                y:player.obj.position.y
            },
            { x: -Math.round(player.obj.collisionPoint) * 0.2, y:player.speed.jump * (player.obj.size) / 10 }
        );
       player.cooling = setTimeout(function () {
           player.obj.jumpcolddown = true;
        }, 100);
    }
}