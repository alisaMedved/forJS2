'use strict';

function Point(x, y) { // прототип Point
    this.polEx = x;
    this.polEy = y;
};

// Point.from = function() { // статический метод from прототипа Point
//     this.polEx = this.polEx * 3;
//     this.polEy = this.polEy * 3;
// };

Point.prototype.move = function() { // динамический метод from прототипа Point
    this.polEx += this.polEx;
    this.polEy += this.polEy;
};

const potomok = new Point(10, 20);
// console.log(potomok);
console.log('как выводятся прототипы');
console.log('Прототип.prototype' + Point.prototype);
console.log('prototype динамического метода прототипа' +
    Point.prototype.move.prototype );

// const potn = new Point(10, 20);
// Point.from();
// console.log(potn);
//
// const obj = {
//     v: 5,
//     n: 6,
//     move() {
//         return v + n
//     },
// };
// console.log(JSON.stringify(obj));
// console.log(obj);


