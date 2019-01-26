// get the <canvas> tag from the document
var canvas = document.getElementById("spooners");
var parent = document.getElementById("middle");
var leftSibling = document.getElementById("left");
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;
var ctx = canvas.getContext("2d");
ctx.translate(parent.offsetWidth / 2, parent.offsetHeight / 2);

operations = [
  {
    code: "(x**3 + 6)*7",
    inputQuestion: "if x==2 this expression will return ...",
    inputAnswer: "98",
    outputQuestion: "which value of x makes this expression return 42",
    outputAnswer: "0",
    solved: false
  },
  {
    code: "x%11",
    inputQuestion: "if 'x===80' this expression will return ...",
    inputAnswer: "3",
    outputQuestion: "provide the smallest integer (x) for the expression to return 9",
    outputAnswer: "20",
    solved: false
  },
  {
    code: "Empty",
    inputQuestion: "Empty",
    inputAnswer: "",
    outputQuestion: "Empty",
    outputAnswer: "",
    solved: false
  }
];

var operSlotCode = document.querySelector(".operation-jscode");
var operSlotInput = document.querySelector(".operation-input");
var operSlotOutput = document.querySelector(".operation-output");
operSlotCode.innerHTML = operations[0].code;
operSlotInput.innerHTML = operations[0].inputQuestion;
operSlotOutput.innerHTML = operations[0].outputQuestion;

opin.addEventListener("input", function(evt) {
  checkOperations();
});
opout.addEventListener("input", function(evt) {
  checkOperations();
});

function checkOperations() {
  var opin = document.getElementById("opin");
  var opout = document.getElementById("opout");
  if (
    opin.value == operations[0].inputAnswer &&
    opout.value == operations[0].outputAnswer
  ) {
    ship.mun += 1;
    operations.shift();
    opin.value = "";
    opout.value = "";
    operSlotCode.innerHTML = operations[0].code;
    operSlotInput.innerHTML = operations[0].inputQuestion;
    operSlotOutput.innerHTML = operations[0].outputQuestion;
  }
}

evaluations = [
  {
    code: "var x; x > 67 ;",
    inputQuestion: "if 'x==97', what is returned by the latter expression",
    inputAnswer: "true",
    outputQuestion: "smallest natural number (x) to makes this expression return 'false",
    outputAnswer: "0",
    solved: false
  },
  {
    code: "var x; x <= 99 ;",
    inputQuestion: "if 'x==199', what is returned by expression",
    inputAnswer: "false",
    outputQuestion: "largest integer for x to makes this expression return 'true",
    outputAnswer: "99",
    solved: false
  },
  {
    code: "Empty",
    inputQuestion: "Empty",
    inputAnswer: "",
    outputQuestion: "Empty",
    outputAnswer: "",
    solved: false
  }
];

var evalSlotCode = document.querySelector(".evaluation-jscode");
var evalSlotInput = document.querySelector(".evaluation-input");
var evalSlotOutput = document.querySelector(".evaluation-output");
evalSlotCode.innerHTML = evaluations[0].code;
evalSlotInput.innerHTML = evaluations[0].inputQuestion;
evalSlotOutput.innerHTML = evaluations[0].outputQuestion;

evin.addEventListener("input", function(evt) {
  checkEvaluations();
});
evout.addEventListener("input", function(evt) {
  checkEvaluations();
});

function checkEvaluations() {
  var evin = document.getElementById("evin");
  var evout = document.getElementById("evout");
  if (
    evin.value == evaluations[0].inputAnswer &&
    evout.value == evaluations[0].outputAnswer
  ) {
    ship.mun += 2;
    evaluations.shift();
    evin.value = "";
    evout.value = "";
    evalSlotCode.innerHTML = evaluations[0].code;
    evalSlotInput.innerHTML = evaluations[0].inputQuestion;
    evalSlotOutput.innerHTML = evaluations[0].outputQuestion;
  }
}

conditions = [
  {
    code: "var x; if (x > 7 && x%3 == 0) {return x+'plip';} else {x**2+'plop';}",
    inputQuestion: "if x==81 this expression will return ...",
    inputAnswer: "81plip",
    outputQuestion: "smallest natural number (x) for this expression to return '0plop'",
    outputAnswer: "0",
    solved: false
  },
  {
    code: "x%11",
    inputQuestion: "if 'x===80' this expression will return ...",
    inputAnswer: "3",
    outputQuestion: "provide a value for x so that it returns 9",
    outputAnswer: "20",
    solved: false
  },
  {
    code: "Empty",
    inputQuestion: "Empty",
    inputAnswer: "",
    outputQuestion: "Empty",
    outputAnswer: "",
    solved: false
  }
];

