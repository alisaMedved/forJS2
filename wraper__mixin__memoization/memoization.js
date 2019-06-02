'use strict';

// const generateKey = args => args.map(argKey).join('|');  // функции
//                                                     // превращающие аргумент в ключ
// const argKey = x => x.toString() + ":" + typeof x;
//
// const memoize = fn => {
//     const cache = {};          // кеш для хранения результатов функции и аргументов
//     return (...args) => {
//         const key = generateKey(args);
//         const val = cache[key];
//         if (val) return val;
//         const res = fn(...args);
//         cache[key] = res;
//         return res;
//     }
// };
//
// const sumSeq = (a,b) => {
//     console.log('Calculate sum');
//     let r = 0;
//     for (let i = a; i < b; i++) r += i;
//     return r;
// };
//
// const mSumSeq = memoize(sumSeq);
//
// console.log(mSumSeq(2, 5)); // посчитает
// console.log(mSumSeq(2, 5)); // вынет из кеша

// Мемоизация для функции ряда Фибоначи
// Измерение скорости выполнения n вызовов функции

// const generateKey = args => args.map(argKey).join('|');  // функции
// // превращающие аргумент в ключ
// const argKey = x => x.toString() + ":" + typeof x;
//
// const memoize = fn => {   // функция мемоизации
//     const cache = {};          // кеш для хранения результатов функции и аргументов
//     return (...args) => {
//         const key = generateKey(args);
//         const val = cache[key];
//         if (val) return val;
//         const res = fn(...args);
//         cache[key] = res;
//         return res;
//     }
// };
//
// const LOOP_COUNT = 10000;
//
// const speedTest = (name, fn, args, count) => { // Измерение скорости
//                                     // выполнения count вызовов функции fn
//     const tmp = [];  //
//     const start = new Date().getTime();
//     for (let i = 0; i < count; i++) {
//         tmp.push(fn(...args));
//     }
//     const end = new Date().getTime();
//     console.log(end);
//     const time = end - start;
//     console.log(`${name} * ${tmp.length} : ${time}`);
// };
//
// const fib = n => (n <= 2 ? 1: fib(n-1) + fib(n-2));
//
// speedTest('fib(20)', fib, [20], LOOP_COUNT);
//
// const mFib = memoize(fib);
// speedTest('memoized fib(20)', mFib, [20], LOOP_COUNT);

// Хеш-таблица - кеш с предельно допустимым количеством данных
// Мемоизация синхронных функции

// const generateKey = args => args.map(argKey).join('|');  // функции
// // превращающие аргумент в ключ
// const argKey = x => x.toString() + ":" + typeof x;
//
// const memoize = (fn, length) => {
//     const cache = new Map(); // создание хэшмапы
//     return (...args) => {
//         const key = generateKey(args);
//         console.log(`${fn.name}(${key}) call`);
//         if (cache.has(key)) return cache.get(key); // разница?
//         console.log(`max(${key}) calculate`);
//         const res = fn(...args);
//         if (cache.size >= length) {
//             const firstKey = cache.keys().next().value; // разница?
//             console.log('Delete key:', firstKey);
//             cache.delete(firstKey);
//         }
//         cache.set(key, res);
//         return res;
//     };
// };
//
// const max = (a, b) => (a > b ? a: b);
// const mMax = memoize(max, 3);
//
// mMax(10, 8);
// mMax(10, 8);
// mMax(1, 15);
// mMax(12, 3);
// mMax(15, 2);
// mMax(1, 15);
// mMax(10, 8);
// mMax(0, 0);
// mMax(0, 0);

// Асинхронная мемоизация с объектом-кешем
// для функции с колбеками

// const fs  = require('fs');   //подключение библиотеки fs
//
// const memoizeAsync = (lib, fnName) => {
//     const fn = lib[fnName];
//     const cache = {};
//
//     lib[fnName] = (...args) => {
//         const cb = args.pop();   // args[args.length -1] - callback
//         const key = args[0];     // файл
//         const record = cache[key];
//
//         if (record) {
//             console.log('достаем из кеша');
//             return cb(record.err, record.data);
//         }
//
//         fn(...args, (err, data) => {
//             console.log('Считаем и записываем в кеш');
//             cache[key] = {err, data};  // записываем в кеш аргументы error и date
//             return cb(err, data);             // выдаем ре-т через колбек
//         });                        //  по сути мы мутируем функцию
//     };
// };
//
// memoizeAsync(fs, 'readFile');
//
// fs.readFile('new66.js', 'utf8', (err, data) => {
//     console.log('data length:', data.length);
//     fs.readFile('new66.js', 'utf8', (err, data) => {
//         console.log('data length:', data.length);
//     });
// });

// хэширование (создание уникальных и
// равномерно распределенных ключей хэшмапы)
// с помощью метода digest библиотеки crypto

// const crypto = require('crypto');
//
// const argKey = x => x.toString() + ":" + typeof x;
//
// const generateKey = args => {
//     const key = args.map(argKey).join('|');
//     return crypto.createHash('sha256').update(key).digest('hex');
// };
//
// const memoize = fn => {
//     const cache = {};
//     return (...args) => {
//         const key = generateKey(args);
//         const val = cache[key];
//         if (val) return val;
//         const res = fn(...args);
//         cache[key] = res;
//         console.log(cache);
//         return res;
//     };
// };
//
// // Usage
//
// const sumSeq = (a, b) => {
//     console.log('Calculate sum');
//     let r = 0;
//     for (let i = a; i < b; i++) r += i;
//     return r;
// };
//
// const mSumSeq = memoize(sumSeq);
//
// console.log('First call mSumSeq(2, 5)');
// console.log('Value:', mSumSeq(2, 5));
//
// console.log('Second call mSumSeq(2, 5)');
// console.log('From cache:', mSumSeq(2, 5));
//
// console.log('Call mSumSeq(2, 6)');
// console.log('Calculated:', mSumSeq(2, 6));

// Мемоизация (почти) без замыкания
// с помощью примеси через прототипы (присваивание свойств
// (динамических методов))

const fs = require('fs');

function Memoized() {} //создание прототипа

const memoize = fn => {
    const cache = new Map();

    const memoized = function(...args) {
        const callback = args.pop();
        const key = args[0];
        const record = cache.get(key);
        if (record) {
            console.log('Достаем из кеша');
            return callback(record.err, record.data);
        }
        fn(...args, (err, data) => {
            cache.set(key, {err, data});
            console.log('Считаем и сохраняем в кеш');
            console.log(cache);
            return callback(err, data);
        });
    };

    const fields ={
       cache,
       timeout: 0,
       limit: 0,
       size: 0,
       maxSize: 0,
    };

    Object.setPrototypeOf(memoized, Memoized.prototype);
    return Object.assign(memoized, fields); // создание примеси через метод assign
// поля fields копируем в memoized. И в итоге memoized берет кеш не из замыкания а у себя
};

Memoized.prototype.clear = function() {   //создание примеси через прототипы
    this.cache.clear(); // Метод присвоен не в замыкании а напрямую передан от прототипа
                         // динамический метод
};

fs.readFile = memoize(fs.readFile); // эквивалент memoized


fs.readFile('new66.js', 'utf8', (err, data) => {
    console.log('data length:', data.length);
    fs.readFile('new66.js', 'utf8', (err, data) => {
        console.log('data length:', data.length);
        fs.readFile.clear();
        fs.readFile('new66.js', 'utf8', (err, data) => {
            console.log('data length:', data.length);
        });
    });
});


















