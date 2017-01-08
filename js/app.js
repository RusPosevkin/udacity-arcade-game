var CELL_HEIGHT = 83;
var CELL_WIDTH = 101;
var PLAYGROUND_WIDTH = 505;
var PLAYGROUND_HEIGHT = 450;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = this.x + dt * this.speed;
    if (newX < PLAYGROUND_WIDTH) {
      this.x = newX;
    } else {
      this.reset();
    }
};

Enemy.prototype.reset = function() {
    // initial location
    this.x = 0;
    this.y = 60 + CELL_HEIGHT * Number.parseInt(Math.random() * 3);

    // movement speed
    this.speed = Math.random() * 170 + 20;
};

Enemy.prototype.getPosition = function() {
  return {
    x: this.x,
    y: this.y
  };
};

Enemy.prototype.getImageSize = function() {
  return {
    height: 171,
    width: 101
  };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
};

Player.prototype.getPosition = function() {
  return {
    x: this.x,
    y: this.y
  };
};

Player.prototype.getImageSize = function() {
  return {
    height: 171,
    width: 101
  };
};

Player.prototype.update = function(dx, dy) {
  this.x = dx || this.x;
  this.y = dy || this.y;
};

Player.prototype.reset = function() {
  this.update(203, 390);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
  var currentX = this.x;
  var currentY = this.y;
  var newX;
  var newY;

  switch (keyCode) {
    case 'left':
      newX = currentX - CELL_WIDTH;

      if (newX > 0) {
        this.update(newX, currentY);
      }
      break;

    case 'right':
      newX = currentX + CELL_WIDTH;

      if (newX < PLAYGROUND_WIDTH) {
        this.update(newX, currentY);
      }
      break;

    case 'up':
      newY = currentY - CELL_HEIGHT;

      this.update(currentX, newY);
      if (newY < 0) {
        // player in the water - it's win
        this.reset();
        console.log('You\'re win!');
      }
      break;

    case 'down':
      newY = currentY + CELL_HEIGHT;

      if (newY < PLAYGROUND_HEIGHT) {
        this.update(currentX, newY);
      }
      break;
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var i = 0; i < 5; i++) {
  allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
