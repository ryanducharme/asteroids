canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
let secondsPassed;
let oldTimeStamp;
let fps;


// let player = new Sprite(new Position(300, 300))
// let asteroid = new Asteroid(new Position(300, 300));

let asteroids = [];

for(let i = 0; i < 1; i++) {
    // asteroids.push(new Asteroid(new Position(Math.random() * 500, Math.random() * 500)));
    // asteroids[i].calcAsteroidPoints(30,9,10)
    // asteroids[i].dx = 1;
    // asteroids[i].dy = 1;
    let newAst = new Asteroid(new Position(2,2));
    newAst.calcAsteroidPoints(30,9,10);
    asteroids.push(newAst);
}
// console.log(asteroids);
window.requestAnimationFrame(gameLoop);

function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;



    update(secondsPassed);
    draw();

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function update() {
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
    

    asteroids.forEach(asteroid => asteroid.draw(context));
    
}



function Asteroid(position) {
    this.dx = 1;
    this.dy = 1;
    this.renderable = true;
    this.position = position;
    this.verticies = [];
    // this.verticies = calcAsteroidPoints(position, 30, 9, 10);
    this.calcAsteroidPoints = function (radius, n, variance) {
        //plot a random point clockwise around a circle n times
        
        let verts = [];
        let realVariance = 0;
        for(let i = 0; i < n; i++) {
            if(Math.random() >= 0.5) {
                realVariance = Math.random() * variance * -1;
            } else {
                realVariance = Math.random() * variance;
            }
            let x = this.position.x + radius * Math.cos(2 * Math.PI * i / n) + realVariance;
            let y = this.position.y + radius * Math.sin(2 * Math.PI * i / n) + realVariance;
            let newPos = new Position(x, y);
            verts.push(newPos);
            // console.log(verts);
        }
        // console.log(verts);
        verts.map(elem => this.verticies.push(elem));
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
        //check border collision
        if(this.position.x + this.dx > 600 || this.position.x + this.dx < 0) {
            this.dx = -this.dx;
        }
       
        if(this.position.y + this.dy > 600 || this.position.y + this.dy < 0) {
            this.dy = -this.dy;
        }

        this.position.x += this.dx;
        this.position.y += this.dy;
        this.verticies.forEach(function(vert) {
            vert.x += this.dx;
            vert.y += this.dy;
            // console.log(vert.x);
        });
        // console.log(this.position.x);
    }
    
    this.update = function () {
        this.checkCollision();   
        // console.log(this.position);
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

