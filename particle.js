class Particle extends GameObject {
    constructor(position) {
        super(position);
        this.color = 'red';
        this.life = Math.floor(Math.random() * 255);
        this.speed = Math.random();
        this.dx = this.randomDirection();
        this.dy = this.randomDirection();
        this.transparency = 1;
        this.visible = true;
    }
    randomDirection() {
        let direction = Math.random();
        if(Math.random() <= 0.5) {
            direction = -direction;
        }
        return direction;
    }
    update(deltaTime, pEmitterPos) {
        if(this.life <= 0) {
            // this.visible = false;
            // this.position.x = super().position.x;
            this.position.x = pEmitterPos.x;
            this.position.y = pEmitterPos.y;
            this.life = 255;
            this.transparency = 1;
        }
        this.life -= 2;
        this.transparency -= 0.01;
        this.position.x += this.speed * this.dx * deltaTime;
        this.position.y += this.speed * this.dy * deltaTime;

        // this.position.x
    }

    draw(context) {
        if(this.visible) {
            context.fillStyle = `rgba(255,0,0,${this.transparency})`;
            // context.fillRect(this.position.x, this.position.y, 5,5);
            // context.strokeStyle = `rgba(255,0,0,${this.transparency})`;
            context.beginPath();
            context.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            context.fill();
            // context.stroke();
            context.closePath();
        }
        
    }
}