'use strict';

// Pool

// const pool = item => {
//     pool.items = pool.items || new Array(10).fill(new Array(1000).fill(0));
//
//     if (item) {
//         pool.items.push(item);
//         console.log('Recycle item, count =', pool.items.length);
//         return;
//     }
//     const res = pool.items.pop() || new Array(1000).fill(0);
//
//     console.log('Get from pool, count =', pool.items.length);
//     return res;
// };
//
// // Usage
//
// const a1 = pool();
// const b1 = a1.map((x, i) => i).reduce((x, y) => x + y);
// console.log(b1);
//
// const a2 = pool();
// const b2 = a2.map((x, i) => i).reduce((x, y) => x + y);
// console.log(b2);
//
// pool(a1);
// pool(a2);
//
// const a3 = pool();
// const b3 = a3.map((x, i) => i).reduce((x, y) => x + y);
// console.log(b3);
//
// /*
// Pool - это функция, которую если вызвать без аргументов, то она выдаст один свой элемент.
// А если - с аргументами, то pool добавит их к себе.
//  */

// Более абстрактный пул.
// Pool абстрагированный от отдельного класса и от фабрики
// за счет пулифицирования фабрики

// const poolify = (factory, size) => {           // функция возвращающая пул
//     const items = new Array(size).fill(null).map(() => factory());
//     // элементы пула - массив элементов фабрики
//
//     return item => {   // pool
//         if (item) {
//             items.push(item);
//             console.log('Recycle item, count =', items.length);
//             return;
//     }
//         const res = items.pop() || factory();
//
//         console.log('Get from pool, count =', items.length);
//         return res;
//     };
// };
//
// const buffer = () => new Uint32Array(1024);  // фабрика на основе конструктора
//                                                    // типизированного массива Uint32Array
// const pool = poolify(buffer, 10);   // пул
//
// for (let i = 0; i < 15; i++) {
//     const a = pool();
//     console.log('Buffer size', a.length * 32);
// }
// /*
// Пулифицирование фабрики - фабрика создает элементы пула и возвращаемый им
// результат в случае отсутствия элементов  в пуле.
// Мы повысили абстракцию пула с помощью пулифицирования фабрики.
// Мы абстрагировались от типа элемента пула (от класса - мы можем создавать элементы пула)
// и от фабрики (мы можем создавать элементы пула любой фабрикой)
//  */




