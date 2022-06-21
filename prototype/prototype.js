'use strict';

function Point(x, y) { // прототип Point
    this.polEx = x;
    this.polEy = y;
};

Point.from = function() { // статический метод from прототипа Point
    this.polEx = this.polEx * 3;
    this.polEy = this.polEy * 3;
};

Point.prototype.move = function() { // динамический метод move прототипа Point
    this.polEx += this.polEx;
    this.polEy += this.polEy;
};

const instance = new Point(10, 20);
const inheritR = Object.create(Point, {
    polEx: {
        value: 6,
        writable: true,
        enumerable: true,
        configurable: true,
    },
    polEy: {
        value: 6,
        writable: true,
        enumerable: true,
        configurable: true
    },
});
console.log('прототип экземпляра ', Object.getPrototypeOf(instance));
console.log('прототип наследника ', Object.getPrototypeOf(inheritR));
console.log('прототип экземпляра ', instance.__proto__.constructor.name);
console.log('прототип наследника ', inheritR.__proto__.constructor.name);
console.log('Присутствовает ли прототип-родитель Point в цепочке прототипов экземпляра? ', instance instanceof Point);
console.log('Присутствовает ли прототип-родитель Point в цепочке прототипов наследника? ', inheritR instanceof Point);
console.log('instance в начале ', JSON.stringify(instance));
// console.log('как выводятся прототипы');
// console.log('Прототип.prototype' + Point.prototype);
// console.log('prototype динамического метода прототипа' +
//     Point.prototype.move.prototype );
//
// статические методы не передаются экземпляру
// instance.from();
console.log('inheritR в начале ', JSON.stringify(inheritR));
// статические методы передаются наследникам
inheritR.from();
console.log('inheritR после вызова from ', JSON.stringify(inheritR));
// динамические методы передаются экземплярам
instance.move();
console.log('instance после вызова move ', JSON.stringify(instance));
// динамические методы не передаются наследникам
// inheritR.move();
console.log('Parent в начале ', Point);
// статический метод отрабатывает у самого прототипа
Point.from();
console.log('Parent после вызова from ', Point);
// динамический метод не отрабатывает у самого прототипа
// Point.move();

// const obj = {
//     v: 5,
//     n: 6,
//     move() {
//         return v + n
//     },
// };
// console.log(JSON.stringify(obj));
// console.log(obj);

// function Car(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
// }
// var mycar = new Car('Honda', 'Accord', 1998);
// var a = mycar instanceof Car;    // возвращает true
// var b = mycar instanceof Object; // возвращает true
// var c = Car instanceof Function; // возвращает true
// var d = Car instanceof Object; // возвращает true
// let r = 'etryjhhgt';
// r = {};
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// // поставит object - потому что это было последним присвоением
// console.log(typeof r);
// // функция - это объект js со встроенным методом call
// console.log(typeof Car);

