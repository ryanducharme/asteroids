class ParticleEmitter extends GameObject {
    constructor(position) {
        super(position);
        this.maxParticles = 1000;
        // this.particles = this.init();
        this.particles = [];
        this.initializedParticles = this.init();
        
        this.spawnRate = 1; //spawn rate in seconds
        this.startTime = performance.now();
        this.newTime = 0;
        this.elapsedTime = 0;
        this.currentIndex = 0;
        this.state = {
            firing: false,
            done: false
        }
    }

    init(particleType) {
        //preload particle buffer
        let particleBuffer = [];
        for (let i = 0; i < this.maxParticles; i++) {
            let newParticle = new GravityParticle(new Vector(this.position.x, this.position.y), this.randomVector(0.1));
            newParticle.maxLife = (Math.random() * 2);
            particleBuffer.push(newParticle);
        }
        return particleBuffer;
    }

    randomVector(variance) {
        let x = 0;
        let y = 0;
        if (Math.random() < 0.5) {
            x = -(Math.random() * variance);
        } else {
            x = (Math.random() * variance);
        }

        if (Math.random() < 0.5) {
            y = -(Math.random() * variance);
        } else {
            y = (Math.random() * variance);
        }
        return new Vector(x, y);
    }

    update(deltaTime) {
        let self = this;

        if(this.state.firing) {
            this.elapsedTime += deltaTime / 1000; // divide by 1000 to get milliseconds
        
            //emit over time
            if(this.spawnRate > 0) {
                //filter out dead particles
                let filtered = this.particles.filter(function (particle) {
                    return particle.life > 0
                });
                this.particles = filtered; 
                if(this.particles.length === 0 && this.state.done == false) {
                    this.particles.push(new GravityParticle(new Vector(this.position.x, this.position.y), this.randomVector(0.01)));
                }
                if(this.elapsedTime >= this.spawnRate && this.state.done == false) {
                    this.particles.push(new GravityParticle(new Vector(this.position.x, this.position.y), this.randomVector(0.01)));
                
                }
            
                this.particles.forEach(function (particle, i) {
                    particle.update(deltaTime, self.elapsedTime);
                });
            }
            
            
    
    
            //burst
            if(this.spawnRate === -1) {
                
                if (this.initializedParticles.length > 0) {
                    this.initializedParticles.forEach(function (particle, i) {
                        particle.update(deltaTime, self.elapsedTime);
                    });
                    let filtered = this.initializedParticles.filter(function (particle) {
                        return particle.life >= 0
                    });
                    this.initializedParticles = filtered;            
                }
            }
            
            //reset spawn timer
            if (this.elapsedTime >= this.spawnRate) {
                this.elapsedTime = 0;
            }
            // console.log(this.particles.length);
            if(this.particles.length <= 0 && this.state.firing == true) {
                this.state.firing = false;
                // console.log('when in');
            }
        }
        
    }

    draw(context) {
        if(this.spawnRate === -1) {
            this.initializedParticles.forEach(function (particle) {
                particle.draw(context);
            });
        } else {
            this.particles.forEach(function (particle) {
                particle.draw(context);
            });
        }
        
        
    }
}