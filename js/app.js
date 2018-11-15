
// Enemies our player must avoid
var Enemy = function() {
    this.speed = Math.round(Math.random() * 3) + 1;
    setTimeout(() => {
        this.x = -50;
        this.y = [65, 149, 232][Math.round(Math.random() *2)];
    }, this.speed * 100);

    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    this.x = (this.x + dt * this.speed * 100) % (500)

    if(this.x > ctx.canvas.width) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    if(player.x < this.x + 80
        && player.x + 80 > this.x
        && player.y < this.y + 60
        && 60 + player.y > this.y) {
        player.x = ctx.canvas.width/2.5;
        player.y = ctx.canvas.height/1.5;
    }
    };

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function () {
    this.speed = Math.round(Math.random() * 3) + 1;
}
var Player = function () {
    this.x =  2 * 101; //ctx.canvas.width / 2;
    this.y = 5 * 80; //ctx.canvas.height - 101
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function (dt) {

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}




Player.prototype.handleInput = function (keyPress) {
    if(keyPress === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if(keyPress === 'right' && this.x < ctx.canvas.width - 101) {
        this.x += 101;
    }
    if(keyPress === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if(keyPress === 'down' && this.y < ctx.canvas.height - 206) {
        this.y += 83;
    }

    if(this.y < 0) {
        setTimeout(function() {
            player.x = ctx.canvas.width/2.5;
            player.y = ctx.canvas.height/1.5;
        }, 500)
    }
}
var allEnemies = [];
for(var i = 0; i < 3; i++) {
    allEnemies[i] = new Enemy();
    setInterval(() => {
        if(allEnemies[0].x > ctx.canvas.width){
            allEnemies[allEnemies.length] = new Enemy();
            allEnemies.splice(0, 1)
        }
    }, 300)
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
