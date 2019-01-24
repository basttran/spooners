// get the <canvas> tag from the document
var canvas = document.querySelector(".spooners");
// get the context object (has all the methods for drawing things)
var ctx = canvas.getContext("2d");
// var originX = ctx.canvas.width * 0.5;
// var originY = ctx.canvas.height * 0.5;
// ctx.translate(originX, originY);
ctx.width=window.innerWidth;
ctx.height=window.innerHeight*0.75;
ctx.translate(ctx.width/2, ctx.height/2);



// Assets
// ------
// Ship
// ------------

class Vessel {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.img = new Image();
    this.img.src = "./images/temp_ship.png";
    this.width = 50;
    this.height = 50;
  }
  align() {
    // rotation should probably be defined as a ship's method
  }
  thrust() {
    // 'acceleration' should probably be defined as a ship's method
  }
  shoot() {
    var newRound = new Round();
    rounds.push(newRound);
  }
}
var ship = new Vessel();

var rounds = [];

class Round {
  constructor() {
    this.x = ship.x;
    this.y = ship.y;
    this.angle = ship.angle;
    this.img = new Image();
    this.img.src = "./images/temp_round.png";
    this.speed = 4;
    this.width = 10;
    this.height = 10;
  }
  move() {
    this.x -= this.speed * Math.cos(this.angle + Math.PI / 2);
    this.y -= this.speed * Math.sin(this.angle + Math.PI / 2);
    // 'acceleration' should probably be defined as a ship's method
  }
}

function roundsLogic() {
  //Manage rounds drawing
  rounds.forEach(function(oneRound) {
    drawRound(oneRound);
    oneRound.move();
  });
}

var sentinels = [];

class Sentinel {
  constructor(startX, startY, startAngle) {
    this.x = startX;
    this.y = startY;
    this.angle = startAngle;
    this.img = new Image();
    this.img.src = "./images/temp_sentinel.png";
    this.dx = 1;
    this.dy = 1;
    this.speed = 2;
    this.width = 25;
    this.height = 25;
  }

  move() {
    if (this.x <= -(ctx.width/2-10)) {
      this.dx =-1*this.dx;
      this.x += 10;
    }
    if (this.x >= (-10+ctx.width/2)) {
      this.dx =-1*this.dx;
      this.x -= 10;
    }
    if (this.y <= -(ctx.height/2-10)) {
      this.dy =-1*this.dy;
      this.y +=10;
    }
    if (this.y >= (-10+ctx.height/2)) {
      this.dy =-1*this.dy;
      this.y -=10;
    }
    this.x += this.speed * this.dx * Math.cos(this.angle);
    this.y += this.speed * this.dy * Math.sin(this.angle);// *this.dy
    //* Math.cos(this.dx*this.angle + Math.PI / 2);
    //this.y += this.speed * Math.sin(this.dy*this.angle + Math.PI / 2);
    // 'acceleration' should probably be defined as a ship's method
  }
}

function sentinelsLogic() {
  //Manage sentinels drawing
  sentinels.forEach(function(oneSentinel) {
    drawSentinel(oneSentinel);
    oneSentinel.move();
  });
}

// Drawing
// -------
// Background
// --------------
function drawBackground() {
  // fillStyle controls the color of ALL the next files
  ctx.fillStyle = "black";
  // draw a solid rectangle that covers all the canvas
  ctx.fillRect(-ctx.width/2, -ctx.height/2, ctx.width, ctx.height);
}
// Ship
// --------------
function drawShip() {
  ctx.save();
  ctx.rotate(ship.angle);
  ctx.translate(-ship.width / 2, -ship.height / 2);
  ctx.drawImage(ship.img, ship.x, ship.y, ship.width, ship.height);
  ctx.restore();
}

function drawRound(round) {
  ctx.save();
  ctx.translate(-round.width / 2, -round.height / 2);
  ctx.drawImage(round.img, round.x, round.y, round.width, round.height);
  ctx.restore();
}

function drawRounds(rounds) {
  rounds.forEach(function(oneRound) {
    drawRound(oneRound);
  });
}

function drawSentinel(sentinel) {
  ctx.save();
  ctx.translate(-sentinel.width / 2, -sentinel.height / 2);
  ctx.drawImage(
    sentinel.img,
    sentinel.x,
    sentinel.y,
    sentinel.width,
    sentinel.height
  );
  ctx.restore();
}

function drawSentinels(sentinels) {
  sentinels.forEach(function(oneSentinel) {
    drawSentinel(oneSentinel);
  });
}

drawingLoop();

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(-ctx.width/2, -ctx.height/2, ctx.width, ctx.height);
  drawBackground();
  drawShip();
  // drawLaser();
  roundsLogic();
  sentinelsLogic();
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


///// USER INTERACTION

// mouse position handler
// document.onmousemove = function(event) {
//   console.log("(" + event.x + "," + event.y + ")");
// };

// 'accelerates' the ship
canvas.oncontextmenu = function(event) {
  event.preventDefault();
  console.log("Coucou rightclick");
  var newSentinel = new Sentinel(150,150, Math.atan2(2*(Math.random()-0.5),2*(Math.random()-0.5)));
  sentinels.push(newSentinel);
};


// shoots
canvas.onclick = function(event) {
  event.preventDefault();
  console.log("Pew pew");
  ship.shoot();
};

// updates the ship's rotation
canvas.onmousemove = function(event) {
  // clientX = event.clientX;
  // clientY = event.clientY;
  event.preventDefault();
  console.log(event);
  var mcos = document.querySelector(".cos");
  var msin = document.querySelector(".sin");
  relativex = event.clientX - ctx.width * 0.5;
  relativey = event.clientY - ctx.height * 0.5;
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

// window.onresize = function(event) {
//   ctx.translate(window.innerWidth/2, window.innerHeight*0.75/2);
//   ctx.width=window.innerWidth;
//   ctx.height=window.innerHeight*0.75;
//   canvw.innerHTML = window.innerWidth;
//   canvh.innerHTML = window.innerHeight*0.75;
  
// };



// keydown event handler
document.onkeydown = function(event) {
  if (ship.isCrashed) {
    // exit the function without moving if Céline is crashed
    return;
  }
  // check keycodes @ keycode.info
  console.log("coucou KEY DOWN " + event.keyCode);
  switch (event.keyCode) {
    case 37:
      // prevents the default behaviour of keyboard presses (scrolling)
      event.preventDefault();
      ship.angle -= Math.PI / 90; // counter clockwise
      console.log(
        "COUCOU babord" + ship.angle + "posX" + ship.x + "posY" + ship.y
      );
      break;
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
