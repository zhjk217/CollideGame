
const send_objs = (objs, room, event_objs) => {
    let list = [];
    let len = objs.length;
    for (let i = 0; i < len; i++) {
        switch (room.haveParts) {
            case true:
                let lenP = objs[i].parts.length;
                for (let j = 0; j < lenP; j++) {
                    if (objs[i].parts[j].label == "Body") continue;
                    send_form("maps", list, objs[i].parts[j]);
                };
                break;
            case false:
                send_form("maps", list, objs[i]);
                break;
            default:
        }
    }
    let lenE = event_objs.length;
    for (let i = 0; i < lenE; i++) {
        send_form("maps", list, event_objs[i]);
    }
    return list;
}

const send_players = (players) => {
    let list = [];
    for (let id in players) {
        if (!players[id].obj) continue;
        if (players[id].obj.position.x > 0 && players[id].obj.position.x < 800) {
            players[id].obj.nameposition.x = players[id].obj.position.x;
        }
        if (players[id].obj.position.y > + players[id].obj.size + players[id].obj.size && players[id].obj.position.y < 600 + players[id].obj.size + players[id].obj.size / 10 * 3) {
            players[id].obj.nameposition.y = players[id].obj.position.y;
        }
        send_form("players", list, players[id]);
    }
    return list;
}

const send_lines = (maps, lines) => {
    let list = [];
    if (!lines) return list;
    let len = lines.length;
    for (let i = 0; i < len; i++) {

        send_form("lines", list, lines[i], maps[i]);

    }
    return list;
}

const send_form = (form, list, obj, obj_map) => {
    switch (form) {
        case "maps":
            list.push({
                coordinate: obj.vertices.map(({ x, y }) => ({ x, y })),
                color: {
                    fillStyle: obj.render.fillStyle,
                    strokeStyle: obj.render.strokeStyle,
                    opacity: obj.render.opacity
                }
            });
            break;
        case "players":
            list.push({
                coordinate: obj.obj.vertices.map(({ x, y }) => ({ x, y })),
                color: {
                    fillStyle: obj.obj.render.fillStyle,
                    strokeStyle: obj.obj.render.strokeStyle,
                    opacity: obj.obj.render.opacity
                },
                position: {
                    x: obj.obj.nameposition.x,
                    y: obj.obj.nameposition.y,
                    size: obj.obj.size
                },
                name: obj.name,
            });
            break;
        case "lines":
            list.push({
                points: {
                    pointA: obj_map.position,
                    pointB: obj.pointB
                },
                color: {
                    strokeStyle: obj.render.strokeStyle
                }
            });
            break;
    }
}

const send_room = (room) => {
    let data = {

        phase: room.phase,
        status: room.status,
        event: room.event,

        winner: room.Winner,
        eventtext: room.eventtext,
        countdown: room.countdown,

        java: room.obj.event.java

    }
    return data;
}

module.exports = {
    send_objs,
    send_players,
    send_lines,
    send_room
}