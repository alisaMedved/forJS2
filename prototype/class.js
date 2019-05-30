'use strict';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }
}

const obj = new Point(10, 20);
obj.move(10, 20)
console.log(obj);

console.log('прототипы');
console.log(Point.prototype);
console.log(Point.prototype.move.prototype);
console.log(Point.constructor.prototype);
console.log(Point.prototype.constructor.prototype);