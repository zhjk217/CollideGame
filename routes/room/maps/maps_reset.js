
const { set_option, set_maps, set_events, set_players } = require("./maps_set");

const Matter = require("matter-js");

const { rank_emit, chat_emit } = require("../update/update_emit");

const reset_solo = (room) => {

    room.event = -1;

    room.map = 5;

    reset_roll(room);

    room.phase = "playing";

}

const reset_next = (room) => {

    if (room.isReset) return;

    room.isReset = true;

    room.nexttime = 0;

    reset_winner(room);

    setTimeout(function () {

        room.countdown = 2.9;

        room.phase = "countdown";

        room.event = Math.floor(Math.random() * 15);

        room.map = Math.floor(Math.random() * 8);

        reset_roll(room);

        chat_emit(room.number,"房間 ： Map : "+room.map+" Event : "+room.event);

        setTimeout(function () {

            room.phase = "playing";

        }, 2000);

    }, room.nexttime);
}

module.exports = {
    reset_solo,
    reset_next
}

const reset_roll = room => {

    reset_clear(room);

    let option = new set_option();

    set_events(room.event, option);

    room.engine.world.gravity.y = option.map_option.event_option.gravity;

    room.eventtext = option.map_option.event_option.text;

    room.obj = new set_maps(room.map, option.map_option);

    set_players(room.players, room, option.player_option);

    Matter.World.add(room.engine.world, room.obj.maps);

    Matter.World.add(room.engine.world, room.obj.border);

    if (!room.obj.constraint) return;

    Matter.World.add(room.engine.world, room.obj.constraint);

}

const reset_clear = (room) => {

    room.deadplayers = 0;

    if (room.obj.block_regenerate)

        clearTimeout(room.obj.block_regenerate);

    if (room.obj.event)

        clearTimeout(room.obj.event.reevent);

    room.playingPlayers = room.playercount;

    Matter.World.clear(room.engine.world);

    delete room.obj;

}

const reset_winner = (room) => {

    if (room.playingPlayers < 2) return;

    room.phase = "winner";

    room.nexttime = 1000;

    let ranklist = [];

    for (let id in room.players) {

        winner_player(room, room.players[id]);

        ranklist.push({
            name: room.players[id].name,
            point: room.players[id].point
        })

    }

    rank_emit(room.number, ranklist);

 

}

const winner_player = (room, player) => {
    if (player.obj.isdead) return;

    room.Winner = player.name;

    chat_emit(room.number,"房間 ： "+room.Winner+" win ! ");

    player.point++;

}