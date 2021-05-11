const Matter = require("matter-js");

function initRoom(number) {

    this.number = number;

    this.iswaiting = true;
    this.isReset = true;

    this.playercount = 0;
    this.playingPlayers = 0;
    this.deadplayers = 0;

    this.phase = "playing";
    this.status = "solo";

    this.Winner = "";
    this.countdown = 0;
    this.nexttime = 0;

    this.map = 0;
    this.event = -1;
    this.eventtext = "";
    this.engine = Matter.Engine.create();
    this.obj = {
        walls: [],
        maps: [],
        constraint: [],
    }
    this.players = {}
}
function initPlayer(name) {
    this.name = name;
    this.isLeave = false;
    this.cooling;
    this.point = 0;
    this.speed = {
        left: -0.012,
        right: 0.012,
        jump: -0.25
    }
    this.move = {
        left: false,
        right: false,
        jump: false,
    }
    this.obj ;
}
module.exports = {
    initRoom,
    initPlayer
}

const randColor = () => {
    return 'rgba(' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + Math.random().toFixed(1) + ')';
}