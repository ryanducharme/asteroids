canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed;
let oldTimeStamp = 0;
let fps;
let deltaTime;


let asteroids = [];
let collissionManager = new CollisionManager();
for(let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid(new Position(Math.random() * canvas.width, Math.random() * canvas.height), (Math.random() * 80) + 20));
    // asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500), 100));
    asteroids[i].calcAsteroidPoints(12,10)
    collissionManager.collideableObjects.push(asteroids[i]);
}

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

    asteroids.forEach(asteroid => asteroid.draw(context));

    // Draw number to the screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);
    context.fillText("Delta: " + Math.round(deltaTime), 10, 50);    
}

function Asteroid(position, radius) {
    this.renderable = true;
    this.position = position;
    this.verticies = [];
    this.radius = radius;
    this.color = {
        r: 0,
        g: 0,
        b: 0
    }
    // this.mass = this.radius * 100;
    this.dx = 0.05 / this.radius * 100;
    this.dy = 0.05 / this.radius * 100;
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

            
            this.color.r = this.radius / 2;
            this.color.g = this.radius / 2;
            this.color.b = this.radius / 2;
            // this.color.g *= this.mass;
            // this.color.b *= this.mass * 10000;

        
            context.beginPath();
            context.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
            let points = this.verticies;
            // console.log(points);
            context.moveTo(this.position.x, this.position.y)
            points.forEach(function(point) {
                context.lineTo(point.x, point.y);
            })
            context.lineTo(points[0].x, points[0].y);
            context.fill()
            context.closePath();

            context.beginPath();
            context.strokeStyle = 'red';
            context.arc(this.position.x, this.position.y, radius, 0 , Math.PI * 2);
            context.stroke();
            context.closePath();
           
            context.font = '20px Arial';
            context.fillStyle = 'green';
            context.fillText(`${Math.round(this.dx * 100) / 100}`,this.position.x, this.position.y);
            
        }
    }
    
    
}

Asteroid.prototype.checkCollision = function() {
    let self = this;
    let randomVariance = 0;
    let randomVarianceMax = 0;
    // console.log(this);
    //check border collision
    if(this.position.x + this.dx * deltaTime > canvas.width || this.position.x * deltaTime + this.dx < 0) {
        this.dx = -this.dx;
        randomVariance = Math.random() * randomVarianceMax;
        // console.log(randomVariance);
    }
   
    if(this.position.y + this.dy * deltaTime > canvas.height || this.position.y * deltaTime + this.dy < 0) {
        this.dy = -this.dy;
        randomVariance = Math.random() * randomVarianceMax;
        // console.log(randomVariance);
    }

    this.position.x += this.dx * deltaTime + randomVariance;
    this.position.y += this.dy * deltaTime + randomVariance;
    // console.log(deltaTime);
    this.verticies.forEach(function(vert) {
        // console.log(this);
        vert.x += self.dx * deltaTime + randomVariance;
        vert.y += self.dy * deltaTime + randomVariance;
        // console.log(vert.x);
    });
    // console.log(this.position.x);
}

function Position(x, y) {
    this.x = x;
    this.y = y;
}




function CollisionManager() {
    this.collideableObjects = [];
}

CollisionManager.prototype.update = function(deltaTime) {
    this.checkCollision();
}

CollisionManager.prototype.checkCollision = function() {

}
