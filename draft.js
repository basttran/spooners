//GENERAL RE-USABLE FUNCTIONS

//Draw elements on canvas
function draw(object) {
  ctx.beginPath();
  ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  ctx.closePath();
}

//------------------------------------------------------------------------------------------------------------------------
//CHARACTER METHODS
//------------------------------------------------------------------------------------------------------------------------

class Character {
  constructor(x, img, imgWidth) {
    this.x = x;
    this.y = 80;
    this.ego = 100;
    this.img = img;
    this.width = imgWidth * zoomFactor;
    this.height = 150 * zoomFactor;
  }
}

// Characters creation

//Load image for Trump
const trumpimg = new Image();
trumpimg.src = "images/Trump.png";
//creation of Trump
const trump = new Character(25, trumpimg, 147);

//------------------------------------------------------------------------------------------------------------------------
//CHARACTERS PROJECTILES
//------------------------------------------------------------------------------------------------------------------------

//TWEETS object and methods
class Tweet {
  constructor() {
    this.x = trump.x + trump.width + 5;
    this.y = trump.y + 25;
    this.img = new Image();
    this.img.src = "./images/Logo-Twitter.png";
    this.height = 24;
    this.width = 30;
    this.isIntercepted = false;
  }

  move() {
    this.x += highSpeed;
  }
}

//HAVE THE CHARACTERS RANDOMLY SHOOT PROJECTILES
let tweets = [];
let rockets = [];

//This function adds amo in the array that will serve as a reserve for shootings
function addTweets() {
  const newTweet = new Tweet();
  const newSlowTweet = new SlowTweet();
  tweets.push(newTweet);
  tweets.push(newSlowTweet);
}

//This self-calling function calls the addTweets and addRockets functions with randomIntervals
(function tweetLoop() {
  const rand = Math.round(Math.random() * (6000 - 2000)) + 2000;
  setTimeout(function() {
    addTweets();
    tweetLoop();
  }, rand);
})();

//------------------------------------------------------------------------------------------------------------------------
//USER BAR OBJECT AND METHODS
//------------------------------------------------------------------------------------------------------------------------

//User Bar Prototype
class UserBar {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 80;
    this.img = new Image();
    this.img.src = "./images/HeartBar.png";
    this.height = 60 * zoomFactor;
    this.width = 60 * zoomFactor;
  }

  shoot() {
    const newHeart = new Heart();
    hearts.push(newHeart);
  }
}

//Creation of the userBar
const userBar = new UserBar();
const hearts = [];

//Heart Projectile Object and methods
class Heart {
  constructor() {
    this.x = userBar.x;
    this.y = userBar.y;
    this.img = new Image();
    this.img.src = "./images/like.png";
    this.width = 30;
    this.height = 30;
  }

  move() {
    this.y -= 15;
  }
}

//----------------------------------------------------------------------------------------------------------
//GAME LOGIC AND VISUALS
//----------------------------------------------------------------------------------------------------------

//Draw loop (){
const drawLoop = setInterval(function() {
  //erase the old drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //redraw the background, the characters and user bar
  draw(board);
  draw(userBar);
  draw(trump);

  //Manage hearts, rockets and tweets drawing and collisions
  heartsLogic();
  tweetsLogic();

  //erase tweets that have been intercepted by a heart
  tweets = tweets.filter(function(oneTweet) {
    return !oneTweet.isIntercepted;
  });
}, 1000 / 60);

function heartsLogic() {
  //Manage heart drawing and interaction with projectiles
  hearts.forEach(function(oneHeart) {
    //manage tweets interaction with hearts
    tweets.forEach(function(oneTweet) {
      if (collision(oneHeart, oneTweet)) {
        oneTweet.isIntercepted = true;
      }
    });
    //Draw hearts
    draw(oneHeart);
    oneHeart.move();
  });
}

function tweetsLogic() {
  //manage tweets drawings and interaction with target
  tweets.forEach(function(oneTweet) {
    //if a tweet hits Kim, kim's ego gets damage
    if (collision(oneTweet, kim)) {
      oneTweet.isIntercepted = true;
      kim.ego -= 5;
      document.getElementById("kim-ego").setAttribute("value", kim.ego);

      //if Kim loses face: GAME OVER - NUCLEAR WAR: YOUR KIDS WILL BE BORN WITH THREE LEGS AND ONLY ONE EYE
      if (kim.ego <= 0) {
        clearInterval(drawLoop);
        clearInterval(timerInterval);
      }
    }

    //Draw tweet
    draw(oneTweet);
    oneTweet.move();
  });
}
//
//-------------------------------------------------------------------------------------------------------------------
//USER INPUT
//-------------------------------------------------------------------------------------------------------------------
const body = document.querySelector("body");
body.onkeydown = e => {
  if (e.keyCode === 39) {
    if (userBar.x <= 1100) {
      userBar.x += 30;
      e.preventDefault();
    }
  } else if (e.keyCode === 37) {
    if (userBar.x >= 100) {
      userBar.x -= 30;
      e.preventDefault();
    }
  } else if (e.keyCode === 32) {
    userBar.shoot();
    e.preventDefault();
  }
};
