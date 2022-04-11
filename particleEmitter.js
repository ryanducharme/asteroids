class ParticleEmitter extends GameObject {
    constructor(position) {
        super(position);
        this.particleCount = 1000;
        this.particles = [];
        this.fillParticleArray();
    }

    fillParticleArray() {
        for (let index = 0; index < this.particleCount; index++) {
            this.particles.push(new Particle(new Vector(this.position.x,this.position.y)));
        }
    }

    update(deltaTime) {
        let self = this;
        this.particles.forEach(function(particle) {
            particle.update(deltaTime, self.position);
        })
    }

    draw(context) {
        this.particles.forEach(function(particle) {
            particle.draw(context);
        })
    }
}