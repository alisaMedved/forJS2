'use strict';

//Prototype или Прототип - это специальный объект на который ссылаются его экземпляры и наследники.


// 1) Cоздаем консруктор прототипа на базе другого конструктора прототипа

// function Rect(x, y, width, height) { //конструктор прототипа Rect
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }
//
// Rect.prototype.toString = function() { //динамический метод прототипа Rect
//     return `[${this.x}, ${this.y}, ${this.width}, ${this.height},]`;
// };
//
// function Square(x, y, side) { // создаем прототип Square мутируя прототип Rect
//                             /* по сути Square является наследником Rect,
//                             но это наследование следует указать явно
//                             чтобы экземпляры Square имели метод toString
//                             также как экземпляры Rect */
//  Rect.call(this, x, y, side, side); // аргументы объекта Square
//                                     // пропускают через функцию Rect
//                                     // и т. о. создается объект
// };

// Отлично - теперь экземпляр Square правильно создается с нужными полями-значениями, но есть проблема: нету динамического метода toString -
// ниже 4 способа как этот метод таки привязать к экземплярам Square.
// Способы явного указания наследования Rect - родитель,
// Square - потомок
// 1.1) метод inherits из встроенной библиотеки util - работает только в Node.js
// const util = require('util');
// util.inherits(Square, Rect);

// 1.2) через поле prototype и constructor, в прототип засунуть прототип желаемого родителя, чтобы досталисьь динамические методы
// Square.prototype = Object.create(Rect.prototype); /* поле prototype у Square
// это пустой объект. Мы присваиваем этому пустому объекту экземпляр
// Rect.prototype. Теперь поле prototype у Square является объектом
// с динамическими методами конструктора Rect */
// Square.prototype.constructor = Square; /* Раньше поле prototype у экземпляров
// Square указывало на родителя - на конструктор Square, а теперь на объект
// с динамическими методами Rect. Поэтоиу вручную указываем что конструктор не Rect
// а Square */
//
// const p1 = new Square(10, 20, 50);
// console.log(p1.toString());
// console.log(p1);

// 1.3)  через поле prototype и constructor, в прототип засунуть экземпляр желаемого родителя, чтобы досталисьь динамические методы

// Square.prototype = new Rect(); // динамические методы содержит экземпляр Rect
// Square.prototype.constructor = Square; // ссылка на конструктор
//
// const p1 = new Square(10, 20, 50);
// console.log(p1.toString());
// console.log(p1);

// 1.4) setPrototypeOf - в прототип засунуть прототип желаемого родителя, чтобы досталисьь динамические методы
// Object.setPrototypeOf(Square.prototype, Rect.prototype);
/* метод объекта setPrototypeOf связывает два прототипа */
/* Согласно Тимуру именно этот способ надо использовать в Node.js */

// const p1 = new Square(10, 20, 50);
// console.log(p1.toString());
// console.log(p1);

// 2) Создаем класс на базе другого класса с помощью extends и super
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

// Класс / Class - программная абстракция, объединяющая состояние и поведение (свойства и методы) своих экземпляров (инстансов).
// Статические и динамические методы классов и их наследование
// class Proto {
//     move() {
//         console.log("динамический метод")
//     }
//     static more() {
//         console.log("статический метод")
//     }
// }
//
// Proto.prototype.love = function() {
//     console.log("динамический метод 2")
// }
//
// Proto.lore = function() {
//     console.log("статический метод 2")
// }
//
// const instance = new Proto();
//
// instance.love()
// instance.move()
//
// // вызовет ошибку ведь статические методы не вызываются у экземпляров
// // instance.lore()
// // instance.more()
//
//
// Proto.lore()
// Proto.more()
// Proto.prototype.love()
// Proto.prototype.move()

// Использование ключевого свойства super в классах и объектах
// 1) переопределение свойств родителя
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
// class Squere extends Rect {
//     constructor(x, y, side) {
//         // никаких полей this.field перед super! иначе будет ошибка ReferenceError
//         super(x, y, side, side)
//     }
// }

// const instanceOfSquere = new Squere(0, 0, 5);
// console.log(instanceOfSquere.toString());

// 2) Вызов методов класса-родителя через super

// class Rectangle {
//     static logNbSides() {
//         return 'У меня 4 стороны';
//     }
//     meow() {
//         return 'meow meow';
//     }
// }
//
// class Square extends Rectangle {
//     static logDescription() {
//         return super.logNbSides() + ', равные между собой';
//         // return this.logNbSides() + ', равные между собой';
//         // return super.prototype.meow() + ', равные между собой';
//         // return this.prototype.meow() + ', равные между собой';
//     }
//     purr() {
//         // return super.meow() + ' purr';
//         // return this.meow() + ' purr';
//     }
//
// }
// console.log(Square.logDescription());
// const instanceOfSquare = new Square();
// console.log(instanceOfSquare.purr());

// 3) вызов методов прототипа в объекте

// const obj1 = {
//     method1() {
//         console.log('method 1');
//     }
// }
//
// const obj2 = {
//     method2() {
//         super.method1();
//         // this.method1();
//     }
// }
//
// Object.setPrototypeOf(obj2, obj1);
// obj2.method2(); // выведет "method 1"