var condSlotCode = document.querySelector(".condition-jscode");
var condSlotInput = document.querySelector(".condition-input");
var condSlotOutput = document.querySelector(".condition-output");
condSlotCode.innerHTML = conditions[0].code;
condSlotInput.innerHTML = conditions[0].inputQuestion;
condSlotOutput.innerHTML = conditions[0].outputQuestion;

itin.addEventListener("input", function(evt) {
  checkConditions();
});
itout.addEventListener("input", function(evt) {
  checkConditions();
});

function checkConditions() {
  var itin = document.getElementById("coin");
  var itout = document.getElementById("coout");
  if (
    itin.value == conditions[0].inputAnswer &&
    itout.value == conditions[0].outputAnswer
  ) {
    ship.mun += 5;
    conditions.shift();
    coin.value = "";
    coout.value = "";
    condSlotCode.innerHTML = conditions[0].code;
    condSlotInput.innerHTML = conditions[0].inputQuestion;
    condSlotOutput.innerHTML = conditions[0].outputQuestion;
  }
}

iterations = [
  {
    code: "var x; for (i = 5; i < 7; i++) { x *= x; return x;}",
    inputQuestion: "if 'x==2' this expression will return ...",
    inputAnswer: "8",
    outputQuestion: "which value of x makes this expression return 216",
    outputAnswer: "6",
    solved: false
  },
  {
    code: "var y; for (k = 0; k < 4; i+=2) { y += 3; return y;}",
    inputQuestion: "if 'y==1' this expression will return ...",
    inputAnswer: "7",
    outputQuestion: "provide a value for y so that it returns 9",
    outputAnswer: "3",
    solved: false
  },
  {
    code: "Empty",
    inputQuestion: "Empty",
    inputAnswer: "",
    outputQuestion: "Empty",
    outputAnswer: "",
    solved: false
  }
];

var iterSlotCode = document.querySelector(".iteration-jscode");
var iterSlotInput = document.querySelector(".iteration-input");
var iterSlotOutput = document.querySelector(".iteration-output");
iterSlotCode.innerHTML = iterations[0].code;
iterSlotInput.innerHTML = iterations[0].inputQuestion;
iterSlotOutput.innerHTML = iterations[0].outputQuestion;

itin.addEventListener("input", function(evt) {
  checkIterations();
});
itout.addEventListener("input", function(evt) {
  checkIterations();
});

function checkIterations() {
  var itin = document.getElementById("itin");
  var itout = document.getElementById("itout");
  if (
    itin.value == iterations[0].inputAnswer &&
    itout.value == iterations[0].outputAnswer
  ) {
    ship.mun += 10;
    iterations.shift();
    itin.value = "";
    itout.value = "";
    iterSlotCode.innerHTML = iterations[0].code;
    iterSlotInput.innerHTML = iterations[0].inputQuestion;
    iterSlotOutput.innerHTML = iterations[0].outputQuestion;
  }
}

var ammo = 20;

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
    this.mun = munStart;
    this.score = 0;
    this.isCrashed = false;
  }
  align() {
    // rotation should probably be defined as a ship's method
  }
  thrust() {
    // 'acceleration' should probably be defined as a ship's method
  }
  shoot() {
    if (this.mun > 0) {
      this.mun -= 1;
      var newRound = new Round();
      rounds.push(newRound);
    }
  }
  status() {
    sentinels.forEach(function(oneSentinel) {
      discCollision(ship, oneSentinel);
      if (ship.isCrashed === true) {
        alert("You loose!!!");
        ship = new Vessel(ammo);
        rounds = [];
        sentinels = [];
      }
    });
    if (ship.score > 29) {
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
    this.isCrashed = false;
  }
  move() {
    this.x -= this.speed * Math.cos(this.angle + Math.PI / 2);
    this.y -= this.speed * Math.sin(this.angle + Math.PI / 2);
  }
  status() {
    this.isCrashed =
      this.x > ctx.width / 2 ||
      this.x < -ctx.width / 2 ||
      this.y > ctx.width ||
      this.y < -ctx.width;
  }
}

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
}

function removeCrashedSentinels() {
  sentinels = sentinels.filter(function(oneSentinel) {
    // if (oneAsset.isCrashed = true) {
    //   console.log(isCrashed)
    // }
    return !oneSentinel.isCrashed;
  });
}

