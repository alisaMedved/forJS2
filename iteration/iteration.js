'use strict';

// Не забудь ; когда выносишь объявление переменной за цикл
// let i = 0;
// for (; i < 3; i++) {
//     console.log(i);
// }

// Цикл с предусловием
//
// let a = 0;
// while (a < 10) {
//     console.log(a++);
// }
//
// // Цикл с постусловием
//
// let i = 0;
// do {
//     console.log(i++)
// } while (i < 10);
//
// // for in object
//
// const hash = {
//     first: 7,
//     second: 10,
//     third: 1,
//     fourth: 5,
// };
//
// for (const key in hash) {
//     console.log(key + ' : ' + hash[key]);
// }

// for-in-array

// const numbers = [7, 10, 1, 5, 2];
// numbers.field2 = 'Value2';
// numbers[-10] = 'Value3';
// numbers.field1 = 'Value1';
// numbers[5] = 20;
//
// for (const i in numbers) {
//     const value = numbers[i];
//     console.log(i, typeof i, value);
// }

// for-of-array

// const numbers = [7, 10, 1, 5, 2];
// numbers.field2 = 'Value2';
// numbers[-10] = 'Value3';
// numbers.field1 = 'Value1';
// numbers[5] = 20;
//
// for (const value of numbers) {
//     console.log(value, typeof value);
// }

// Switch and break

// const a ='m';
// switch (a) {
//     case 'banan':
//         console.log('banan');
//         break;
//     case 'apple':
//         console.log('apple');
//         break;
//     case 'mango':
//         console.log('mango');
//         break;
//     // default:
//     //     console.log('default');
// }
//
// console.log('meow');

// Оператор break прерывает циклы
//
// let a = 0;
// while (a < 10) {
//     console.log(a++);
//     if (a === 5) break;
// }

// Оператор break прерывает выполнение блока оператора
// и затем сразу переходит на выполнение следующего блока оператора

// label1: {
//     console.log(1);
//     label2: {
//         console.log(2);
//         break label1;    // метки инструкции обязательны! иначе ошибка
//         console.log(3);
//     }
//     console.log(4);
// }
// console.log(5);

// Инструкция continue в цикле while

// // пример 1
//
// let i = 0;
// while (i < 10) {
//     i++;
//     console.log('Hell', i);
//     if (i === 5) continue;
//     console.log('WWW'); // При i === 5 выполнение инструкции прекращается
// }                      // и начинается следующая итерация

// // Пример 2
//
// let i = 0;
// let n = 0;
// while (i < 5) {
//     i++;
//     if (i === 3) {
//         continue;
//     }
//     n += i;          // При i === 3 выполнение инструкции прекращается
//     console.log(n);  // и начинается следующая итерация
// }

// Инструкция Continue с отмеченным циклом

//Пример 1
//
// let i = 0;
// let j = 8;
//
// vnesh: while (i < 4) {
//     console.log('i: ' + i);
//     i += 1;
//
//     vnytri: while (j > 4) {
//         console.log('j: ' + j);
//         j -= 1;
//         if ((j % 2) == 0)
//             continue vnytri;
//         console.log(j + ' является нечётным.');   // при (j % 2) == 0 выполнение инструкции прекращается
//     }                                      //и наступает новая итерация j
//
//     console.log("i = " + i);           // пока цикл j олностью не прогонится через ВСЕ свои итерации
//     console.log("j = " + j);          // эти строчки выполнятся не начнут
// }

//Пример 2

// let i = 0;
// let j = 8;
//
// vnesh: while (i < 4) {
//     console.log('i: ' + i);
//     i += 1;
//
//     vnytri: while (j > 4) {
//         console.log('j: ' + j);
//         j -= 1;
//         if ((j % 2) == 0)
//             continue vnesh;         // continue должен быть внутри приостанавливаемого
//                                     // им отмеченного цикла
//
//         console.log(j + ' является нечётным.');   // при (j % 2) == 0 выполнение инструкции прекращается
//     }                                      //и наступает новая итерация i
//
//     console.log("i = " + i);           // пока цикл j олностью не прогонится через ВСЕ свои итерации
//     console.log("j = " + j);          // эти строчки выполнятся не начнут
// }

// // Инструкция continue в цикле for
//
// cycle1: for (let i=0; i < 5; i++) {
//     console.log('kkkk', i)
//     if (i === 3) {
//         continue cycle1;
//     }
//     console.log('meow');
// }

// метод массива forEach - выполняет указанную функцию один
// раз для каждого элемента в массиве.
// И не создает новый массив в отличие от map!
//
// const numbers = [7, 10, 1, 5, 2];
// numbers.forEach((f, i, arr) => {
//     console.log(arr);
// });

// Метод массива map - создаёт новый массив из результатов вызовов
// колбека для каждого элемента старого массива

// const log = (s, i) => {
//     console.log(i, s);
//     return s;
// };
//
// const f1 = x => x*2;
// const f2 = x => ++x;
//
// const compose = (...funcs) => x => funcs.reduce((v, f) => f(v), x);
//
// /* v - аккумулятор - в первом прогоне v = x
// во втором v = f(x)
// в третьем и последующих v = f(v)
// аккумулятор это тот кто аккумулирует значения возращаемые колбеками */
//
// const f3 = compose(f1, f2);
//
// const res1 = [7, 10, 1, 5, 2]
//     .filter(x => x > 4)
//     .map(f3)
//     .reduce((acc, val) => acc + val);
//
// console.log(res1);
//
// [7, 10, 1, 5, 2]
//     .map(log)     /* не только печатает массив, но и создает новый,
//                     потому что map всегда возвращает новый массив
//                     крайне удобно для отладки чейнинга */
// .map(x => x * 2)
//     .map(log)
//     .map(x => ++x)
//     .map(log);

