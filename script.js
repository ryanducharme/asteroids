canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed;
let oldTimeStamp = 0;
let fps;
let deltaTime;
let player = new Player();
let mouseState = {
    mouseX: 0,
    mouseY: 0
}
let asteroids = [];
let collissionManager = new CollisionManager();
for (let i = 0; i < 20; i++) {
    asteroids.push(new Asteroid(i, new Vector(Math.random() * canvas.width, Math.random() * canvas.height), (Math.random() * 80) + 20));
    // asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500), 100));
    asteroids[i].calcAsteroidPoints(12, 10);
    // asteroids[i].direction = new Vector(randomSign(1), randomSign(1));
    collissionManager.collideableObjects.push(asteroids[i]);
}

window.addEventListener('mousemove', function (e) {
    mouseState.mouseX = e.x;
    mouseState.mouseY = e.y;
})

window.addEventListener('mousedown', function (e) {
    asteroids.forEach(function (aster) {
        if (collissionManager.isPointInCircle(e.x, e.y, aster.radius, aster.position.x, aster.position.y)) {
            if (aster.selected) {
                aster.selected = false;
            } else {
                aster.selected = true;
            }

        } else {
            aster.selected = false;
        }
        console.log(aster.selected);
    });
});


function Player() {
    this.radius = 10;
    this.position = undefined;
    this.velocity = undefined;
    this.direction = undefined;
    this.health = 100;
    this.ammo = 100;
    this.shield = 100;
}

Player.prototype.move = function () {
    console.log('moving');
}
Player.prototype.fire = function () {
    this.ammo -= 1;
    console.log(`Fire! Ammo:${this.ammo}`);
}
Player.prototype.update = function (deltaTime) {

}
Player.prototype.draw = function (context) {
    context.beginPath()
    context.fillStyle = 'lime';
    // context.fillRect(0, 0, 200, 100);

    context.fillRect(200, 200, 200, 200);
    context.closePath()
    // console.log('drawing');
}


function randomSign(num) {
    if (Math.random() >= 0.5) {
        return -num;
    } else {
        return num;
    }
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
    // console.log(mouseState);
    player.update(deltaTime);
    asteroids.forEach(asteroid => asteroid.update(deltaTime));
    collissionManager.update(deltaTime);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    fps = Math.round(1 / secondsPassed);

    player.draw(context);
    asteroids.forEach(asteroid => asteroid.draw(context));

    // Draw number to the screen
    context.fillStyle = 'black';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'white';
    context.fillText("FPS: " + fps, 10, 30);
    context.fillText("Delta: " + Math.round(deltaTime), 10, 50);
}

