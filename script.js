canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed;
let oldTimeStamp = 0;
let fps;
let deltaTime;
let player = new Player();
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
let collissionManager = new CollisionManager();
collissionManager.collideableObjects.push(player);
for (let i = 0; i < 20; i++) {
    asteroids.push(new Asteroid(i, new Vector(Math.random() * canvas.width, Math.random() * canvas.height), (Math.random() * 80) + 20));
    // asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500), 100));
    asteroids[i].calcAsteroidPoints(12, 10);
    // asteroids[i].direction = new Vector(randomSign(1), randomSign(1));
    collissionManager.collideableObjects.push(asteroids[i]);
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
window.addEventListener('keydown', function(e) {
    // console.log(e);
    if(e.key == 'w') {
        inputHandlerState.north = true;
    }
    if(e.key == 'a') {
        inputHandlerState.west = true;
    }
    if(e.key == 's') {
        inputHandlerState.south = true;
    }
    if(e.key == 'd') {
        inputHandlerState.east = true;
    }
    // if(!e.repeat && e.key == ' ') {
    //     inputHandlerState.fire = true;
    // }
    if(e.key == ' ') {
        inputHandlerState.boost = true;
    }

});
window.addEventListener('keyup', function(e) {

    if(e.key == 'w') {
        inputHandlerState.north = false;
    }
    if(e.key == 'a') {
        inputHandlerState.west = false;
    }
    if(e.key == 's') {
        inputHandlerState.south = false;
    }
    if(e.key == 'd') {
        inputHandlerState.east = false;
    }
    // if(e.key == ' ') {
    //     inputHandlerState.fire = false;
    // }
})
window.requestAnimationFrame(gameLoop);

function GameObject() {
}
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

    update(deltaTime);
    draw();

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}
function update(deltaTime) {
    // console.log(mouseState);
    player.update(deltaTime);
    asteroids.forEach(asteroid => asteroid.update(deltaTime));
    collissionManager.update(deltaTime);
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'white'

    fps = Math.round(1 / secondsPassed);

    player.draw(context);
    asteroids.forEach(asteroid => asteroid.draw(context));

    // Draw number to the screen
    context.fillStyle = 'green';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);
    context.fillText("Delta: " + Math.round(deltaTime), 10, 50);
}

function GameManager() {
    this.state = {
        running: false,
        mainMenu: false,
        gamePlay: false
    }

    // this.inputManager
}