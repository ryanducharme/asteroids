canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed;
let oldTimeStamp = 0;
let fps;
let deltaTime;


// let player = new Sprite(new Position(300, 300))
// let asteroid = new Asteroid(new Position(200, 300));
// asteroid.calcAsteroidPoints(12,10)
let asteroids = [];
// asteroids.push(asteroid);
for(let i = 0; i < 7; i++) {
    // asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500), (Math.random() * 80) + 20));
    asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500), 100));
    asteroids[i].calcAsteroidPoints(12,10)
}
// console.log(asteroids);
window.requestAnimationFrame(gameLoop);

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
    
    asteroids.forEach(asteroid => asteroid.update());
    // console.log(asteroids[0].position);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    fps = Math.round(1 / secondsPassed);

    // Draw number to the screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);
    context.fillText("Delta: " + Math.round(deltaTime), 10, 50);
    

    asteroids.forEach(asteroid => asteroid.draw(context));
    
}

function Asteroid(position, radius) {
    this.renderable = true;
    this.position = position;
    this.verticies = [];
    this.radius = radius;
    
    this.dx = 0.1 / this.radius * 100;
    this.dy = 0.1 / this.radius * 100;
    this.calcAsteroidPoints = function (n, variance) {
        //plot a random point clockwise around a circle n times
        //small 1-10
        //medium 11-20
        //large 21-30

        let realVariance = 0;
        for(let i = 0; i < n; i++) {
            if(Math.random() >= 0.5) {
                realVariance = Math.random() * variance * -1;
            } else {
                realVariance = Math.random() * variance;
            }
            let x = this.position.x + this.radius * Math.cos(2 * Math.PI * i / n) + realVariance;
            let y = this.position.y + this.radius * Math.sin(2 * Math.PI * i / n) + realVariance;
            let newPos = new Position(x, y);
            this.verticies.push(newPos);
        }
    }

    this.update = function () {
        this.checkCollision();
    }

    this.draw = function (context) {
        if (this.renderable) {
            context.beginPath();
    
            let points = this.verticies;
            // console.log(points);
            context.moveTo(this.position.x, this.position.y)
            points.forEach(function(point) {
                context.lineTo(point.x, point.y);
            })
            context.lineTo(points[0].x, points[0].y);
            context.fill()
            context.closePath();
        }
    }
    
    this.checkCollision = function() {
        let self = this;
        // console.log(this);
        //check border collision
        if(this.position.x + this.dx * deltaTime > canvas.width || this.position.x * deltaTime + this.dx < 0) {
            this.dx = -this.dx;
        }
       
        if(this.position.y + this.dy * deltaTime > canvas.height || this.position.y * deltaTime + this.dy < 0) {
            this.dy = -this.dy;
        }

        this.position.x += this.dx * deltaTime;
        this.position.y += this.dy * deltaTime;
        // console.log(deltaTime);
        this.verticies.forEach(function(vert) {
            // console.log(this);
            vert.x += self.dx * deltaTime;
            vert.y += self.dy * deltaTime;
            // console.log(vert.x);
        });
        // console.log(this.position.x);
    }
    
    
}

function Sprite(position) {
    this.renderable = true;
    this.position = position;
    this.verticies = [new Position(200, 200), new Position(300, 300)]
    this.draw = function (context) {
        if (this.renderable) {
            console.log(`time to render using ${context.toString()}`);
            context.beginPath();
            context.moveTo(this.verticies[0].x * Math.random(), this.verticies[0].y);
            context.lineTo(this.verticies[1].x, this.verticies[1].y);
            context.stroke();

        }
    }
}

function Velocity(x, y) {
    this.x = x;
    this.y = y;
}
function Position(x, y) {
    this.x = x;
    this.y = y;
}
function Vector(x, y) {

}

