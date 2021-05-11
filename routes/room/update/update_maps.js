
const Matter = require("matter-js");

const update_maps = (room) => {
    if (room.obj.event.riseJava) {
        room.obj.event.java += 0.1;
    }
    switch (room.event) {
        case 3:
            if (room.obj.event.turngravity) {
                room.obj.event.turngravity = false;
                switch (room.engine.world.gravity.y) {
                    case 1:
                        room.engine.world.gravity.y = -0.025;
                        break;
                    case -0.025:
                        room.engine.world.gravity.y = 1;
                        break;
                }

                room.obj.event.reevent = setTimeout(function () { room.obj.event.turngravity = true }, 5000);
            }
            break;
        case 6:
            if (room.obj.event.shotbullet) {
                room.obj.event.shotbullet = false;
                let to = Math.floor(Math.random() * 2);
                room.obj.event.obj.push(
                    Matter.Bodies.circle(-20 + (to * 840), Math.floor(Math.random() * 500), 8, {
                        groupId: 0x0002,
                        to: 0.0008 - (to * 0.0016),
                        render: {
                            strokeStyle: "#000000",
                            fillStyle: "#DDB20C"
                        }
                    }));
                Matter.World.add(room.engine.world, room.obj.event.obj[room.obj.event.obj.length - 1]);
                room.obj.event.reevent = setTimeout(function () { room.obj.event.shotbullet = true }, 500);
            }
            let dcountsb = 0;
            for (let i = 0, len = room.obj.event.obj.length; i < len; i++) {
                if (i + dcountsb > room.obj.event.obj.length) continue;
                if (room.obj.event.obj[i].position.x > 900 || room.obj.event.obj[i].position.x < -100) {
                    dcountsb++;
                    Matter.World.remove(room.engine.world, room.obj.event.obj[i]);
                    room.obj.event.obj.splice(i, 1);
                    return;
                }
                Matter.Body.applyForce(
                    room.obj.event.obj[i],
                    {
                        x: room.obj.event.obj[i].position.x,
                        y: room.obj.event.obj[i].position.y
                    },
                    { x: room.obj.event.obj[i].to, y: 0 }
                );
            }
            break;
        case 11:
            room.obj.event.shakecounter += 20;
            for (let i = 0, len = room.obj.maps.length; i < len; i++) {

                let px = room.obj.maps[i].position.x - 10 * Math.cos(room.obj.event.shakecounter);
                let py = room.obj.maps[i].position.y - 4 * Math.cos(room.obj.event.shakecounter);
                Matter.Body.setPosition(room.obj.maps[i], { x: px, y: py });
            }
            break;
        case 12:
            room.obj.event.spincounter += 0.00003;
            var cos = Math.cos(room.obj.event.spincounter),
                sin = Math.sin(room.obj.event.spincounter);
            for (let i = 0, len = room.obj.maps.length; i < len; i++) {
                var dx = room.obj.maps[i].position.x - 400,
                    dy = room.obj.maps[i].position.y - 300;

                Matter.Body.setPosition(room.obj.maps[i], {
                    x: 400 + (dx * cos - dy * sin),
                    y: 300 + (dx * sin + dy * cos)
                });
                Matter.Body.rotate(room.obj.maps[i], room.obj.event.spincounter);
            }
            if (room.obj.constraint) {
                for (let i = 0, len = room.obj.constraint.length; i < len; i++) {

                    var dx = room.obj.constraint[i].pointB.x - 400,
                        dy = room.obj.constraint[i].pointB.y - 300;

                    room.obj.constraint[i].pointB.x = 400 + (dx * cos - dy * sin);
                    room.obj.constraint[i].pointB.y = 300 + (dx * sin + dy * cos);

                }
            }
            //https://github.com/liabru/matter-js/issues/410
            break;
        case 13:
            if (room.obj.event.sprayrocks) {
                room.obj.event.sprayrocks = false;
                room.obj.event.obj.push(
                    Matter.Bodies.rectangle(Math.floor(Math.random() * 800), -50, Math.floor(Math.random() * 30) + 10, Math.floor(Math.random() * 30) + 10, {
                        groupId: 0x0003,
                        chamfer: Math.floor(Math.random() * 10),
                        render: {
                            strokeStyle: "#000000",
                            fillStyle: "#EF3D17"
                        }
                    }));
                Matter.World.add(room.engine.world, room.obj.event.obj[room.obj.event.obj.length - 1]);
                room.obj.event.reevent = setTimeout(function () { room.obj.event.sprayrocks = true }, 2000);
            }
            let dcountsr = 0;
            for (let i = 0, len = room.obj.event.obj.length; i < len; i++) {
                if (i + dcountsr > room.obj.event.obj.length) continue;
                if (room.obj.event.obj[i].position.y > 650) {
                    dcountsr++;
                    Matter.World.remove(room.engine.world, room.obj.event.obj[i]);
                    room.obj.event.obj.splice(i, 1);
                    return;
                }
            }
            break;
        case 14:
            if (room.obj.event.blackHoles) {
                room.obj.event.blackHoles = false;
                room.obj.event.obj.push(
                    Matter.Bodies.circle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 2.5, {
                        groupId: 0x0003,
                        isStatic: true,
                        to: {
                            x: (Math.floor(Math.random() * 20) - 10) * 0.1,
                            y: (Math.floor(Math.random() * 20) - 10) * 0.1
                        },
                        chamfer: Math.floor(Math.random() * 10),
                        render: {
                            strokeStyle: "rgba(0,0,0,0.3)",
                            fillStyle: "rgba(0,0,0,0.3)"
                        }
                    }));

                room.obj.event.reevent = setTimeout(function () {
                    room.obj.event.obj[room.obj.event.obj.length - 1].render.fillStyle = "#000000";
                    room.obj.event.obj[room.obj.event.obj.length - 1].render.strokeStyle = "#000000";
                    Matter.World.add(room.engine.world, room.obj.event.obj[room.obj.event.obj.length - 1]);
                    room.obj.event.blackHoles = true
                }, 2000);
            }
            let dcountsbh = 0;
            for (let i = 0, len = room.obj.event.obj.length; i < len; i++) { 
                if (i + dcountsbh > room.obj.event.obj.length) continue;
                if (room.obj.event.obj[i].position.x > 1200||room.obj.event.obj[i].position.x <-200) {
                    dcountsbh++;
                    Matter.World.remove(room.engine.world, room.obj.event.obj[i]);
                    room.obj.event.obj.splice(i, 1);
                    return;
                }
                Matter.Body.scale(room.obj.event.obj[i], 1.005, 1.005);
                Matter.Body.setPosition(
                    room.obj.event.obj[i],
                    {
                        x: room.obj.event.obj[i].position.x + room.obj.event.obj[i].to.x,
                        y: room.obj.event.obj[i].position.y + room.obj.event.obj[i].to.y
                    }
                );
            }
            break;
        default:
    }

    switch (room.map) {
        case 2:
            room.obj.movecounter += 0.02;
            for (let i = 0, len = room.obj.maps.length; i < len; i++) {
                let px;
                if (i % 2 == 0) {
                    px = 400 - 200 * Math.cos(room.obj.movecounter);
                } else {
                    px = 400 + 200 * Math.cos(room.obj.movecounter);
                }
                Matter.Body.setVelocity(room.obj.maps[i], { x: px - room.obj.maps[i].position.x, y: 0 });
                Matter.Body.setPosition(room.obj.maps[i], { x: px, y: room.obj.maps[i].position.y });
            }
            break;
        case 5:
            if (room.obj.generate) {
                room.obj.generate = false;
                room.obj.maps.push(
                    Matter.Bodies.rectangle(
                        -100, 300,
                        Math.floor(Math.random() * 100) + 100 * room.obj.block_option.scale, Math.floor(Math.random() * 450) + 100 * room.obj.block_option.scale,
                        room.obj.block_option
                    ));
                Matter.World.add(room.engine.world, room.obj.maps[room.obj.maps.length - 1]);
                room.obj.block_regenerate = setTimeout(function () { if (room.obj.generate) return; room.obj.generate = true }, 2000);
            }
            let dcounts = 0;
            for (let i = 0, len = room.obj.maps.length; i < len; i++) {
                if (i + dcounts > room.obj.maps.length) continue;
                if (room.obj.maps[i].floor) continue;
                if (room.obj.maps[i].position.x > 1300) {
                    dcounts++;
                    Matter.World.remove(room.engine.world, room.obj.maps[i]);
                    room.obj.maps.splice(i, 1);
                    return;
                }
                let px = room.obj.maps[i].position.x + 2;

                Matter.Body.setPosition(room.obj.maps[i], { x: px, y: room.obj.maps[i].position.y });
            }
            break;
        case 7:

            if (room.obj.generate) {
                room.obj.generate = false;
                for (let i = 0; i < 2; i++) {
                    room.obj.maps.push(
                        Matter.Bodies.circle(
                            -100 + (i * 900), -50,
                            Math.floor(Math.random() * 50) + 30 * room.obj.block_option.scale,
                            room.obj.block_option
                        ));
                    Matter.World.add(room.engine.world, room.obj.maps[room.obj.maps.length - 1]);
                }
                room.obj.block_regenerate = setTimeout(function () { if (room.obj.generate) return; room.obj.generate = true }, 2000);
            }

            let dcounts7 = 0;
            for (let i = 0, len = room.obj.maps.length; i < len; i++) {
                if (i + dcounts7 > room.obj.maps.length) continue;
                if (room.obj.maps[i].floor) continue;
                if (room.obj.maps[i].position.y > 700) {
                    dcounts7++;
                    Matter.World.remove(room.engine.world, room.obj.maps[i]);
                    room.obj.maps.splice(i, 1);
                    return;
                }
            }
            break;
        default:
    }
}

module.exports = {
    update_maps
}