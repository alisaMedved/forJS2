"use strict";

// const func = (par) => {
//     return par+4;
// };
//
// const obj = {
//     [func(45)]: false,
//     [Symbol('')]
// };

// console.log(obj);

// const mas = [[6, 58], 5, 4, 8, 9, 36];
// const obj = {
//     mir: [6, 48],
// };
// const m = obj.mir;
// const set1 = new WeakSet([obj.mir, {noi: true}, mas[0]]);
//
// delete obj.mir;
// console.log(set1);
// console.log(set1.has([6, 48]));
//
// const set2 = new Set([set1]);
// console.log(set2);

// let foo = 5;

// Примитивные типы данных

// Пример 1
// let foo = 5;
// function addTwo_v2(foo) {
//     foo += 2;
// }
// addTwo_v2(foo);
// console.log(foo); /* по сути мы вызвали функцию addTwo_v2(5) просто хитрым способом
// т.к. консоль автоматом не дает вызвать addTwo_v2(5). 5 относится
// к примитивному типу данных number и она неизменяема. */

// Пример 2

// let str = 'baz';
// console.log(str.toUpperCase());
// console.log('baz'.toUpperCase());
// console.log(baz.toUpperCase());
//
// let bar = "baz";
// console.log(bar);               // baz
// bar.toUpperCase();
// console.log(bar);

/* valueOf преобразует объект JS в примитвное значение.
Если у объекта JS нет примитивного значения, то valueOf
возвращает сам объект, который отображается как:
[object Object]
 */

var o = new Object();
const myVar = o.valueOf();
console.log(myVar);
