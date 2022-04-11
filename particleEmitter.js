class ParticleEmitter extends GameObject {
    constructor(position) {
        super(position);
        this.particleCount = 1000;
        this.particles = [];
        this.fillParticleArray();
        this.avgUpdateTime = [];
    }

    fillParticleArray() {
        for (let index = 0; index < this.particleCount; index++) {
            this.particles.push(new Particle(new Vector(this.position.x,this.position.y)));
        }
    }

    update(deltaTime) {
        let self = this;
        let begin = performance.now();
        this.particles.forEach(function(particle) {
            particle.update(deltaTime, self.position);
        })
        // for(let i = 0; i < this.particles.length; i++) {
        //     this.particles[i].update(deltaTime, self.position);
        // }
        let end = performance.now();
        if(this.avgUpdateTime < 50){
            this.avgUpdateTime.push(end - begin);
        } else {
            let sum = this.avgUpdateTime.reduce((partialSum, a) => partialSum + a, 0);
            console.log(sum / 50);
        }
        
        // console.log(end - begin);
    }

    draw(context) {
        this.particles.forEach(function(particle) {
            particle.draw(context);
        })
    }
}