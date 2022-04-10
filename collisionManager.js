
function CollisionManager() {
    this.collideableObjects = [];
}

CollisionManager.prototype.update = function (deltaTime) {
    this.checkCollision(deltaTime);
}
CollisionManager.prototype.isPointInCircle = function (x1, y1, r1, px, py) {
    if (((x1 - px) * (x1 - px) + (y1 - py) * (y1 - py)) < (r1 * r1)) {
        return true;
    } else {
        return false;
    }
}
CollisionManager.prototype.checkCollision = function (deltaTime) {
    let self = this;
    // let sqRtCount = 0;
    collidableObjs = this.collideableObjects;

    function doObjsOverlap(obj1, obj2) {
        let x1 = obj1.position.x;
        let x2 = obj2.position.x;

        let y1 = obj1.position.y;
        let y2 = obj2.position.y;

        let r1 = obj1.radius;
        let r2 = obj2.radius;

        if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= (r1 + r2) * (r1 + r2)) {
            return true;

        } else {
            return false;
        }
    }
    function resolve(obj1, obj2) {

        if (doObjsOverlap(obj1, obj2)) {

            let distance = Math.sqrt((obj1.position.x - obj2.position.x) * (obj1.position.x - obj2.position.x) + (obj1.position.y - obj2.position.y) * (obj1.position.y - obj2.position.y));
            let overlap = (0.5 * (distance - obj1.radius - obj2.radius));

            obj1.position.x -= overlap * (obj1.position.x - obj2.position.x) / distance;
            obj1.position.y -= overlap * (obj1.position.y - obj2.position.y) / distance;

            obj2.position.x += overlap * (obj1.position.x - obj2.position.x) / distance;
            obj2.position.y += overlap * (obj1.position.y - obj2.position.y) / distance;

            // obj1.radius *= 1.0004;
            // obj2.radius /= 1.0004;
        }
    }
    function checkInBounds() {
        collidableObjs.forEach(function (obj) {
            // console.log('checking' + obj);
            if (obj.position.x - obj.radius * 1.1 > canvas.width) {
                obj.position.x = 0;
            }
            else if (obj.position.x + obj.radius * 1.1 < 0) {
                obj.position.x = canvas.width;
            } else if (obj.position.y - obj.radius * 1.1 > canvas.height) {
                obj.position.y = 0;
            } else if (obj.position.y + obj.radius * 1.1 < 0) {
                obj.position.y = canvas.height;
            }
        });

    }

    checkInBounds();
    for (let currentObj = 0; currentObj < this.collideableObjects.length; currentObj++) {
        for (let target = currentObj + 1; target < this.collideableObjects.length; target++)
        // for (let target = 0; target < this.collideableObjects.length; target++)
        {
            if (this.collideableObjects[currentObj].id != this.collideableObjects[target].id) {
                resolve(this.collideableObjects[currentObj], this.collideableObjects[target]);
                // sqRtCount++;
            }
        }
    }
    // console.log(sqRtCount);
}