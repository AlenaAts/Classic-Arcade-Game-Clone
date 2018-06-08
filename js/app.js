
/********************************* enemy class *********************************/

// Constructor function for enemies
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 200) + 100;
    }

    // collision detection
   if (player.x < this.x + 50 && 
        player.x + 50 > this.x &&
        player.y < this.y + 50 &&
        player.y + 50 > this.y) {
        player.x = startX;
        player.y = startY;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/******************************** player class ********************************/

// Constructor function for the player
let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// The player reaches the water and gets back to start position
Player.prototype.update = function(dt) {
    if (player.y < 50) {
        setTimeout(function() {
            player.x = startX;
            player.y = startY;
        }, 100)
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player's move control by keyboard
Player.prototype.handleInput = function(key) {
    let stepX = 101;
    let stepY = 83;
    /*switch(key) {
        case "left" && this.x > 0:
            this.x -= 101;
        break;
        case "right" && this.x < 404:
            this.x += 101;
        break;
        case "up" && this.y > 0:
            this.y -= 83;
        break;
        case "down" && this.y < 332:
            this.y += 83;
        break;
    }*/  // is it possible to work with switch?

    if (key == "left" && this.x > 0) {
        this.x -= stepX;
    } else if (key == "right" && this.x < 404) {
        this.x += stepX;
    } else if (key == "up" && this.y > 0) {
        this.y -= stepY;
    } else if (key == "down" && this.y < 332) {
        this.y += stepY;
    }
};

/******************************************************************************/

// three enemy objects
const first = new Enemy(0, 61, 150);
const second = new Enemy(0,144, 100);
const third = new Enemy(0, 227, 200);

// coordinates for the player
const startX = 202;
const startY = 395;

// defining enemies and the player
const allEnemies = [first, second, third];
const player = new Player(startX, startY);


// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
