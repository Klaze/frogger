//Game Settings and Initial Variables
var initialVariablesGame = {
    BASESPEED: 40,
    STARTLEVEL: 0,
    STARTSPEED: 1,
    STARTSPAWNRATE: 2,
    SPEEDINCREASE: 1,
    SPAWNINCREASE: 0,
    MAXLEVEL: 3
};

var initialVariablesPlayer = {
    STARTLIVES: 6
};

var Game = function(initialVariables) {
    this.level = initialVariablesGame.STARTLEVEL;
    this.speed = initialVariablesGame.STARTSPEED;
    this.spawnRate = initialVariablesGame.STARTSPAWNRATE;
    this.speedIncrease = initialVariablesGame.SPEEDINCREASE;
    this.spawnIncrease = initialVariablesGame.SPAWNINCREASE;
    this.maxLevel = initialVariablesGame.MAXLEVEL;
    this.baseSpd = initialVariablesGame.BASESPEED;

};

Game.prototype.init = function() {

};

Game.prototype.update= function() {
    this.generateEnemy();
    allEnemies = allEnemies.filter(function (enemy) {
        return enemy.drawMe;
    });
};

Game.prototype.render = function() {
    ctx.fillText("Lives: "+player.lives, 80, 20);
};

Game.prototype.generateEnemy = function () {
    var numEnemy, i;

    //Generates new enemies
    if(Math.random() > 0.995) {
        numEnemy = (Math.random() > 0.98) ? 2 : 1;
        for( i = 0; i < numEnemy; i++) {
            allEnemies.push(new Enemy({
                x: -101,
                y: (Math.random() < 0.33) ? 83 : (Math.random() < 0.66) ? 166 : 249
            }, (Math.random() < 0.33) ? 1 : (Math.random() < 0.66) ? 2 : 3));
        }
    }
};

// Enemies our player must avoid
var Enemy = function(loc, spd) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.locX = loc.x;
    this.locY = loc.y;
    this.center = {x: this.locX + 50.5, y: this.locY + 85.5}
    this.spd = game.baseSpd*spd;
    this.drawMe = true;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.move(dt);
    this.isOnScreen();
};

Enemy.prototype.isOnScreen = function() {
    if(this.locX > 505) {
        this.drawMe = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.drawMe === true) {
        ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
    }
};

Enemy.prototype.move = function(dt) {
    this.locX += (dt * this.spd);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (loc, lives) {
    //Player code
    this.lives = lives;
    this.locX = loc.x;
    this.locY = loc.y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

Player.prototype.handleInput =function (keyPress) {
    if (keyPress === 'left') {
        this.locX -= (this.locX > 0) ? 101 : 0;
    } else if ( keyPress === 'up') {
        this.locY -= (this.locY > 0) ? 83 : 0;
    } else if ( keyPress === 'right') {
        this.locX += (this.locX < 404) ? 101 : 0;
    } else if ( keyPress === 'down') {
        this.locY += (this.locY < 415) ? 83 : 0;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game();
var allEnemies = [];

allEnemies.push(new Enemy({x: 83, y: 101}, 1));

var player = new Player({x: 202, y: 415}, 6);

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
