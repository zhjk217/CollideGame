
const collide_start = (room, event) => {
    let pairs = event.pairs;
    pairs.forEach(function (obj) {

        player_jump(obj, obj.collision.supports, isplayer(obj));

        player_behit_rock(obj, isplayer(obj));

        player_solo_color(obj, room, ismap(obj));

    });
}

const collide_in = event => {
    let pairs = event.pairs;
    pairs.forEach(function (obj) {

        player_jump(obj, obj.collision.supports, isplayer(obj));

    }
    );
}

const collide_out = event => {
    let pairs = event.pairs;
    pairs.forEach(function (obj) {

        player_jump_cancel(obj, isplayer(obj));

    });
}

module.exports = {
    collide_start,
    collide_in,
    collide_out
}

const player_jump = (obj, collide_point, player) => {

    if (!isPlayerOnGround(obj.bodyA, obj.bodyB)) return;

    player.collisionPoint = 0;

    for (let i = 0, len = collide_point.length; i < len; i++) {

        player.collisionPoint += (collide_point[i].x) / collide_point.length;

    }

    player.collisionPoint -= player.position.x;

    player.collisionPoint *= 0.1;

    player.isgrounded = true;

}

const player_behit_rock = (obj, player) => {

    if (!isPlayerOnRock(obj.bodyA, obj.bodyB)) return;

    player.isdead = true;

}

const player_solo_color = (obj, room, map) => {

    if (!room.iswaiting) return;

    if (!isPlayerOnGround(obj.bodyA, obj.bodyB)) return;

    map.render.fillStyle = randColor();

}

const player_jump_cancel = (obj, player) => {

    if (!isPlayerOnGround(obj.bodyA, obj.bodyB)) return;

    player.isgrounded = false;

}

const ismap = (obj) => {

    if (!obj.bodyA.isplayer) {

        return obj.bodyA;

    }

    if (!obj.bodyB.isplayer) {

        return obj.bodyB;

    }

}

const isplayer = (obj) => {

    if (obj.bodyA.isplayer) {

        return obj.bodyA;

    }

    if (obj.bodyB.isplayer) {

        return obj.bodyB;

    }

}

const isPlayerOnGround = (a, b) => {

    return ((a.groupId == 0x0002 && b.groupId == 0x0001) || (a.groupId == 0x0001 && b.groupId == 0x0002));

};

const isPlayerOnRock = (a, b) => {

    return ((a.groupId == 0x0003 && b.groupId == 0x0001) || (a.groupId == 0x0001 && b.groupId == 0x0003));

};

const randColor = () => {
    return 'rgba(' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + 1 + ')';
}