class ParticleEmitter extends GameObject {
    constructor(position) {
        super(position);
        this.maxParticles = 100;
        this.particles = [];
        this.done = false;
        this.spawnRate = 100; //spawn rate in milliseconds
        this.startTime = performance.now();
        this.newTime = 0;
        this.elapsedTime = 0;
    }

    init() {
        //preload particle buffer
    }

    randomVector(variance) {
        let x = 0;
        let y = 0;
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
        return new Vector(x, y);
    }

    emit() {
        //spawnRate in seconds
        //emit one particle per second
        this.newTime = performance.now();
        if(this.newTime - this.startTime >= this.spawnRate) {
            if(this.particles.length < this.maxParticles) {
                let newParticle = new Particle(new Vector(this.position.x, this.position.y), this.randomVector(2.4));
                
                    //make it yellow
                    let colorTemp = Math.random() * 255;
                    // newParticle.color.red = colorTemp;
                    newParticle.color.green = colorTemp;
                
                this.particles.push(newParticle);
                // console.log(this.particles.length);
            } else {
                // console.log('done loading particles');
            }
            this.startTime = this.newTime;
        }
    }

    update(deltaTime) {
        // console.log(this.position);
        let self = this;
        this.elapsedTime += deltaTime / 1000;
        this.emit();
        for(let i = 0; i > this.particles.length; i++) {
            
        }
        if(this.particles.length > 0) {
            this.particles.forEach(function(particle, i) {
                // particle.life -= 1;
                //simulate each particle here
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
                particle.position.x += x * deltaTime;
                particle.position.y += y * deltaTime;


                particle.color.red -= 1;
                particle.color.green -= 1;

                if(self.elapsedTime >= 1) {
                    particle.life -= 1;
                    
                }
               
               if(particle.life <= 0) {
                //    particle.visible = false;
                    // particleEmitter.particles.splice(i);
                    particleEmitter.particles.shift();
               }

            });
            if(self.elapsedTime >= 1) {
                self.elapsedTime = 0;
            }
        }
        
    }

    draw(context) {
        console.log(this.particles);
        this.particles.forEach(function(particle) {
            
            if(particle.life > 0) {
                context.beginPath();
                context.fillStyle = `rgba(${particle.color.red},${particle.color.green},${particle.color.blue},${particle.color.alpha})`;
                context.arc(particle.position.x, particle.position.y, 5, 0, 2 * Math.PI);
                context.fill();
                context.closePath();
            }
            
        });
    }
}