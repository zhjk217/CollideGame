
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const socket = io('ws://localhost:80', { transports: ['websocket'] });

const players = [];

const draw = (body, ctx) => {
  ctx.save();
  ctx.strokeStyle = body.color.strokeStyle;
  ctx.fillStyle = body.color.fillStyle;
  ctx.globalAlpha = body.color.opacity;
  ctx.beginPath();
  body.coordinate.forEach(e => ctx.lineTo(e.x, e.y));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  if (!body.name) return;
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText(body.name, body.position.x, body.position.y - body.position.size - body.position.size / 10 * 3);
};

const drawline = (body, ctx) => {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = body.color.strokeStyle;

  ctx.lineTo(body.points.pointA.x, body.points.pointA.y);
  ctx.lineTo(body.points.pointB.x, body.points.pointB.y);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(body.points.pointA.x, body.points.pointA.y, 5, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(body.points.pointB.x, body.points.pointB.y, 5, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

var playing = false;
var playerid;
$("#play").click(function () {
  if (!$("#login").val()) return;
  $("Main").css("display", "flex");
  playerid = $("#login").val();
  $("UI").css("display", "none");
  playing = true;
  JoinGame();
});

$("#leave").click(function () {
  $("Main").css("display", "none");
  $("UI").css("display", "flex")
  playing = false;
  leaveGame();
})

const movement = {
  left: false,
  jump: false,
  right: false,
}

document.addEventListener('keydown', function (e) {
  if (e.keyCode == 65) {
    movement.left = true;
  }
  if (e.keyCode == 68) {
    movement.right = true;
  }

  if (e.keyCode == 87) {
    movement.jump = true;
  }
  if (!playing) return;
  socket.emit('move', movement);

});
document.addEventListener('keyup', function (e) {
  if (e.keyCode == 65) {
    movement.left = false;
  }
  if (e.keyCode == 68) {
    movement.right = false;
  }

  if (e.keyCode == 87) {
    movement.jump = false;
  }
  if (!playing) return;
  socket.emit('move', movement);

});

const JoinGame = () => {
  socket.emit("join", playerid);
  socket.on("inRoom", room => {
    $("#room").text("Public : " + room);
  })
  $("#name").text("Name : " + playerid);
}



const leaveGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit("leave");
}

let getPlace = 0;

socket.on("connect", () => {
  socket.on("getplace", getplace => {
    getPlace = getplace;
  });

  socket.on('disconnect', function () {
    history.go();
  });
});

$("#message").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    socket.emit("message", $("#message").val());
    $("#message").val("");
  }
});

const backtobottom = () => {
  var h = $("#chat").height();
  var sh = $("#chat")[0].scrollHeight;
  $("#chat")[0].scrollTop = sh - h;
}

socket.on("getRank", ranklist => {
  let content = [];
  for (let i = 0; i < ranklist.length; i++) {
    content += `<p>${ranklist[i].name} : ${ranklist[i].point}</p> `
  }
  $('#rank').html(content);
});

socket.on("getChat", message => {
  let content = `<p>${message}</p> `;
  $('#chat').append(content);
  backtobottom();
})
//socketon接收 並喧染
socket.on("update state", ({ players, maps, lines, room }) => {
  if (!playing) return;
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  switch (room.event) {
    case 7:
      let radgrad = ctx.createRadialGradient(players[getPlace].position.x, players[getPlace].position.y, 0, players[getPlace].position.x, players[getPlace].position.y, 60);
      radgrad.addColorStop(0, 'rgba(255,255,255,1)');
      radgrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(players[getPlace].position.x, players[getPlace].position.y, 60, 0, Math.PI * 2, true);
      ctx.fillStyle = radgrad;
      ctx.fill();
      ctx.closePath();
      ctx.globalCompositeOperation = 'source-atop';
      break;
    case 9:
      ctx.save();
      ctx.translate(800, 600);
      ctx.rotate(Math.PI * 180 / 180);
      break;
    case 10:
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.save();
      ctx.translate(800, 500);
      ctx.scale(1, 0.8);
      ctx.rotate(Math.PI * 180 / 180);
      maps.forEach(map => draw(map, ctx));
      lines.forEach(line => drawline(line, ctx));
      players.forEach(player => draw(player, ctx));
      ctx.restore();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.restore();
      break;
    default:
  }

  maps.forEach(map => draw(map, ctx));
  lines.forEach(line => drawline(line, ctx));
  players.forEach(player => draw(player, ctx));
  riseJava(room.java + 10);
  switch (room.event) {
    case 9:
      ctx.restore();
      break;
    case 7:
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = "black";
      ctx.rect(0, 0, 800, 600);
      ctx.fill();
      break;
    default:
  }
  ctx.restore();
  GUI(room);
});

