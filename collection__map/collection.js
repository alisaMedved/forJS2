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
//
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
