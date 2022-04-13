class GravityParticle extends GameObject{
    constructor(position, velocityVector) {
      super(position);
      this.position.x += this.randomDirection(10);
      
      this.color = {
        red: 255,
        green: 255,
        blue: 255,
        alpha: 0.8
      }
      this.size = Math.random() * 3;
      this.velocity = velocityVector;
      this.life = 1; // seconds
      this.maxLife = this.life;
      this.speed = Math.random() * 0.05;
      this.elapsedTime = 0;
    }
    randomDirection(max) {
        let direction = Math.random() * max;
        if(Math.random() <= 0.5) {
            direction = -direction;
        }
        return direction;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime / 1000;
        this.position.y += this.speed * deltaTime;
        // console.log(elapsedTime);
        if((this.elapsedTime) >= this.maxLife) {
            this.life -= 1;
            // console.log(life);
        }
    }

    draw(context) {
        if(this.visible) {
            context.beginPath();
            context.fillStyle = `rgba(${this.color.red},${this.color.green},${this.color.blue},${this.color.alpha})`;
            context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
    }
   
}