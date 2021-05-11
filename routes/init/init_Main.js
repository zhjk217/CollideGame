function initPlayerData(socket_id) {
    this.inRoom = null;
    this.socket_id = socket_id;
    this.name = null;
    this.message = "";
    this.move = { left: false, right: false, jump: false };
    this.isJoin = false;
    this.to = "none";
}

const { Worker } = require('worker_threads');

function initRoomWorker(number) {
    this.work = new Worker("./routes/room/room_work.js", {
        workerData: {
            number: number
        }
    }
    );
    this.playercount = 0;
}

module.exports = {
    initPlayerData,
    initRoomWorker
}