// // Деструктивное присвоение
// const { max } = Math;
// const res = max(89, 500, 3, 569, 48);
// console.log(res);

// Итерация по матрице

// Итерация по матрице методом map

// const matrix = [
//     [7, 10, 1, 5, 2],
//     [6, -1, 7, 2, 3],
//     [1, 2, 4, -8, 2],
//     [-6, 4, 8, 2, 0],
// ];
//
// const max = (a, b) => (a > b ? a : b);
//
// const res = matrix
// .map(row => row.reduce(max))
// .reduce((acc, rowMax) => acc + rowMax);
//
// console.log(res);

// // Итерация по матрице for-of, for-in
//
// const matrix = [
//     [7, 10, 1, 5, 2],
//     [6, -1, 7, 2, 3],
//     [1, 2, 4, -8, 2],
//     [-6, 4, 8, 2, 0],
// ];
//
// const max = (a, b) => (a > b ? a : b);
//
// let res = 0;
// for (const row of matrix) {
//     const rowMax = row.reduce(max);
//     res += rowMax;
// }
//
// console.log(res);
//
// for (const i in matrix) {
//     const row = matrix[i];
//     for (const j in row) {
//         const col = row[j];
//         console.log(i, j, col);
//     }
// }

// Итерация по матрице forEach
//
// const matrix = [
//     [7, 10, 1, 5, 2],
//     [6, -1, 7, 2, 3],
//     [1, 2, 4, -8, 2],
//     [-6, 4, 8, 2, 0],
// ];
//
// matrix.forEach((row, i) => {
//     row.forEach((col, j) => {
//         console.log(i, j, col);
//     });
// });
//
// const max = (a, b) => (a > b ? a : b);
//
// let res = 0;
//
// matrix.forEach(row => {
//     const rowMax = row.reduce(max);
//     console.log(res += rowMax);
// });

// Итерация по объекту. Протокол итерируемости
//
// const range = {
//     start: 1,
//     end: 10,
//     [Symbol.iterator]() {            // Символьное свойство задающее
//                                        // итератор объекта, используемый по умолчанию
//         let value = this.start;
//         return {                    // Итератор
//             next: () => ({
//                 value,
//                 done: value++ === this.end +1     // Пчм this.end видно ведь это arrow-function
//                 // заложено так глубоко что this.end стало global context
//             })
//         };
//     }
// };
//
// console.log(Object.getOwnPropertyNames(range));   // массив всех строковых ключей
// console.log(Object.getOwnPropertySymbols(range));   // массив всех символьных свойств
//
// for (const number of range) {  // синтаксис вызывающий итератор по умолчанию
//     console.log(number);       // для получения перебираемых значений
// }
//
// const sum = (prev, cur) => prev + cur;
// const sumIterable = (...iterable) => iterable.reduce(sum);
//
// const sumRange = sumIterable(...range);  // spread оператор тоже синтаксис вызывающий итератор
// console.log('sumRange:', sumRange);     // по умолчанию для получения перебираемых значений

// Переопределяем итерацию через классы

// class Range {
//     constructor(start, end) {
//         this.start = start;
//         this.end = end;
//     }
//
//     [Symbol.iterator]() {
//         let value = this.start;
//         return {
//             next: () => ({
//                 value,
//                 done: value++ === this.end + 1
//             })
//         };
//     }
// }
//
// class RevRange extends Range {
//     constructor(start, end) {
//       super(start, end)
// }
//     [Symbol.iterator]() {
//         let value = this.start;
//         return {
//             next: () => ({
//                 value,
//                 done: value-- === this.end - 1
//             })
//         };
//     }
// }
//
// const rang = new Range(1, 10);
// const revrang = new RevRange(10, 1);
//
// for (const el of rang) {
//     console.log('rang ' + el);
// }
//
// for (const eli of revrang) {
//     console.log('rev ' + eli);
// }

// Переопределяем протокол итерирования у массива
// непосредственно через объект JS. Реверсивное итерирование

// const arr = [2, 5, -1, 7, 0];
//
// arr[Symbol.iterator] = function() {   // Пчм function dec-n? Чтобы было видно this.length
//     let index = this.length;
//     return {                  // Итератор
//         next: () => ({
//             done: index -- === 0,
//             value: this[index],        // элемент массива ведь this = arr
//         })
//     };
// };
//
// for (const num of arr) {
//     console.log(num);
// }

// // Асинхронный итератор
//
// const range = {
//     start: 1,
//     end: 10,
//     [Symbol.asyncIterator]() {            // Символьное свойство задающее
//                              // асинхронный итератор объекта, используемый по умолчанию
//         let value = this.start;
//         return {                    // асинхронный Итератор
//             next: () => Promise.resolve({  // метод next возвращает не объект,
//                 value,                           // а обещание объекта - Promise
//                 done: value++ === this.end +1     // вообще сейчас наш асинхронный итератор ведет себя
//                                                 // как синхронный, ему не хватает setTimeout() и т.п.
//             })
//         };
//     }
// };
//
// console.log(Object.getOwnPropertyNames(range));   // массив всех строковых ключей
// console.log(Object.getOwnPropertySymbols(range));   // массив всех символьных свойств
//
// (async () => {
//     for await (const number of range) {  // конструкция для асинхронного итератора
//         console.log(number)
//     }
// })();












