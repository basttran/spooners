// get the <canvas> tag from the document
var canvas = document.querySelector(".spooners");
// get the context object (has all the methods for drawing things)
var ctx = canvas.getContext("2d");
// var originX = ctx.canvas.width * 0.5;
// var originY = ctx.canvas.height * 0.5;
// ctx.translate(originX, originY);
ctx.width=window.innerWidth;
ctx.height=window.innerHeight*0.85;
ctx.translate(ctx.width/2, ctx.height/2);
// var dims = document.querySelector(".spooners");

var ammo = 50;

// Assets
// ------
// Ship
// ------------

class Vessel {
  constructor(munStart) {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.img = new Image();
    this.img.src = "./images/temp_ship.png";
    this.width = 50;
    this.height = 50;
    this.mun = munStart,
    this.score = 0;
    this.isCrashed = false
  }
  align() {
    // rotation should probably be defined as a ship's method
  }
  thrust() {
    // 'acceleration' should probably be defined as a ship's method
  }
  shoot() {
    if (this.mun > 0) {
      this.mun -=1;
      var newRound = new Round();
      rounds.push(newRound);
    }
    
  }
  status() {
    sentinels.forEach(function (oneSentinel) {
      discCollision(ship, oneSentinel);
      if (ship.isCrashed===true) {
        alert("You loose!!!");
        ship = new Vessel(ammo);
        rounds = [];
        sentinels = [];
      }
    });
    if (ship.score > 9) {
      alert("You win!!!");
      ship = new Vessel(ammo);
      rounds = [];
      sentinels = [];
    }
    if (ship.mun == 0) {
      alert("You loose!!!");
      ship = new Vessel(ammo);
      rounds = [];
      sentinels = [];
    }
  }
}
var ship = new Vessel(ammo);



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
    this.isCrashed = false
  }
  move() {
    this.x -= this.speed * Math.cos(this.angle + Math.PI / 2);
    this.y -= this.speed * Math.sin(this.angle + Math.PI / 2);
  }
  status() {
    this.isCrashed = (this.x > ctx.width/2 || this.x < -ctx.width/2 || this.y > ctx.width || this.y < -ctx.width);
    };
  };

function roundsLogic() {
  //Manage rounds drawing
  rounds.forEach(function(oneRound) {
    oneRound.move();
    sentinels.forEach(function(oneSentinel) {
      discCollision(oneRound, oneSentinel);
    });
    oneRound.status();
  });
  // rounds = rounds.filter(function(oneRound) {
  //   return oneRound.isCrashed == true;
  // });
  drawRounds(rounds);
};

function removeCrashedSentinels() {
  sentinels = sentinels.filter(function(oneSentinel) {
    // if (oneAsset.isCrashed = true) {
    //   console.log(isCrashed)
    // }
    return !oneSentinel.isCrashed;
});
};

function removeCrashedRounds() {
  rounds = rounds.filter(function(oneRound) {
    // if (oneAsset.isCrashed = true) {
    //   console.log(isCrashed)
    // }
    return !oneRound.isCrashed;
});
};





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
    this.isCrashed = false
  }

  move() {
    if (this.x <= -(ctx.width/2-15)) {
      this.dx =-1*this.dx;
      this.x += 20;
    }
    if (this.x >= (-15+ctx.width/2)) {
      this.dx =-1*this.dx;
      this.x -= 20;
    }
    if (this.y <= -(ctx.height/2-15)) {
      this.dy =-1*this.dy;
      this.y +=20;
    }
    if (this.y >= (-15+ctx.height/2)) {
      this.dy =-1*this.dy;
      this.y -=20;
    }
    this.x += this.speed * this.dx * Math.cos(this.angle);
    this.y += this.speed * this.dy * Math.sin(this.angle);
  }
}

function sentinelsLogic() {
  //Manage sentinels drawing
  sentinels.forEach(function(oneSentinel) {
    if (oneSentinel.isCrashed == true) {
      console.log(ship.score);
      ship.score +=1;
    }
    drawSentinel(oneSentinel);
    oneSentinel.move();
  });
}
// function shipLogic() {
//   //Manage sentinels drawing
//   ship.forEach(function(oneSentinel) {
//     drawSentinel(oneSentinel);
//     oneSentinel.move();
//   });
// }




function discCollision(assetA, assetB) {
  var dx = assetA.x - assetB.x;
  var dy = assetA.y - assetB.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= assetA.width/2 + assetB.width/2) {
    assetA.isCrashed = true;
    assetB.isCrashed = true;
  }
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
  removeCrashedRounds();
  removeCrashedSentinels();
  ship.status();

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
  var newSentinel = new Sentinel((Math.floor(Math.random()*2)-0.5)*2*ctx.width*0.9,(Math.floor(Math.random()*2)-0.5)*2*ctx.height*0.9, Math.atan2(2*(Math.random()-0.5),2*(Math.random()-0.5)));
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
  event.preventDefault();
  console.log(event);
  // var mcos = document.querySelector(".cos");
  // var msin = document.querySelector(".sin");
  relativex = event.clientX - ctx.width * 0.5;
  relativey = event.clientY - ctx.height * 0.5;
  relativecos =
    (relativex * 1 + relativey * 0) /
    (Math.sqrt(relativex ** 2 + relativey ** 2) * Math.sqrt(1 ** 2 + 0 ** 2));
  relativesin =
    (relativex * 0 + relativey * -1) /
    (Math.sqrt(relativex ** 2 + relativey ** 2) *
      Math.sqrt(0 ** 2 + (-1) ** 2));
  // mcos.innerHTML = relativecos;
  // msin.innerHTML = relativesin;
  ship.angle = Math.atan2(relativecos, relativesin);
};

// window.onresize = function(event) {
//   ctx.clearRect(-ctx.width/2, -ctx.height/2, ctx.width, ctx.height);
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

// MOTTOS

var mottos = ["cooper8",
              "contempl8",
              "integr8",
              "assimil8",
              "extermin8",
              "elabor8",
              "replic8",
              "instanti8",
              "collabor8",
              "decim8",
              "concaten8",
              "communic8",
              "anticip8",
              "complic8",
              "ordonn8",
              "duplica8",
              "interpol8",
              "annihil8",
              "compens8",
              "enumer8",
              "rot8",
              "retali8",
              "devi8"];
