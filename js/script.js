// get the <canvas> tag from the document
var canvas = document.querySelector(".spooners");
// get the context object (has all the methods for drawing things)
var ctx = canvas.getContext("2d");
var originX = ctx.canvas.width * 0.5;
var originY = ctx.canvas.heigth * 0.5;
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
  ctx.translate(-ship.width / 2, -ship.height / 2);
  ctx.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
  ctx.restore();
}

drawingLoop();

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(-500, -300, 1000, 600);
  drawBackground();
  ctx.rotate(ship.angle);
  drawShip();
  ctx.rotate(-ship.angle);

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

canvas.onmousemove = function(event) {
  clientX = event.clientX;
  clientY = event.clientY;
  event.preventDefault();
  console.log(event);
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
