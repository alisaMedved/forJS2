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

const generateKey = args => args.map(argKey).join('|');  // функции
// превращающие аргумент в ключ
const argKey = x => x.toString() + ":" + typeof x;

const memoize = (fn, length) => {
    const cache = new Map(); // создание хэшмапы
    return (...args) => {
        const key = generateKey(args);
        console.log(`${fn.name}(${key}) call`);
        if (cache.has(key)) return cache.get(key); // разница?
        console.log(`max(${key}) calculate`);
        const res = fn(...args);
        if (cache.size >= length) {
            const firstKey = cache.keys().next().value; // разница?
            console.log('Delete key:', firstKey);
            cache.delete(firstKey);
        }
        cache.set(key, res);
        return res;
    };
};

const max = (a, b) => (a > b ? a: b);
const mMax = memoize(max, 3);

mMax(10, 8);
mMax(10, 8);
mMax(1, 15);
mMax(12, 3);
mMax(15, 2);
mMax(1, 15);
mMax(10, 8);
mMax(0, 0);
mMax(0, 0);

//

