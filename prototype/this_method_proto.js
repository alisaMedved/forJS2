'use strict';

function Rect(y, x, width, height) {
    this.y = y;
    this.x = x;
    this.width = width;
    this.height = height;
    this.toString = function() {
        return `[${this.x}, ${this.y}, ${this.width}, ${this.height},]`;
    };
} //можно методы и внутри прототипа присваивать.
// Это например статический метод



const obj = new Rect(10, 20, 70, 88);
console.log(obj);
console.log(Rect.prototype);
