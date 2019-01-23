// get the <canvas> tag from the document
var canvas = document.querySelector(".spooners");
// get the context object (has all the methods for drawing things)
var ctx = canvas.getContext("2d");
var originX = ctx.canvas.width * 0.5;
var originY = ctx.canvas.height * 0.5;
// ctx.translate(originX, originY);

// Assets
// ------
// Ship
// ------------
var shipImg = new Image();
// sepcify src as if it was from the html file
shipImg.src = "./images/temp_ship.png";
shipImg.onload = function() {
  drawShip();
};
var ship = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  angle: 0,
  hull: 100,
  shield: 100,
  ammo: 50,
  // When ship crashes the game is over
  isCrashed: false
};

ctx.translate(500, 250);
// Drawing
// -------
// Background
// --------------
function drawBackground() {
  // fillStyle controls the color of ALL the next files
  ctx.fillStyle = "black";
  // draw a solid rectangle that covers all the canvas
  ctx.fillRect(-500, -300, 1000, 600);
}
// Ship
// --------------
function drawShip() {
  ctx.save();
  ctx.rotate(ship.angle);
  ctx.translate(-ship.width / 2, -ship.height / 2);
  ctx.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
  ctx.restore();
}

// these functions are currently
// copy-pasted from the drawShip
// function, they have to eventually
// be able to take arrays as input
// (and act adequatly if the
// array is empty)

// ----------------------------------------
// function drawLaser() {
//   ctx.save();
//   ctx.rotate(laser.angle);
//   ctx.translate(-laser.width / 2, -laser.height / 2);
//   ctx.drawImage(laserImg, laser.x, laser.y, laser.width, laser.height);
//   ctx.restore();
// };
// function drawRound()  {
//   ctx.save();
//   ctx.rotate(round.angle);
//   ctx.translate(-round.width / 2, -round.height / 2);
//   ctx.drawImage(roundImg, round.x, round.y, round.width, round.height);
//   ctx.restore();
// };
// function drawTorpedo(); {
//   ctx.save();
//   ctx.rotate(torpedo.angle);
//   ctx.translate(-torpedo.width / 2, -torpedo.height / 2);
//   ctx.drawImage(torpedoImg, torpedo.x, torpedo.y, torpedo.width, torpedo.height);
//   ctx.restore();
// }

drawingLoop();

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(-500, -300, 1000, 600);
  drawBackground();
  drawShip();
  // drawLaser();
  // drawRound();
  // drawTorpedo();
  // drawProxy();
  // drawBoss();
  // drawBorder();
  // ctx.rotate(-ship.angle);

  // ask the browser for a chance to re-draw the scene
  requestAnimationFrame(function() {
    // set up a recursive loop (the function"drawingLoop" calls itself)
    drawingLoop();
  });
}

// mouse position handler
// document.onmousemove = function(event) {
//   console.log("(" + event.x + "," + event.y + ")");
// };

// 'accelerates' the ship
canvas.oncontextmenu = function(event) {
  event.preventDefault();
  console.log("Coucou rightclick");
};

// shoots
canvas.onclick = function(event) {
  event.preventDefault();
  console.log("Pew pew");
};

// updates the ship's rotation
canvas.onmousemove = function(event) {
  // clientX = event.clientX;
  // clientY = event.clientY;
  event.preventDefault();
  console.log(event);
  var mcos = document.querySelector(".cos");
  var msin = document.querySelector(".sin");
  relativex = event.clientX - window.innerWidth * 0.5;
  relativey = event.clientY - ctx.canvas.height * 0.5;
  relativecos =
    (relativex * 1 + relativey * 0) /
    (Math.sqrt(relativex ** 2 + relativey ** 2) * Math.sqrt(1 ** 2 + 0 ** 2));
  relativesin =
    (relativex * 0 + relativey * -1) /
    (Math.sqrt(relativex ** 2 + relativey ** 2) *
      Math.sqrt(0 ** 2 + (-1) ** 2));
  mcos.innerHTML = relativecos;
  msin.innerHTML = relativesin;
  ship.angle = Math.atan2(relativecos, relativesin);
};

window.onresize = function(event) {
  var gameFrame = document.querySelector(".spooners");
  var canvw = document.querySelector(".canv-w");
  var canvh = document.querySelector(".canv-h");
  canvw.innerHTML = window.innerWidth;
  canvh.innerHTML = "500";
};

// keydown event handler
document.onkeydown = function(event) {
  if (ship.isCrashed) {
    // exit the function without moving if Céline is crashed
    return;
  }
  // check keycodes @ keycode.info
  console.log("coucou KEY DOWN " + event.keyCode);
  switch (event.keyCode) {
    // case 37:
    // // prevents the default behaviour of keyboard presses (scrolling)
    // event.preventDefault();
    // ship.x = ship.x-5*Math.cos(ship.angle); // forward
    // ship.y = ship.y-5*Math.sin(ship.angle); // taking the angle into account
    // break;
    case 37:
      // prevents the default behaviour of keyboard presses (scrolling)
      event.preventDefault();
      ship.angle -= Math.PI / 90; // counter clockwise
      console.log(
        "COUCOU babord" + ship.angle + "posX" + ship.x + "posY" + ship.y
      );
      break;
    // case 39:
    // // prevents the default behaviour of keyboard presses (scrolling)
    // event.preventDefault();
    // ship.x = ship.x-5*Math.cos(ship.angle); // forward
    // ship.y = ship.y-5*Math.sin(ship.angle); // taking the angle into account
    // break;
    case 39:
      // prevents the default behaviour of keyboard presses (scrolling)
      event.preventDefault();
      ship.angle += Math.PI / 90; // clockwise
      console.log(
        "COUCOU tribord" + ship.angle + "posX" + ship.x + "posY" + ship.y
      );
      break;
  }
};

// shape3.on('mouseenter', function () {
//   stage.container().style.cursor = 'crosshair';
// });

// shape3.on('mouseleave', function () {
//   stage.container().style.cursor = 'default';
// });

// PUZZLE LOGIC
// -------------------------------------
// 4 arrays of puzzles

// * arithmetic provides thrust
// * logic ups shield
// * conditionals provides rounds
// * iterations ups laser
// * arrays provides torpedoes

// ENEMY LOGIC
