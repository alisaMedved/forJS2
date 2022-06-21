'use strict';

// примесь (примешиваем свойства (поля объекту)) декоратор

// const g1 = {};
// const g2 = {};
// const g3 = { area: 300 };
//
// g2.area = 200;
//
// const mixinCalculateCost = obj => { //примесь
//     obj.area = obj.area || 0;
//     obj.calculateCost = function(price) {
//         return this.area * price;
//     };
// };
//
// [g1, g2, g3].forEach(mixinCalculateCost); // примешиваем свойства
//                                 // с помощи примеси
//
// console.log(g1, g2, g3);
//
// console.log(g1.calculateCost(5));
// console.log(g2.calculateCost(5));
// console.log(g3.calculateCost(5));

// const t1 = setTimeout(() => {
//     console.log('Hello from timer');
// }, 1000);

// mixinCalculateCost(t1);
//
// console.log(t1);
//
// t1.area = 10;
// console.log(t1.calculateCost(100)); // сработает все.
//     //ведь в js все являются объектами

// console.log(Object.keys(g1)); // массив ключей объекта g1

// Примесь присваиванием через функцию-аналог assign
// (примешиваем свойства (методы объекту))

// way 1 полуфункциональный - полуимперативный

// const extend = (obj, mixin) => { // mixin - оригинал, obj - оригинал
//     Object.keys(mixin).forEach(key => obj[key] = mixin[key]);
//     return obj;
// };

// way 2 чисто императивный

// const extend = (obj, mixin) => {
//     for (let key in mixin) {
//         if (mixin.hasOwnProperty(key)) { //true - только на собственные свойства объекта,
//                                         // а не на свойства унаследованнные от предка
//             obj[key] = mixin[key];
//
//         }
//     }
//     return obj;
// }
//
// const obj1 = {
//     name: 'Marcus Aurelius',
//     city: 'Rome',
//     born: '121-04-26',
// };
//
// const mix1 = {         //объект с методами
//     toString() {
//         return `${this.name} was born in ${this.city} in ${this.born}`;
//     },
//     age() {
//         const year = new Date().getFullYear();
//         const born = new Date(this.born).getFullYear();
//         return year-born;
//     }
// };
//
// extend(obj1, mix1);
// console.log(obj1);
// console.log(obj1.toString());
// console.log(`His age is ${obj1.age()} as of today`);

// примесь присвоением через метод объекта assign
// (примешиваем свойства (методы объекту))

// const obj1 = {
//     name: 'Marcus Aurelius',
//     city: 'Rome',
//     born: '121-04-26',
// };
//
// const mix1 = {         //объект с методами
//     toString() {
//         return `${this.name} was born in ${this.city} in ${this.born}`;
//     },
//     age() {
//         const year = new Date().getFullYear();
//         const born = new Date(this.born).getFullYear();
//         return year-born;
//     }
// };
//
// const mix2 = {
//     toString() {
//         return `${this.name} - ${this.city} - ${this.born}`;
//     }
// };
//
// const res = Object.assign(obj1, mix1, mix2);
// console.log(obj1);
// console.log(res.toString());
// console.log(`His age is ${obj1.age()} as of today`);

// Примесь-обертка, оборачивающая метод объекта и мутирующая этот метод
// (примешиваем поведение (мутируем методы объекта))

// const scalable = image => {
//     image.scale = () => console.log('Imaged scaled');
// };
//
// const lazy = image => { // примесь-обертка
//     const scale = image.scale;
//     image.scale = () => setImmediate(() => scale());
// };
//
// const image = {};
//
// console.log('Mixin scalable() adds method: scale');
// scalable(image);
// console.log('Before scale');
// image.scale();
// console.log('After scale\n');
//
// console.log('Mixin lazy() adds lazy behavior');
// lazy(image);
// console.log('Before scale');
// image.scale();
// console.log('After scale');

// Примесь для классов присвоением через лямбду-функцию
// (примешиваем свойства (поля и методы классу))

// const Rect = class {
//     constructor(x, y, width, height) {
//         this.x =x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//     }
//     toString() {
//         return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
//     }
// };
//
// const equilaterial = Category => class extends Category {
//     constructor(x, y, side) {
//         super(x, y, side, side);
//     }
// };
//
// const Square = equilaterial(Rect);
// const p1 = new Square(10, 20, 50);
// console.log(p1.toString());