const GUI = (room) => {
  ctx.save();
  ctx.textAlign = "center";
  switch (room.event) {
    case 7:
      ctx.fillStyle = "white";
      break;
    default:
      ctx.fillStyle = "black";
  }
  switch (room.phase) {
    case "playing":
      $("#event").text("Event : " + room.eventtext);
      break;
    case "winner":
      ctx.font = "87pt Arial";
      ctx.fillText(room.winner, 400, 250);
      ctx.font = "60pt Arial";
      ctx.fillText("Win", 400, 350);
      break;
    case "countdown":
      ctx.font = "40pt Arial";
      ctx.fillText(room.eventtext, 400, 200);
      ctx.font = "87pt Arial";
      ctx.fillText(Math.floor(room.countdown), 400, 400);
      $("#event").text("Event : " + room.eventtext);
      break;
    default:
  }
  ctx.restore();
}

//岩漿
let delta = 0;
const riseJava = (java) => {
  delta += 50;
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "rgba(255, 109, 0,0.8)";
  ctx.beginPath();
  var randomLeft = Math.abs(Math.pow(Math.sin(delta / 2 / 1000), 2)) * 50;
  var randomRight = Math.abs(Math.pow(Math.sin((delta / 2 / 1000) + 10), 2)) * 50;
  var randomLeftConstraint = Math.abs(Math.pow(Math.sin((delta / 2 / 1000) + 2), 2)) * 50;
  var randomRightConstraint = Math.abs(Math.pow(Math.sin((delta / 2 / 1000) + 1), 2)) * 50;
  ctx.moveTo(0, randomLeft + canvas.height - java);
  ctx.bezierCurveTo(canvas.width / 3, randomLeftConstraint + canvas.height - java, canvas.width / 3 * 2, randomRightConstraint + canvas.height - java, canvas.width, randomRight + canvas.height - java);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0, randomLeft + canvas.height - java);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  const gradient = ctx.createLinearGradient(0, canvas.height - java, 0, canvas.height + 100);
  gradient.addColorStop(0, 'rgba(255, 0, 0,0.95)');
  gradient.addColorStop(1, 'rgba(244, 255, 0,0.95)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  var randomLeft = Math.abs(Math.pow(Math.sin(delta / 1000), 2)) * 50;
  var randomRight = Math.abs(Math.pow(Math.sin((delta / 1000) + 10), 2)) * 50;
  var randomLeftConstraint = Math.abs(Math.pow(Math.sin((delta / 1000) + 2), 2)) * 50;
  var randomRightConstraint = Math.abs(Math.pow(Math.sin((delta / 1000) + 1), 2)) * 50;
  ctx.moveTo(0, randomLeft + canvas.height - java);
  ctx.bezierCurveTo(canvas.width / 3, randomLeftConstraint + canvas.height - java, canvas.width / 3 * 2, randomRightConstraint + canvas.height - java, canvas.width, randomRight + canvas.height - java);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0, randomLeft + canvas.height - java);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}


//https://stackoverflow.com/questions/32441576/html-canvas-spotlight-effect
//https://jsfiddle.net/kawhL79v/14/