function Asteroid(id, position, radius) {
    this.renderable = true;
    this.position = position;
    this.verticies = [];
    this.radius = radius;
    this.color = {

        r: -this.radius + 120,
        g: -this.radius + 120,
        b: -this.radius + 120
    }
    this.id = id;
    this.selected = false;
    this.velocity = new Vector(0.02, 0.02);
    // this.direction = new Vector(1, -1);
    this.direction = new Vector(randomSign(1), randomSign(1));
    this.mass = this.radius * 10;
    // this.collisionRadius = this.radius * 4;
    this.pointVariance = [];

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
            this.pointVariance.push(realVariance);
            this.verticies.push(newPos);
        }
    }

    this.update = function (deltaTime) {
        if (this.selected) {
            this.position.x = mouseState.mouseX;
            this.position.y = mouseState.mouseY;
        } else {
            this.position.x += this.direction.x * this.velocity.x * deltaTime;
            this.position.y += this.direction.y * this.velocity.y * deltaTime;
        }
        // this.verticies = this.calcAsteroidPoints(12,10)
        this.adjustVerticies(deltaTime);
    }
    this.adjustVerticies = function (deltaTime) {
        let self = this;
        let newPoints = [...this.verticies];
        this.verticies = [];
        newPoints.forEach(function (vert, i) {
            // console.log(self.position.x + self.velocity.x * self.direction.x);
            let x = self.position.x + (self.radius) * Math.cos(2 * Math.PI * i / 12) + self.pointVariance[i];
            let y = self.position.y + (self.radius) * Math.sin(2 * Math.PI * i / 12) + self.pointVariance[i];
            let newPos = new Vector(x, y);
            self.verticies.push(newPos);

        });
        //this.verticies = newPoints;
    }
    this.draw = function (context) {
        if (this.renderable) {


            // this.color.r = this.radius;
            // this.color.g = this.radius;
            // this.color.b = this.radius;
            // // this.color.g *= this.mass;
            // this.color.b *= this.mass * 10000;


            context.beginPath();
            context.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
            let points = this.verticies;

            context.moveTo(this.position.x, this.position.y)
            points.forEach(function (point) {
                context.lineTo(point.x, point.y);
            })
            context.lineTo(points[0].x, points[0].y);
            context.fill()
            context.closePath();

            context.beginPath();
            context.strokeStyle = 'red';
            context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            context.stroke();
            context.closePath();


            context.font = '20px Arial';
            context.fillStyle = 'green';
            context.fillText(`${Math.round(this.color.r)}`, this.position.x - 8, this.position.y + 5);

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
CollisionManager.prototype.isPointInCircle = function (x1, y1, r1, px, py) {
    if (((x1 - px) * (x1 - px) + (y1 - py) * (y1 - py)) < (r1 * r1)) {
        return true;
    } else {
        return false;
    }
}
CollisionManager.prototype.checkCollision = function (deltaTime) {
    let self = this;
    // let sqRtCount = 0;
    collidableObjs = this.collideableObjects;

    function doObjsOverlap(obj1, obj2) {
        let x1 = obj1.position.x;
        let x2 = obj2.position.x;

        let y1 = obj1.position.y;
        let y2 = obj2.position.y;

        let r1 = obj1.radius;
        let r2 = obj2.radius;

        if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= (r1 + r2) * (r1 + r2)) {
            return true;

        } else {
            return false;
        }
    }
    function resolve(obj1, obj2) {

        if (doObjsOverlap(obj1, obj2)) {

            let distance = Math.sqrt((obj1.position.x - obj2.position.x) * (obj1.position.x - obj2.position.x) + (obj1.position.y - obj2.position.y) * (obj1.position.y - obj2.position.y));
            let overlap = (0.5 * (distance - obj1.radius - obj2.radius));

            obj1.position.x -= overlap * (obj1.position.x - obj2.position.x) / distance;
            obj1.position.y -= overlap * (obj1.position.y - obj2.position.y) / distance;

            obj2.position.x += overlap * (obj1.position.x - obj2.position.x) / distance;
            obj2.position.y += overlap * (obj1.position.y - obj2.position.y) / distance;

            // obj1.radius *= 1.0004;
            // obj2.radius /= 1.0004;
        }
    }
    function checkInBounds() {
        collidableObjs.forEach(function (obj) {
            // console.log('checking' + obj);
            if (obj.position.x - obj.radius * 1.1 > canvas.width) {
                obj.position.x = 0;
            }
            else if (obj.position.x + obj.radius * 1.1 < 0) {
                obj.position.x = canvas.width;
            } else if (obj.position.y - obj.radius * 1.1 > canvas.height) {
                obj.position.y = 0;
            } else if (obj.position.y + obj.radius * 1.1 < 0) {
                obj.position.y = canvas.height;
            }
        });

    }

    checkInBounds();
    for (let currentObj = 0; currentObj < this.collideableObjects.length; currentObj++) {
        for (let target = currentObj + 1; target < this.collideableObjects.length; target++)
        // for (let target = 0; target < this.collideableObjects.length; target++)
        {
            if (this.collideableObjects[currentObj].id != this.collideableObjects[target].id) {
                resolve(this.collideableObjects[currentObj], this.collideableObjects[target]);
                // sqRtCount++;
            }
        }
    }
    // console.log(sqRtCount);
}
