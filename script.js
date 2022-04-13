canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;
let deltaTime;
let player = new Player();
let gTime = new Time();
// let particle = new Particle(new Vector(100,100), 'red');

let particleEmitter = new ParticleEmitter(new Vector(0,0), secondsPassed);


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
        mouseUp: true,
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
})
window.addEventListener('mousedown', function (e) {
    inputHandlerState.mouseState.mouseDown = true;
    inputHandlerState.mouseState.mouseUp = false;
});
window.addEventListener('mouseup', function (e) {
    inputHandlerState.mouseState.mouseDown = false;
    inputHandlerState.mouseState.mouseUp = true;
});
window.addEventListener('keydown', function (e) {
    // console.log(e.key);
    if (e.key == 'w') {
        inputHandlerState.north = true;
        // particleEmitter.initializedParticles = particleEmitter.init();
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
    draw(context);
    window.requestAnimationFrame(gameLoop);
}
function update(deltaTime) {
    if (!gameState.pause) {
        player.update(deltaTime);
        asteroids.forEach(asteroid => asteroid.update(deltaTime));
        collissionManager.update(deltaTime);
    }
    if(inputHandlerState.mouseState.mouseDown) {
        
    }

    particleEmitter.update(deltaTime, secondsPassed);
}
function draw(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    asteroids.forEach(asteroid => asteroid.draw(context));
    player.draw(context);
    if(inputHandlerState.mouseState.mouseDown) {
     
    }

    particleEmitter.draw(context);
    
    
    context.beginPath();
    context.font = '30px calibri';
    context.fillStyle = 'white'
    context.fillText(`FPS: ${Math.floor(fps)}`, 10, 30);
    context.closePath();
}