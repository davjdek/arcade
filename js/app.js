let allEnemies = [];
let level = 1;

// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x=x;
	this.y=y;
	this.speed=speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x+=this.speed*dt;
	if (this.x>485){
		this.x=-80;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
	this.x=200;
	this.y=425;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
	const self = this;
	//manage enemy-player collisions
	allEnemies.forEach(function(bug){
		if (self.x>bug.x-80 && self.x<bug.x+80 && self.y>bug.y-70 && self.y<bug.y+70){
			alert("your're dead");
			lives-=1;
			document.querySelector("#lives").textContent=lives;
			dead=true;
			if (lives===0){
				deadAll=true;
			};
		}
	});
	
	//prevents player from falling off screen
	if (this.x<0){
		this.x=0;
	}
	else if (this.x>425){
		this.x=425;
	}
	if (this.y>440){
		this.y=440
	}
	//manages game winning 
	else if (this.y<=0){
		alert(`Congratulations! You won in ${document.querySelector("#minutes").innerHTML}.${document.querySelector("#seconds").innerHTML}!`);
		winner = true;
		
	}
	
};

//manage player move
Player.prototype.handleInput = function(arrow) {
    if (arrow=="left"){
		this.x-=25
	}
	if (arrow=="right"){
		this.x+=25
	}
	if (arrow=="up"){
		this.y-=25
	}
	if (arrow=="down"){
		this.y+=25
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1=new Enemy(0,60,20);
const bug2=new Enemy(0,145,60);
const bug3=new Enemy(0,230,40);
const bug4=new Enemy (272,60,20);
const bug5=new Enemy (272,145,60);
const bug6=new Enemy (272,230,40);
allEnemies.push(bug1);
allEnemies.push(bug2);
allEnemies.push(bug3);
	
const player = new Player();

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
