'use strict';

// Сериализация Comma-Separated Values

// const arr = [
//     [ 7, 10, 12,  5],
//     [ 3,  1,  2,  3],
//     [10,  9, 11, 77],
//     [ 5, 18,  6, 26]
// ];
//
// const s = arr.join('\n');
// console.log(s);

//JSON

// const obj1 = {
//     field: 'Value',
//     subObject: {
//         arr: [7, 10, 2, 5],
//         fn: x => x / 2,
//     },
//     k: undefined,   // undefined JSON пропускает
// };

// const mas = [15, undefined, 899, 'kkk'];
// const obj = {
//     kl: undefined,
//     lom: 35,
//     kol: null,
// };
//
// const exs = '{"lom":35,"kol":"undefined"}';
// console.log(JSON.parse(exs));
//
// const mass = JSON.stringify(mas);
// const objs = JSON.stringify(obj);
// const masnov = JSON.parse(mass);
// const objnov = JSON.parse(objs);
//
// console.log(mass);
// console.log(masnov);
// console.log(objs);
// console.log(objnov);

// const s = JSON.stringify(obj1);
// console.log(s);
// const obj2 = JSON.parse(s);
// console.log(obj2);

// пишем ручками простой сериализатор

// const serialize = obj => {
//     const type = typeof obj;
//     if (obj === null) return 'null';
//     else if (type === 'string') return `'${obj}'`;
//     else if (type === 'number') return obj.toString();
//     else if (type === 'boolean') return obj.toString();
//     else if (type !== 'object') return obj.toString();
//     else if (Array.isArray(obj)) {
//         return `[${obj}]`;
//     } else {
//         let s = '{';
//         for (const key in obj) {
//             const value = obj[key];
//             if (s.length > 1) s += ',';
//             s += key + ':' + serialize(value);
//         }
//         return s + '}';
//     }
// };
//
// const obj1 = {
//     field: 'Value',
//     subObject: {
//         arr: [7, 10, 2, 5],
//         fn: x => x / 2
//     }
// };
//
// console.log(serialize(obj1));

// пишем ручками расширяемый сериализатор (в него еще другие типы данных легко можно поместить)

// const serializers = {
//     string: s => `${s}`,
//     number: n => n.toString(),
//     boolean: b => b.toString(),
//     function: f => f.toString(),
//     object: o => {
//         if (Array.isArray(o))  return `[${o}]`;
//         if (o === null) return 'null';
//         let s = '{';
//         for (const key in o) {
//             const value = o[key];
//             if (s.length > 1) s += ',';
//             s += key + ':' + serialize(value);
//         }
//         const symbols = Object.getOwnPropertySymbols(o);  // массив символьных ключей
//         for (const symbol of symbols) {
//             // console.log(symbol.toString());
//             const value = o[symbol];
//             if (s.length > 1) s += ',';
//             s += symbol.toString() + ':' + serialize(value);
//         }
//         return s + '}';
//     },
// };
//
// const serialize = obj => {
//     const type = typeof obj;
//     const serializer = serializers[type];
//     return serializer(obj);
// };
//
// const obj1 = {
//     field: 'Value',
//     subObject: {
//         arr: [7, 10, 2, 5],
//         fn: x => x / 2
//     },
//     [Symbol('name')]: 'Mark'
// };
//
// console.log(serialize(obj1));
//
// /*
// Функция вызывает себя через другую функцию - непрямая или косвенная рекурсия
//  */

