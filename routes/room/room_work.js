const { workerData, parentPort } = require('worker_threads');

const config = require("../config.json");

const frameRate = 1000 / config.frameRate;

const { initRoom } = require('../init/init_Room');

const room = new initRoom(workerData.number);


const { listen } = require("./listen/listen_room");

parentPort.on('message', message => listen(room, message));

const { collide } = require("./collide/collide");

collide(room);

const { Update } = require("./update/update");

const update = setInterval(() => Update(room,update, frameRate), frameRate);
