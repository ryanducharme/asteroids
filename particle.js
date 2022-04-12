class Particle extends GameObject{
    constructor(position, velocityVector) {
      super(position);
      // this.position = position;
      this.visible = true;
      this.life = 3;
      this.color = {
        red: 255,
        green: 255,
        blue: 0,
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

    update() {

    }

    draw() {

    }
   
}