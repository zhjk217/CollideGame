
const Matter = require("matter-js");

function set_maps(map, option) {
    let floor_option = option.obj_staticoption;
    floor_option.floor = true;
    this.border = Matter.Bodies.rectangle(400, -1000, 2000, 300,{
        isStatic:true,
    });
        this.event = option.event_option;
    switch (map) {
        case 0:
            this.haveParts = false;
            this.group = Matter.Body.nextGroup(true);
            let seesaw_option = option.obj_option;
            seesaw_option.collisionFilter = { group: this.group };
            let seesaw_static_option = option.obj_staticoption;
            seesaw_static_option.collisionFilter = { group: this.group };
            this.maps = [
                Matter.Bodies.rectangle(400, 300, 700 * seesaw_option.scale, 30 * seesaw_option.scale, seesaw_option),
                Matter.Bodies.rectangle(400, 480, 20 * seesaw_static_option.scale, 380, seesaw_static_option),
            ];
            this.constraint = [
                Matter.Constraint.create({
                    bodyA: this.maps[0],
                    pointB: Matter.Vector.clone(this.maps[0].position),
                    stiffness: 1,
                    length: 0,
                    render: {
                        strokeStyle: "#746D6B",
                    }
                })
            ];
            break;
        case 1:
            this.haveParts = false;
            this.maps = [
                Matter.Bodies.rectangle(100, 300, 150 * option.obj_option.scale, 40 * option.obj_option.scale,
                    option.obj_option),
                Matter.Bodies.rectangle(300, 300, 150 * option.obj_option.scale, 40 * option.obj_option.scale,
                    option.obj_option),
                Matter.Bodies.rectangle(500, 300, 150 * option.obj_option.scale, 40 * option.obj_option.scale,
                    option.obj_option),
                Matter.Bodies.rectangle(700, 300, 150 * option.obj_option.scale, 40 * option.obj_option.scale,
                    option.obj_option),
            ]
            this.constraint = [
                Matter.Constraint.create({
                    bodyA: this.maps[0],
                    pointB: { x: 100, y: 100 },
                    render: {
                        strokeStyle: "#746D6B",
                    }
                }),
                Matter.Constraint.create({
                    bodyA: this.maps[1],
                    pointB: { x: 300, y: 100 },
                    render: {
                        strokeStyle: "#746D6B",
                    }
                }),
                Matter.Constraint.create({
                    bodyA: this.maps[2],
                    pointB: { x: 500, y: 100 },
                    render: {
                        strokeStyle: "#746D6B",
                    }
                }),
                Matter.Constraint.create({
                    bodyA: this.maps[3],
                    pointB: { x: 700, y: 100 },
                    render: {
                        strokeStyle: "#746D6B",
                    }
                })
            ]
            break;
        case 2:
            this.haveParts = false;
            this.movecounter = 0;
            this.maps = [
                Matter.Bodies.rectangle(
                    200, 100,
                    350 * option.obj_option.scale, 30 * option.obj_option.scale,
                    option.obj_staticoption
                ),
                Matter.Bodies.rectangle(
                    600, 200,
                    350 * option.obj_option.scale, 30 * option.obj_option.scale,
                    option.obj_staticoption
                ),
                Matter.Bodies.rectangle(
                    200, 300,
                    350 * option.obj_option.scale, 30 * option.obj_option.scale,
                    option.obj_staticoption
                ),
                Matter.Bodies.rectangle(
                    600, 400,
                    350 * option.obj_option.scale, 30 * option.obj_option.scale,
                    option.obj_staticoption
                ),
                Matter.Bodies.rectangle(
                    200, 500,
                    350 * option.obj_option.scale, 30 * option.obj_option.scale,
                    option.obj_staticoption
                ),
            ]
            break;
        case 3:
            this.haveParts = true;
            this.parts = [
                [
                    Matter.Bodies.rectangle(
                        250, 150,
                        50 * option.obj_option.scale, 300 * option.obj_option.scale,
                        option.obj_option
                    ),
                    Matter.Bodies.rectangle(250, 150,
                        300 * option.obj_option.scale, 50 * option.obj_option.scale,
                        option.obj_option
                    )
                ],
                [
                    Matter.Bodies.rectangle(
                        650, 150,
                        50 * option.obj_option.scale, 300 * option.obj_option.scale,
                        option.obj_option
                    ),
                    Matter.Bodies.rectangle(
                        650, 150,
                        300 * option.obj_option.scale, 50 * option.obj_option.scale,
                        option.obj_option
                    )
                ],
                [
                    Matter.Bodies.rectangle(
                        150, 450,
                        50 * option.obj_option.scale, 300 * option.obj_option.scale,
                        option.obj_option
                    ),
                    Matter.Bodies.rectangle(
                        150, 450,
                        300 * option.obj_option.scale, 50 * option.obj_option.scale,
                        option.obj_option
                    )
                ],
                [
                    Matter.Bodies.rectangle(
                        550, 450,
                        50 * option.obj_option.scale, 300 * option.obj_option.scale,
                        option.obj_option
                    ),
                    Matter.Bodies.rectangle(
                        550, 450,
                        300 * option.obj_option.scale, 50 * option.obj_option.scale,
                        option.obj_option
                    )
                ]
            ]
            this.maps = [
                Matter.Body.create({ parts: this.parts[0] }),
                Matter.Body.create({ parts: this.parts[1] }),
                Matter.Body.create({ parts: this.parts[2] }),
                Matter.Body.create({ parts: this.parts[3] }),
            ];
            this.constraint = [
                Matter.Constraint.create({
                    bodyA: this.maps[0],
                    pointB: Matter.Vector.clone(this.maps[0].position),
                    render: {
                        strokeStyle: "#746D6B",
                    }
                }),
                Matter.Constraint.create({
                    bodyA: this.maps[1],
                    pointB: Matter.Vector.clone(this.maps[1].position),
                    render: {
                        strokeStyle: "#746D6B",
                    }
                }),
                Matter.Constraint.create({
                    bodyA: this.maps[2],
                    pointB: Matter.Vector.clone(this.maps[2].position),
                    render: {
                        strokeStyle: "#746D6B",
                    }
                }),
                Matter.Constraint.create({
                    bodyA: this.maps[3],
                    pointB: Matter.Vector.clone(this.maps[3].position),
                    render: {
                        strokeStyle: "#746D6B",
                    }
                })
            ]
            break;
        case 4:
            this.haveParts = true;

            this.parts = [
                Matter.Bodies.rectangle(
                    200, 300,
                    50 * option.obj_option.scale, 400 * option.obj_option.scale,
                    option.obj_option
                ),
                Matter.Bodies.rectangle(
                    600, 300,
                    50 * option.obj_option.scale, 400 * option.obj_option.scale,
                    option.obj_option
                ),
                Matter.Bodies.rectangle(
                    400, 500,
                    400 * option.obj_option.scale, 50 * option.obj_option.scale,
                    option.obj_option
                ),

            ]
            this.maps = [
                Matter.Body.create({ parts: this.parts }),
            ];
            Matter.Body.setPosition(this.maps[0], { x: 400, y: 300 });
            this.constraint = [
                Matter.Constraint.create({
                    bodyA: this.maps[0],
                    pointB: { x: 400, y: 300 },
                    render: {
                        strokeStyle: "#746D6B",
                    }
                }),
            ]
            break;
        case 5:
            this.haveParts = false;
            this.generate = true;

            this.block_option = option.obj_option;
            this.block_regenerate;
            this.maps = [
                Matter.Bodies.rectangle(400, 600, 1200, 50,
                    floor_option
                ),
                Matter.Bodies.rectangle(
                    100, 300,
                    Math.floor(Math.random() * 100) + 100 * this.block_option.scale, Math.floor(Math.random() * 450) + 100 * this.block_option.scale,
                    this.block_option
                ),
                Matter.Bodies.rectangle(
                    300, 300,
                    Math.floor(Math.random() * 100) + 100 * this.block_option.scale, Math.floor(Math.random() * 450) + 100 * this.block_option.scale,
                    this.block_option
                ),
                Matter.Bodies.rectangle(
                    500, 300,
                    Math.floor(Math.random() * 100) + 100 * this.block_option.scale, Math.floor(Math.random() * 450) + 100 * this.block_option.scale,
                    this.block_option
                ),
                Matter.Bodies.rectangle(
                    700, 300,
                    Math.floor(Math.random() * 100) + 100 * this.block_option.scale, Math.floor(Math.random() * 450) + 100 * this.block_option.scale,
                    this.block_option
                ),
            ];
            break;
        case 6:
            this.haveParts = false;

            this.maps = [
                Matter.Bodies.rectangle(400, 600, 1200, 50,
                    floor_option
                ),
                Matter.Bodies.rectangle(
                    400, 300,
                    400 * option.obj_option.scale, 450 * option.obj_option.scale,
                    option.obj_option
                ),
            ]

            break;
        case 7:
            this.haveParts = false;
            this.generate = true;
            this.block_option = option.obj_option;
            this.block_regenerate;
            let oblique_option = Object.assign({}, option.obj_staticoption);
            let negative_oblique_option = Object.assign({}, option.obj_staticoption);
            oblique_option.angle = 22.5;
            negative_oblique_option.angle = -22.5;
            this.maps = [
                Matter.Bodies.rectangle(
                    100, 300,
                    400, 30 * option.obj_option.scale,
                    oblique_option
                ),
                Matter.Bodies.rectangle(
                    700, 300,
                    400, 30 * option.obj_option.scale,
                    negative_oblique_option
                ),
            ]
            break;
    }
}

