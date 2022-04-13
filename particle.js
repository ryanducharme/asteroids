class Particle extends GameObject{
    constructor(position, velocityVector) {
      super(position);
      // this.position = position;
    //   this.visible = true;
      this.life = 3;
      this.color = {
        red: 255,
        green: 255,
        blue: 255,
        alpha: 0.8
      }
      this.size = 5;
      this.velocity = velocityVector;
    }
    randomDirection() {
        let direction = Math.random();
        if(Math.random() <= 0.5) {
            direction = -direction;
        }
        return direction;
    }

    update(deltaTime) {
        let x = 0;
        let y = 0;
        let variance = 0.4;
        if(Math.random() < 0.5) {
            x = -(Math.random() * variance);
        } else {
            x = (Math.random() * variance);
        }

        if(Math.random() < 0.5) {
            y = -(Math.random() * variance);
        } else {
            y = (Math.random() * variance);
        }
        this.position.x += x * deltaTime;
        this.position.y += y * deltaTime;


        this.color.red -= 1;
        this.color.green -= 1;

        if(self.elapsedTime >= 1) {
            this.life -= 1;
            
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