
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
        this.speed += Math.floor(Math.random() + 50);
    }

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




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    if (player.y < 50) {
        setTimeout(function() {
            player.x = startX;
            player.y = startY;
        }, 100)
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    let stepX = 101;
    let stepY = 83;
    // moving character?

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




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const first = new Enemy(0, 61, 150);
const second = new Enemy(0,144, 100);
const third = new Enemy(0, 227, 50);
const startX = 202;
const startY = 395;

const allEnemies = [first, second, third];
const player = new Player(startX, startY);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});