function set_option() {
    this.player_option = {

        density: 0.025,
        friction: 0.1,
        frictionAir: 0.0075,
        restitution: 0.5,
        groupId: 0x0001,
        collisionPoint: 0,
        size: 10,
        place: 0,
        isplayer: true,
        isgrounded: false,
        jumpcolddown: true,
        isdead: false,
        speed: {
            left: -0.012,
            right: 0.012,
            jump: -0.25
        },
        nameposition: {
            x: 0,
            y: 0,
        },

        render: {
            strokeStyle: "#000000",
        }

    };
    this.map_option = {
        event_option: {
            text: "",
            java: -10,
            riseJava: true,
            reevent: null,
            gravity: 1,
            obj: []
        },
        obj_option: {
            scale: 1,
            groupId: 0x0002,
            render: {
                strokeStyle: "#000000",
                fillStyle: "#BFA49C"
            }
        },
        obj_staticoption: {
            scale: 1,
            groupId: 0x0002,
            isStatic: true,
            render: {
                strokeStyle: "#000000",
                fillStyle: "#BFA49C"
            }
        }
    }
}


const set_events = (event, option) => {
    switch (event) {
        case -1:

            option.map_option.event_option.text = "solo模式";

            option.map_option.event_option.riseJava = false;

            break;

        case 0:
            //player size become bigger
            //玩家體型變大

            option.map_option.event_option.text = "玩家體積變大";

            option.player_option.size = 14;

            break;
        case 1:
            //map become glacier
            //地圖地形變成冰河

            option.map_option.event_option.text = "地形變成冰河";

            option.map_option.obj_option.friction = 0.0001;
            option.map_option.obj_staticoption.friction = 0.0001;

            option.map_option.obj_option.render.fillStyle = "#90D0FD";
            option.map_option.obj_staticoption.render.fillStyle = "#90D0FD";

            break;
        case 2:
            //player mass become feather
            //玩家質量變羽毛  

            option.map_option.event_option.text = "玩家質量變羽毛";

            option.player_option.frictionAir = 0.1;

            break;
        case 3:
            //map become no gravity for every 5 second
            //地圖每5秒會進入無重力

            option.map_option.event_option.text = "地圖短時間內進入無重力";

            option.map_option.event_option.turngravity = true;

            option.map_option.event_option.gravity = -0.025;

            break;
        case 4:
            //player become elasticity
            //玩家彈力增強 

            option.map_option.event_option.text = "玩家彈力增強";

            option.player_option.restitution = 1.2;

            break;
        case 5:
            //map size become smaller
            //地形尺寸變成小

            option.map_option.event_option.text = "地形尺寸變成小";

            option.map_option.obj_option.scale = 0.5;
            option.map_option.obj_staticoption.scale = 0.5;

            break;
        case 6:
            //map event have bullet attack
            //地圖事件-子彈攻擊

            option.map_option.event_option.text = "地圖事件-子彈攻擊";

            option.map_option.event_option.shotbullet = true;

            break;
        case 7:
            //map event have night
            //地圖事件-夜晚

            option.map_option.event_option.text = "地圖事件-夜晚";

            option.map_option.event_option.darkworld = true;

            break;
        case 8:
            //player control opposite
            //玩家操作左右相反

            option.map_option.event_option.text = "玩家操作左右相反";

            option.player_option.speed.left = 0.012;

            option.player_option.speed.right = -0.012;

            option.map_option.event_option.oppositeoperation = true;

            break;
        case 9:
            //map event have upside down   
            //地圖事件-上下顛倒

            option.map_option.event_option.text = "地圖事件-上下顛倒";

            option.player_option.speed.left = 0.012;

            option.player_option.speed.right = -0.012;

            option.map_option.event_option.reverseworld = true;

            break;
        case 10:
            //map event have mirror  
            //地圖事件-鏡像

            option.map_option.event_option.text = "地圖事件-鏡像";

            option.map_option.event_option.mirrorworld = true;

            break;
        case 11:
            //map event have earthquake
            //地圖事件-地震

            option.map_option.event_option.text = "地圖事件-地震";

            option.map_option.event_option.shakecounter = 0;

            option.map_option.event_option.shakeworld = true;

            break;
        case 12:
            //map event have spinwolrd
            //地圖事件-旋轉世界

            option.map_option.event_option.text = "地圖事件-旋轉世界";

            option.map_option.event_option.spincounter = 0;

            option.map_option.event_option.spinworld = true;

            option.map_option.event_option.riseJava = false;

            break;
        case 13:
            //map event have volcanic 
            //地圖事件-火山

            option.map_option.event_option.text = "地圖事件-火山";

            option.map_option.event_option.sprayrocks = true;

            option.map_option.event_option.riseJava = false;

            break;
        case 14:
            //map event have black hole
            //地圖事件-黑洞

            option.map_option.event_option.text = "地圖事件-黑洞";

            option.map_option.event_option.blackHoles = true;

            option.map_option.event_option.riseJava = false;

            break;
    }
}

const { player_emit } = require("../update/update_emit");

const set_players = (players, room, player_option) => {
    let playercount = -1;
    for (let id in players) {

        playercount++;
        delete players[id].obj;
        player_option.place = playercount;
        players[id].speed = player_option.speed;
        clearTimeout(players[id].cooling);
        player_option.render.fillStyle = randColor();
        players[id].obj = Matter.Bodies.circle(400, 30, player_option.size, player_option);
        player_emit(id, player_option);
        Matter.World.add(room.engine.world, players[id].obj);
    }
}

module.exports = {
    set_maps,
    set_option,
    set_events,
    set_players
}

const randColor = () => {
    return 'rgba(' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + 1 + ')';
}