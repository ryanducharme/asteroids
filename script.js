canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed;
let oldTimeStamp = 0;
let fps;
let deltaTime;


let asteroids = [];
let collissionManager = new CollisionManager();
for (let i = 0; i < 2; i++) {
    asteroids.push(new Asteroid(i, new Vector(Math.random() * canvas.width, Math.random() * canvas.height), (Math.random() * 80) + 20));
    // asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500), 100));
    asteroids[i].calcAsteroidPoints(12, 10);
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
    asteroids.forEach(asteroid => asteroid.update(deltaTime));
    collissionManager.update(deltaTime);
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

function Asteroid(id, position, radius) {
    this.renderable = true;
    this.position = position;
    this.verticies = [];
    this.radius = radius;
    this.color = {
        r: 0,
        g: 0,
        b: 0
    }
    this.id = id;
    this.velocity = new Vector(0.1, 0.1);
    this.direction = new Vector(-1,1);
    this.mass = this.radius * 100;
    // this.collisionRadius = this.radius * 4;
    this.calcAsteroidPoints = function (n, variance) {
        //plot a random point clockwise around a circle n times
        //small 1-10
        //medium 11-20
        //large 21-30

        let realVariance = 0;
        for (let i = 0; i < n; i++) {
            if (Math.random() >= 0.5) {
                realVariance = Math.random() * variance * -1;
            } else {
                realVariance = Math.random() * variance;
            }
            let x = this.position.x + this.radius * Math.cos(2 * Math.PI * i / n) + realVariance;
            let y = this.position.y + this.radius * Math.sin(2 * Math.PI * i / n) + realVariance;
            let newPos = new Vector(x, y);
            this.verticies.push(newPos);
        }
    }
    
    this.update = function (deltaTime) {
        
        this.position.x += this.direction.x * this.velocity.x * deltaTime;
        this.position.y += this.direction.y * this.velocity.y * deltaTime;
        this.adjustVerticies(deltaTime);
    }
    this.adjustVerticies = function(deltaTime) {
        let self = this;
        this.verticies.forEach(function (vert) {
            // console.log(this);
            vert.x += self.direction.x * self.velocity.x * deltaTime;
            vert.y += self.direction.y * self.velocity.y * deltaTime;
            // console.log(vert.x);
        });
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
            points.forEach(function (point) {
                context.lineTo(point.x, point.y);
            })
            context.lineTo(points[0].x, points[0].y);
            context.fill()
            context.closePath();

            context.beginPath();
            context.strokeStyle = 'red';
            context.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2);
            context.stroke();
            context.closePath();



            context.beginPath();
            context.strokeStyle = 'red';
            context.arc(this.position.x, this.position.y, this.collisionRadius, 0, Math.PI * 2);
            context.stroke();
            context.closePath();


            context.font = '20px Arial';
            context.fillStyle = 'green';
            context.fillText(`${Math.round(this.position.x)}`, this.position.x, this.position.y);

        }
    }
}

function Vector(x, y) {
    this.x = x;
    this.y = y;
}




function CollisionManager() {
    this.collideableObjects = [];
}

CollisionManager.prototype.update = function (deltaTime) {
    this.checkCollision(deltaTime);
}

CollisionManager.prototype.checkCollision = function (deltaTime) {
    let self = this;

    collidableObjs = this.collideableObjects;
    let testObj = this.collideableObjects[0];
    let testObj2 = this.collideableObjects[1];

    function doObjsOverlap(obj1, obj2) {
        let x1 = obj1.position.x;
        let x2 = obj2.position.x;

        let y1 = obj1.position.y;
        let y2 = obj2.position.y;

        let r1 = obj1.radius;
        let r2 = obj2.radius;

        if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= (r1 + r2) * (r1 + r2)) {
            console.log('overlap');
            return true;
            
        } else {
            return false;
        }
    }

   
    function resolve(obj1, obj2) {
        if(doObjsOverlap(obj1, obj2)) {
            // console.log('time to resolve!');
            let distance = Math.sqrt((obj1.position.x - obj2.position.x) * (obj1.position.x - obj2.position.x) + (obj1.position.y - obj2.position.y) * (obj1.position.y - obj2.position.y));
            let overlap = (0.5 *(distance - obj1.radius - obj2.radius));

            obj1.position.x -= overlap * (obj1.position.x - obj2.position.x) / distance;
            obj1.position.y -= overlap * (obj1.position.y - obj2.position.y) / distance;

            obj2.position.x += overlap * (obj1.position.x - obj2.position.x) / distance;
            obj2.position.y += overlap * (obj1.position.y - obj2.position.y) / distance;

        //    obj1.adjustVerticies(deltaTime);

        }
    }

    function checkInBounds() {
        collidableObjs.forEach(function(obj) {
            // console.log('checking' + obj);
            if (obj.position.x + obj.direction.x * deltaTime > canvas.width || obj.position.x + obj.direction.x * deltaTime < 0) {
                obj.direction.x = -obj.direction.x;
            } else if (obj.position.y + obj.direction.y * deltaTime > canvas.height || obj.position.y + obj.direction.y * deltaTime < 0) {
                obj.direction.y = -obj.direction.y;
            }
        });
        
    }
    
    checkInBounds();
    resolve(testObj, testObj2);
}
