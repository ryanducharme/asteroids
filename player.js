function Player() {
    this.state = {
        mining: false,
        health: 100,
        shield: 100,
        energy: 100,
        minerStrength: 1
    }
    this.radius = 40;
    this.position = new Vector(300,300);
    this.velocity = undefined;
    this.direction = undefined;
}
Player.prototype.move = function () {
    // this.position.y -= 3;
}
Player.prototype.fire = function () {
    this.ammo -= 1;
    // console.log(`Fire! Ammo:${this.ammo}`);
}
Player.prototype.update = function (deltaTime) {
    // this.position.y -= 3;
    if(inputHandlerState.north) {
        this.position.y -= 0.4 * deltaTime;
    }
    if(inputHandlerState.south) {
        this.position.y += 0.4 * deltaTime;
    }
    if(inputHandlerState.east) {
        this.position.x += 0.4 * deltaTime;
    }
    if(inputHandlerState.west) {
        this.position.x -= 0.4 * deltaTime;
    }
    if(inputHandlerState.fire) {
        this.fire();
    }
    if(inputHandlerState.mouseState.mouseDown && this.state.energy > 0) {
        this.state.mining = true;
        this.mine();
    }
    if(inputHandlerState.mouseState.mouseDown === false) {
        this.state.mining = false;
        
    }

    this.regen();
    console.log(this.state.energy);
}
Player.prototype.draw = function (context) {    
    context.beginPath()
    context.fillStyle = 'lime';

    context.fillRect(this.position.x, this.position.y, 30,30);
    context.closePath()
    // console.log(this.state.mining);
    if(this.state.mining) {
        // console.log('mining');
        context.beginPath();
        context.strokeStyle = 'red'
        context.lineWidth = 3;
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(inputHandlerState.mouseState.x, inputHandlerState.mouseState.y);
        context.stroke();
        context.closePath();
    }
    // console.log('drawing');
    //this.haileegoose(context);
}
Player.prototype.boost = function() {

}
Player.prototype.regen = function() {
    if(this.state.energy <= 100 && this.state.energy > 0)
    this.state.energy += 0.1;
}
Player.prototype.mine = function(){
    // this.state.mining = true;
    if(this.state.energy > 0.5) {
        this.state.energy -= 0.5;
        // console.log(this.state.energy);
    }
}
Player.prototype.haileegoose = function(context){
    context.fillStyle = 'blue';
    context.fillText('HaileeGooseIsTheWinner',this.position.x,this.position.y);
}