class ParticleEmitter extends GameObject {
    constructor(position) {
        super(position);
        this.maxParticles = 1000;
        this.particles = [];
        this.avgUpdateTime = [];
        this.done = false;
        // this.position = position;
        this.spawnRate = 10; //spawn rate in milliseconds
        this.startTime = performance.now();
        this.newTime = 0;
        this.elapsedTime = 0;
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
                this.particles.push(new Particle(new Vector(this.position.x, this.position.y), this.randomVector(2.4)));
            } else {
                console.log('done loading particles');
            }
            this.startTime = this.newTime;
        }
    }

    update(deltaTime) {
        // console.log(this.position);
        let self = this;
        this.elapsedTime += deltaTime / 1000;
        this.emit();
        if(this.particles.length > 0) {
            this.particles.forEach(function(particle, i) {
                // particle.life -= 1;
                //simulate each particle here
                let x = 0;
                let y = 0;
                let variance = 0.2;
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

                if(self.elapsedTime >= 1) {
                    particle.life -= 1;

                    self.elapsedTime = 0;
                    console.log('down');
                }
               
               if(particle.life <= 0) {
                   particle.visible = false;
                    // particleEmitter.particles.splice(i);
               }

            });
            
        }
        
    }

    draw(context) {
        this.particles.forEach(function(particle) {
            if(particle.visible) {
                context.beginPath();
                context.fillStyle = `rgba(${particle.color.red},${particle.color.green},${particle.color.blue},${particle.color.alpha})`;
                context.arc(particle.position.x, particle.position.y, 4, 0, 2 * Math.PI);
                context.fill();
                context.closePath();
            }
            
        });
    }







    // fillParticleArray() {
    //     for (let index = 0; index < this.particleCount; index++) {
    //         this.particles.push(new Particle(new Vector(this.position.x,this.position.y), index));
    //     }
    // }

    // emit(deltaTime) {
    //     let self = this;
        
        
    //     if(this.particles.length == 1) {
    //         self.done = true;
    //     } else {
    //         // console.log('emitting');
    //         console.log(this.particles.length);
    //         this.particles.forEach(function(particle) {
                
    //             particle.update(deltaTime, self.position);
    //             if(particle.life <= 0) {
    //                 self.particles.splice(particle.id);
    //             }
                
    //         })
    //     }
    // }

    // update(deltaTime) {
    //     // this.position.x
    //     if(!this.done) {
    //         this.emit(deltaTime);
    //     }
    // }

    // draw(context) {
    //     this.particles.forEach(function(particle) {
    //         particle.draw(context);
    //     }) 
    // }
}