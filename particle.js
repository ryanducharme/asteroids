class Particle {
    constructor(position, velocityVector) {
      this.position = position;
      this.visible = true;
      this.life = 4;
      this.color = {
        red: 255,
        green: 255,
        blue: 255,
        alpha: 0.7
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
   
}