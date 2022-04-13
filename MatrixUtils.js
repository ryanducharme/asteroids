class MatrixUtil {
    translate() {

    }

    scale() {

    }

    rotate(vertx, verty, rotAng) {
        let newMatrix = [];
        
        let x2 = [];
        let y2 = [];
        for(let i = 0; i < 3; i++) {
            x2.push(vertx[i] * Math.cos(rotAng) - verty[i] * Math.sin(rotAng));
            y2.push(vertx[i] * Math.sin(rotAng) + verty[i] * Math.cos(rotAng));
        }
        newMatrix.push(x2, y2);
        // console.log(newMatrix);
        return newMatrix;
    }


    // [
    //     [1, 10]
    //     [10, 10]
    //     [10, 10]
    // ]

    draw() {

    }
}