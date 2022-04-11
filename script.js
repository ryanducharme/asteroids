canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed;
let oldTimeStamp = 0;
let fps;
let deltaTime;
let player = new Player();
let pEmitter = new ParticleEmitter(new Vector(300,300));
// let particle = new Particle(new Vector(100,100), 'red');
let mouseInteractables = [];
let inputHandlerState = {
    north: false,
    south: false,
    east: false,
    west: false,
    fire: false,
    boost: false,
    mouseState: {
        mouseDown: false,
        mouseUp: false,
        x: 0,
        y: 0
    }

}
let asteroids = [];
let gameState = {
    pause: false,
    running: true
}
let collissionManager = new CollisionManager();
collissionManager.collideableObjects.push(player);
mouseInteractables.push(player);

for (let i = 0; i < 20; i++) {
    asteroids.push(new Asteroid(i, new Vector(Math.random() * canvas.width, Math.random() * canvas.height), (Math.random() * 80) + 20));
    // asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500), 100));
    asteroids[i].calcAsteroidPoints(12, 10);
    // asteroids[i].direction = new Vector(randomSign(1), randomSign(1));
    collissionManager.collideableObjects.push(asteroids[i]);

    mouseInteractables.push(asteroids[i]);
}

window.addEventListener('mousemove', function (e) {
    inputHandlerState.mouseState.x = e.x;
    inputHandlerState.mouseState.y = e.y;
    // console.log(inputHandlerState.mouseState.x);
})
window.addEventListener('mousedown', function (e) {
    inputHandlerState.mouseState.mouseDown = true;
});
window.addEventListener('mouseup', function (e) {
    inputHandlerState.mouseState.mouseDown = false;
});
window.addEventListener('keydown', function (e) {
    console.log(e.key);
    if (e.key == 'w') {
        inputHandlerState.north = true;
    }
    if (e.key == 'a') {
        inputHandlerState.west = true;
    }
    if (e.key == 's') {
        inputHandlerState.south = true;
    }
    if (e.key == 'd') {
        inputHandlerState.east = true;
    }
    if (e.key == 'Escape') {
        if (gameState.pause) {
            gameState.pause = false;
        } else {
            gameState.pause = true;
        }

    }
});
window.addEventListener('keyup', function (e) {

    if (e.key == 'w') {
        inputHandlerState.north = false;
    }
    if (e.key == 'a') {
        inputHandlerState.west = false;
    }
    if (e.key == 's') {
        inputHandlerState.south = false;
    }
    if (e.key == 'd') {
        inputHandlerState.east = false;
    }
})
window.requestAnimationFrame(gameLoop);

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

function randomSign(num) {
    if (Math.random() >= 0.5) {
        return -num;
    } else {
        return num;
    }
}
function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame

    deltaTime = (timeStamp - oldTimeStamp);
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    fps = 1/secondsPassed;
    update(deltaTime);
    draw();
    // console.log(fps);
    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}
function update(deltaTime) {
    // console.log(mouseState);

    if (!gameState.pause) {
        player.update(deltaTime);
        asteroids.forEach(asteroid => asteroid.update(deltaTime));
        collissionManager.update(deltaTime);
    }
    // pEmitter.position.x = player.position.x;
    // pEmitter.position.y = player.position.y;
    
    // updateUI(deltaTime);
    // console.log(fps);

}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'white'

    pEmitter.draw(context);

    player.draw(context);
    asteroids.forEach(asteroid => asteroid.draw(context));


    // particle.draw(context);
    // drawUI(context);

}



function Button(width, height, position, color) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.color = color;
    this.visible = true;
    this.text = '';
    this.textColor = 'black';
    this.clicked = false;
    this.checkClick = function() {
        if(inputHandlerState.mouseState.x >= this.position.x 
            && inputHandlerState.mouseState.x <= this.position.x + this.width
            && inputHandlerState.mouseState.y >= this.position.y
            && inputHandlerState.mouseState.x >= this.position.y + this.height) 
                {
                    if(inputHandlerState.mouseState.mouseDown) {
                        this.doClick();
                        console.log('inbounds');
                    }
                }
    }
    this.doClick = function(){};
    this.update = function (deltaTime) {
        this.checkClick();
    }
    
    this.draw = function (context) {
        if(this.visible) {
            //draw me
            context.fillStyle = `${this.color}`;
            context.fillRect(this.position.x, this.position.y, this.width, this.height)
            context.fillStyle = this.textColor;
            
            context.fillText(this.text, this.position.x, this.position.y + 25);
        }
    }
}