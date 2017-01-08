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

// Reset enemy with random position and movement speed.
// This method is also used for initialize enemy.
Enemy.prototype.reset = function() {
  // initial location
  this.x = 0;
  this.y = 60 + CELL_HEIGHT * Number.parseInt(Math.random() * 3);

  // movement speed
  this.speed = Math.random() * 170 + 20;
};

// Returns current position of enemy
Enemy.prototype.getPosition = function() {
  return {
    x: this.x,
    y: this.y
  };
};

// Return size in pixels of image used for enemy.
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

// Returns current position of player
Player.prototype.getPosition = function() {
  return {
    x: this.x,
    y: this.y
  };
};

// Return size in pixels of image used for player.
Player.prototype.getImageSize = function() {
  return {
    height: 171,
    width: 101
  };
};

// Update the player's position, required method for game
// Parameters: dx and dy, a new position of player
Player.prototype.update = function(dx, dy) {
  this.x = dx || this.x;
  this.y = dy || this.y;
};

// Reset player to start position.
// This method is also used for player initialize.
Player.prototype.reset = function() {
  this.update(203, 390);
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Navigate player by pressing the key.
// It also forbid player to go playground out.
// Parameter: keyCode is code of pressed button
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
        // reset and start again
        this.reset();
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
