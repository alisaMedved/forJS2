'use strict';

// const mas1 = [1, 2, 8];
// let arr = new Array(58);
// const nov = [...mas1, ...mas2];
// console.log(nov + '  ' + typeof nov);
// console.log(arr.length);

// Склеивание объектов - одинаковые ключи теряются
// const obj1 = {
//     'Marcus Aurelius': '121-04-26',
//     'Commodus Antoninus': '161-08-31',
//     'Victor Glushkov': '1923-08-24',
// };
//
// const obj2 = {
//     'Victor Glushkov': '24',
//     'Ibn Arabi': '1165-11-16',
//     'Mao Zedong': '1893-12-26',
//     'Rene Descartes': '1596-03-31',
// };
//
// const objConcat1 = Object.assign({}, obj1, obj2);
// const objConcat2 = { ...obj1, ...obj2 };
//
// console.dir({ objConcat1, objConcat2 });

// неперичеслчемые свойства (enumerable: false) и наследуемые не копируются

// const obj = Object.create({ foo: 1 }, { // foo является унаследованным свойством.
//     bar: {
//         value: 2  // bar является неперечисляемым свойством.
//     },
//     baz: {
//         value: 3,
//         enumerable: true  // baz является собственным перечисляемым свойством.
//     }
// });
//
// const copy = Object.assign({}, obj);
// console.log(copy); // { baz: 3 }
//
// console.log({v: 8, ...obj});

// Склеивание массивов - одинаковые элементы не теряются

// const mas1 = [12, 58, 69];
// const mas2 =[69, 200];
// const nov1 = mas1.concat(mas2);
// const nov2 = [...mas1, ...mas2];
// console.dir( {nov1, nov2});

//Символьный тип данных как ключи объекта

// const SYM = Symbol('filename'); /* Функция Symbol создает экземпляры
//  типа символ.
//  экземпляры функции Symbol уникальны и неизменяемы. */
//
// const hash1 = {
//     key: 'value',
//     [SYM]: '458',
//     [SYM]: 'hhh', /* этот ключ затрется так как они оба ссылки и ссылаются на один и
//     тот же объект */
//
//     [Symbol('filename')]: 8999,
//     [Symbol('filename')]: 'GGGG', /* т.к. экземпляры функции Symbol
//      уникальны и неизменяемы, поля не затираются из-за "одинаковости"
//     (ведь экземпляры функции Symbol не могут быть одинаковы) */
// };
//
// console.dir({hash1});

// Итерация for-in-object и с помощью Object.keys(объект)

// const sim = Symbol('nord');
//
// const obj = {
//     key1: 'lll',
//     key2: 'kkkk',
//     [Symbol('nord')]: 'nord1', // по ключам символьного
//     [Symbol('nord')]: 'nord2',  // типа данных нельзя итерироваться
// };
// Object.defineProperty(obj, 'rttyy', {value: 90, enumerable: true, configurable: true, writable: true });
// // по ключам символьного типа данных нельзя итерироваться даже если поставлен дескриптор enumerable в true
// Object.defineProperty(obj, Symbol('rttyyertr'), {value: 90, configurable: true, writable: true, enumerable: true });
// for (const key in obj) {
//     let value = obj[key];
//     console.log(key + ':' + value);
// }
//
// const mas = Object.keys(obj);
// for (const key of mas) {
//     let value = obj[key];
//     console.log(key + ':' + value);
// }

// Запись объекта в файл

// const fs = require('fs');
// const v8 = require('v8');
//
// const SYM = Symbol('note');
//
// const hash1 = {
//     key: 'value',
//     key2: 'value2',
//     ['key' + 3]: 'value3',
//     [SYM]: 'note.js',          // тимур записывал в расширение .v8
//     [Symbol('note2')]: 'note2.js',
// };
//
// const save = collection => fs.writeFile(
//     collection[SYM], v8.serialize(collection), () => {}
// ); // функция записи объекта collection в файл  collection[SYM] с сериализацией
// // движка v8
//
// /* До ключей символьного типа данных можно достучатся,
// но нельзя записать в файл */
//
// save(hash1);
// console.log(hash1);

// 1) Заморозка объекта
// const obj = {
//     field1: 'otre',
//     field2: 789,
//     field455: {
//         a: 7890,
//         b: 7878990,
//     }
// }
// Object.freeze(obj);
// console.log(JSON.stringify(obj));
//
// // При заморозке нельзя добавлять новые свойства, удалять свойства, изменять уже  имеющиеся свойства
// // obj.a = 67;
// // obj.field1 = 'rtghjk';
// // delete(obj.field1);
//
// // Заморозка неглубокая и потому во вложенных объектах можно удалять, изменять и добавлять свойства
//
// obj.field455.a = 67;
// obj.field455.c = 'rtghjk';
// delete(obj.field455.b);
// console.log(JSON.stringify(obj));
// console.log(Object.isFrozen(obj.field455));

// 2) Метод freeze возвращает замороженный объект.
// Оба объекта эквивалентны, а также возвращаемый объект будет заморожен.
// Необязательно сохранять возвращаемый объект при заморозке оригинала.
// const obj = {
//     field1: 'otre',
//     field2: 789,
//     field455: {
//         a: 7890,
//         b: 7878990,
//     }
// }
// const o = Object.freeze(obj);
// //
// console.log(o === obj); // true
// console.log(o.field455.a === obj.field455.a); // true
// console.log(Object.isFrozen(obj));
// console.log(Object.isFrozen(o));

// 3) метод freeze не замораживает эмуляцию геттеров и сетеров
// let bValue = 45;
// const obj = {
//     field1: 'otre',
//     field2: 789,
//     field455: {
//         a: 7890,
//         b: 7878990,
//     },
//     get x() {
//         return bValue;
//     },
//     set x(newValue) {
//         bValue = newValue;
//     }
// }
// // Object.defineProperty(obj, 'x',
// //         {
// //             get: function() {return bValue;},
// //             set: function(newValue) {bValue = newValue},
// //             enumerable: true,
// //             configurable: true,
// //     });
//
// console.log(obj.x);
// obj.x = 789;
// console.log(obj.x);
//
// Object.freeze(obj);
//
// console.log(obj.x);
// obj.x = 900;
// console.log(obj.x);
// console.log(JSON.stringify(obj));



