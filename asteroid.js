
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
            this.position.x = inputHandlerState.mouseState.x;
            this.position.y = inputHandlerState.mouseState.y;
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

            // context.beginPath();
            // context.strokeStyle = 'red';
            // context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            // context.stroke();
            // context.closePath();


            context.font = '20px Arial';
            context.fillStyle = 'green';
            context.fillText(`${Math.round(this.color.r)}`, this.position.x - 8, this.position.y + 5);

        }
    }
}