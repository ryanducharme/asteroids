class MatrixDraw extends GameObject{
    constructor(position) {
        super(position);
        this.utils = new MatrixUtil();
        this.vertsX = [100, 150, 200];
        this.vertsY = [100, 100, 200];
        this.angle = 0.01;
    }

    update(deltaTime) {
        // this.angle += 0.01
        let rot = this.utils.rotate(this.vertsX, this.vertsY, this.angle);
        this.vertsX = rot[0];
        this.vertsY = rot[1];


        // for (let i = 0; i < this.vertsX.length; i++) {
        //     this.vertsX[i] = this.vertsX[i] + this.position.x * deltaTime;
        //     this.vertsY[i] = this.vertsY[i] + this.position.y * deltaTime;
        // }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = `red`;
        // let points = this.verticies;
        console.log(this.position);
        context.moveTo(this.position.x, this.position.y)
        for (let i = 0; i < this.vertsX.length; i++) {
           context.lineTo(this.vertsX[i], this.vertsY[i]);
            
        }
        context.lineTo(this.vertsX[0], this.vertsY[0]);
        context.fill()
        context.closePath();
    }
}