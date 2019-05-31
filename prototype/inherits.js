'use strict';

// 1) Cоздаем консруктор прототипа на базе другого конструктора прототипа

const util = require('util');

function Rect(x, y, width, height) { //конструктор прототипа Rect
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype.toString = function() { //динамический метод прототипа Rect
    return `[${this.x}, ${this.y}, ${this.width}, ${this.height},]`;
};

function Square(x, y, side) { // создаем прототип Square мутируя прототип Rect
                            /* по сути Square является наследником Rect,
                            но это наследование следует указать явно
                            чтобы экземпляры Square имели метод toString
                            также как экземпляры Rect */
 Rect.call(this, x, y, side, side); // аргументы объекта Square
                                    // пропускают через функцию Rect
                                    // и т. о. создается объект
};

// Способы явного указания наследования Rect - родитель,
// Square - потомок

util.inherits(Square, Rect); //работает только в Node.js

Square.prototype = Object.create(Rect.prototype); /* поле prototype у Square
это пустой объект. Мы присваиваем этому пустому объекту экземпляр
Rect.prototype. Теперь поле prototype у Square является объектом
с динамическими методами конструктора Rect */
Square.prototype.constructor = Square; /* Раньше поле prototype у экземпляров
Square указывало на родителя - на конструктор Square, а теперь на объект
с динамическими методами Rect. Поэтоиу вручную указываем что конструктор не Rect
а Square */

Square.prototype = new Rect(); // динамические методы содержит экземпляр Rect
Square.prototype.constructor = Square; // ссылка на конструктор

Object.setPrototypeOf(Square.prototype, Rect.prototype);
/* метод объекта setPrototypeOf связывает два прототипа */
/* Согласно Тимуру именно этот способ надо использовать в Node.js */

const p1 = new Square(10, 20, 50);
console.log(p1.toString());
console.log(p1);

// // Создаем класс на базе другого класса
//
// class Rect {
//     constructor(x, y, width, height) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//     }
//
//     toString() {
//         return `[${this.x}, ${this.y}, ${this.width}, ${this.height},]`;
//     }
// }
//
// class Square extends Rect {
//     constructor(x, y, side) {
//         super(x, y, side, side);
//     }
// }
//
// const p1 = new Square(10, 20, 50);
// console.log(p1.toString());
// console.log(p1);