function removeCrashedRounds() {
  rounds = rounds.filter(function(oneRound) {
    // if (oneAsset.isCrashed = true) {
    //   console.log(isCrashed)
    // }
    return !oneRound.isCrashed;
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
    this.isCrashed = false;
  }

  move() {
    if (this.x <= -(canvas.width / 2 - 15)) {
      this.dx = -1 * this.dx;
      this.x += 20;
    }
    if (this.x >= -15 + canvas.width / 2) {
      this.dx = -1 * this.dx;
      this.x -= 20;
    }
    if (this.y <= -(canvas.height / 2 - 15)) {
      this.dy = -1 * this.dy;
      this.y += 20;
    }
    if (this.y >= -15 + canvas.height / 2) {
      this.dy = -1 * this.dy;
      this.y -= 20;
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
      ship.score += 1;
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

  if (distance <= assetA.width / 2 + assetB.width / 2) {
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
  // ctx.translate(150 , 75);
  ctx.fillRect(
    -(canvas.width / 2),
    -(canvas.height / 2),
    canvas.width,
    canvas.height
  );
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
  // ctx.translate(150 , 75);
  drawBackground();
  drawShip();
  // drawLaser();
  roundsLogic();
  sentinelsLogic();
  removeCrashedRounds();
  removeCrashedSentinels();
  updateStats();
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
// canvas.oncontextmenu = function(event) {
//   event.preventDefault();
//   console.log("Coucou rightclick");

// };

(function sentinelLoop() {
  const rand = Math.round(Math.random() * (6000 - 2000)) + 2000;
  setTimeout(function() {
    var newSentinel = new Sentinel(
      (Math.floor(Math.random() * 2) - 0.5) * 2 * canvas.width * 0.9,
      (Math.floor(Math.random() * 2) - 0.5) * 2 * canvas.height * 0.9,
      Math.atan2(2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5))
    );
    sentinels.push(newSentinel);
    sentinelLoop();
  }, rand);
})();

function updateStats() {
  var munitions = document.querySelector(".munitions");
  var killcount = document.querySelector(".killcount");
  munitions.innerHTML = "Rounds left: " + ship.mun + " bad boys";
  killcount.innerHTML = "So far " + ship.score + " hostiles down";
}

// shoots
canvas.onclick = function(event) {
  event.preventDefault();
  console.log("Pew pew");
  ship.shoot();
};

canvas.oncontextmenu = function(event) {
  event.preventDefault();

};

canvas.onmousedown = function(event) {
  event.preventDefault();
}
     

// updates the ship's rotation
canvas.onmousemove = function(event) {
  event.preventDefault();
  // console.log(event);
  // var mousex = document.querySelector(".mouse-x");
  // var mousey = document.querySelector(".mouse-y");
  // var angle = document.querySelector(".angle");
  relativex = -leftSibling.offsetWidth + event.clientX - canvas.width * 0.5;
  relativey = event.clientY - canvas.height * 0.5;
  relativecos =
    (relativex * 1 + relativey * 0) /
    (Math.sqrt(relativex ** 2 + relativey ** 2) * Math.sqrt(1 ** 2 + 0 ** 2));
  relativesin =
    (relativex * 0 + relativey * -1) /
    (Math.sqrt(relativex ** 2 + relativey ** 2) *
      Math.sqrt(0 ** 2 + (-1) ** 2));
  // mousex.innerHTML = event.clientX; //relativex;
  // mousey.innerHTML = event.clientY; //relativey;
  ship.angle = Math.atan2(relativecos, relativesin);
};

// yo les bandits, je peux checker comment se comporte ma geometrie sur un de vos écrans? (2mn)

// window.onresize = function(event) {
//   ctx.clearRect(-ctx.width/2, -ctx.height/2, ctx.width, ctx.height);
//   ctx.translate(window.innerWidth/2, window.innerHeight*0.75/2);
//   ctx.width=window.innerWidth;
//   ctx.height=window.innerHeight*0.75;
//   canvw.innerHTML = window.innerWidth;
//   canvh.innerHTML = window.innerHeight*0.75;

// };

// // keydown event handler
// document.onkeydown = function(event) {
//   if (ship.isCrashed) {
//     // exit the function without moving if Céline is crashed
//     return;
//   }
//   // check keycodes @ keycode.info
//   console.log("coucou KEY DOWN " + event.keyCode);
//   switch (event.keyCode) {
//     case 37:
//       // prevents the default behaviour of keyboard presses (scrolling)
//       event.preventDefault();
//       ship.angle -= Math.PI / 90; // counter clockwise
//       console.log(
//         "COUCOU babord" + ship.angle + "posX" + ship.x + "posY" + ship.y
//       );
//       break;
//     case 39:
//       // prevents the default behaviour of keyboard presses (scrolling)
//       event.preventDefault();
//       ship.angle += Math.PI / 90; // clockwise
//       console.log(
//         "COUCOU tribord" + ship.angle + "posX" + ship.x + "posY" + ship.y
//       );
//       break;
//   }
// };

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

var mottos = [
  "cooper8",
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
  "devi8"
];
