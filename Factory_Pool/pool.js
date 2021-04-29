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
// //
// // // Usage
// //
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
//
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

// Более абстрактный пул c минимально и максимально допустимыми количествами элементов.
// Pool абстрагированный от отдельного класса и от фабрики
// за счет пулифицирования фабрики

// const poolify = (factory, min, norm, max) => {
//     const duplicate = n => new Array(n).fill().map(() => factory());       // создает norm эл-тов пула
//     const items = duplicate(norm);                                                // с помощью пулифицированной фабрики
//
//     return item => {                                                             // pool
//         if (item) {
//             if (items.length < max) {                                  // если эл-тов в пуле больше чем max,
//                 items.push(item);
//                 console.log('пополнение пула снаружи');                    // то элемент не добавляется, а просто пропускается
//             } else { console.log('Пропускаем элемент - слишком много элементов в пуле')}
//             console.log('Recycle item, count =', items.length);
//             return;
//         }
//         if (items.length < min) {                                            // если эл-тов в пуле меньше чем min
//             const instances = duplicate(norm - items.length);             // то эл-ты пополняются до norm
//             console.log('автоматическое пополнение пула до нормы с min')
//             items.push(...instances);
//         }
//         const res = items.pop();                                                 // а затем отдается эл-т из автоматически пополненного пула
//         console.log('Get from pool, count =', items.length);
//         return res;
//     }
// };
//
// const buffer = () => new Uint32Array(1024);      // фабрика
//
// const pool = poolify(buffer, 5 ,10 ,13);  // пул
//
// let i = 0;
//
// const next = () => {
//     const item = pool();
//     console.log('Buffer size', item.length * 32, "   i=", i);
//     i++;
//     if (i < 20) {
//         setTimeout(next, i * 10);
//         setTimeout(() => pool(item), i * 100);
//     }
// };
//
// next();

// ассинхронный пул с максимально допустимым
// количеством произведенных им лично элементов max
// и с количеством элементов при котором рекомендуется пополнить пул min.

// const duplicate = (factory, n) => (                        // фабрика заданного количества элементов пула
//     new Array(n).fill().map(() => factory())
// );
//
// const poolify = (factory, min, norm, max) => {     /* min - минимально допупустимое кол-во эл-тов в пуле
//                                                          max - в этот раз это не максимально допустимое
//                                                          кол-во эл-тов в пуле,
//                                                  max - макс-но допустимое кол-во созданных пулом эл-тов,
//                                                             не переданных в пул, а созданных им самим */
//     let allocated = norm;                                //  allocated - кол-во созданных пулом эл-тов
// const items = duplicate(factory, norm);
// const delayed = [];                          // delayed - очередь запросов на выдачу элемента (FIFO),
//
//     return par => {
//
//         if (typeof par !== 'function') {           // если par - это эл-т в пул
//             if (items.length < max) {             // пул не возьмет эл-тов больше чем создал иначе return
//                 const request = delayed.shift();                //
//                 if (request) {                           // есть ли запросы на эл-т? берем самый древний
//                     const c1 = items.length;
//                     console.log(`${c1}->${c1} В пул передали элемент. Выдаем эл-т запросу в очереди`);
//                     request(par);
//                 } else {
//                     const c1 = items.length;
//                     items.push(par);              // нету запросов на эл-т - добавляем в пул
//                     const c2 = items.length;
//                     console.log(`${c1}->${c2} Элемент добавлен в пул`)
//                 }
//             }
//             return;
//         }                                           // если par - это колбек, которому нужно выдать эл-т
//         if (items.length < min && allocated < max) {           // Надо и Можно ли создавать эл-ты?
//             const grow = Math.min(max - allocated, norm - items.length); // Сколько можно создать?
//             allocated += grow;
//             const instances = duplicate(factory, grow);
//             items.push(...instances);
//             console.log('Пул создал элементы и добавил их в себя');
//         }
//         const c1 = items.length;
//         const res = items.pop();
//         const c2 = items.length;
//         if (res) {
//            console.log(`${c1}->${c2} Выдаем элемент колбеку`)
//             par(res);
//         } else {
//             console.log(`${c1}->${c2} Кол-во элементов в пуле = 0, Запрос на выдачу эл-та передан в очередь`);
//            delayed.push(par);
//         }
//     };
// };
//
// const buffer = () => new Uint32Array(1024);  // фабрика элементов пула
//
// const pool = poolify(buffer, 3, 5, 7);
//
// let i = 0;
//
// const next = () => {            // Форма поменялась. раньше здесь была строка const item = pool();
//     pool(item => {
//         i++;
//         if (i < 20) {
//             setTimeout(next, i * 10);   // Запрос эл-та из пула
//             setTimeout(pool, i * 100, item);   // item - аргумент pool. Запись эл-та в пул
//         }
//     });
// };
//
// next();


// заметка про двойной вызов функции

// const func = (a) => {
//     return b => {
//         console.log(b);
//     }
// }
//
// func("meow")("ber");

// /*
// Пул ассинхронный потому что с колбеком par. При return res требуется выдать эл-т немедленно.
// А колбеку можно выдать эл-т попозже.
//  */

// Ассинхронный пул с маркированием своих элементов с помощью Symbol
// он принимает только эл-ты что создал сам
// с максимально и минимально допустимым количеством эл-тов содержащихся в пуле

// const poolified = Symbol('poolified');
//
// const mixFlag = { [poolified]: true};  // примесь, её примешивают к каждому созданному пулом эл-ту
//
// const duplicate = (factory, n) => (        //  фабрика заданного количества элементов пула + примешивает
//     new Array(n).fill().map(() => {
//         const instance = factory();
//         return Object.assign(instance, mixFlag);  // видоизменяет целевой объект instance
//     })
// );
//
// const provide = callback => item => {  // мы выдадим эл-т сразу же как только эл-т попадет в колбек
//     setImmediate(() => {               // отсрачиваем выдачу эл-та до того как появится эл-т для колбека
//         callback(item);
//     });
// };
//
// const poolify = (factory, min, norm, max) => {
//     let allocated = norm;
//     const items = duplicate(factory, norm);
//     const delayed = [];
//     return par => {                                 // если par - это эл-т в пул
//         if (par[poolified]) {                      // Проверка подходит ли нам "класс" эл-та
//             const request = delayed.shift();       // отдаем запросу если он есть
//             if (request) request(par);
//             else items.push(par);
//             return;
//         }
//         const callback = provide(par);              // если par - это колбек, которому нужно выдать эл-т
//         if (items.length < min && allocated < max) {
//             const grow = Math.min(max - allocated, norm - items.length);
//             allocated += grow;
//             const instances = duplicate(factory, grow);
//             items.push(...instances);
//         }
//         const res = items.pop();
//         if (res) callback(res);
//         else delayed.push(callback);
//     };
// };
//
// // Usage
//
// const adder = a => b => adder(a + b);
//
// const pool = poolify(adder, 1, 2, 3);
//
// console.log('request Item1');
// pool(item1 => {
//     console.log('get Item1');
//     console.log('request Item2');
//     pool(item2 => {
//         console.log('get Item2');
//         console.log('request Item3');
//         pool(item3 => {
//             console.log('get Item3');
//             setTimeout(() => {
//                 pool(item3);
//                 console.log('recycle Item3');
//             }, 50);
//         });
//         console.log('request Item4');
//         pool(item4 => {
//             console.log('get Item4');
//             setTimeout(() => {
//                 pool(item4);
//                 console.log('recycle Item4');
//             }, 20);
//         });
//         setTimeout(() => {
//             pool(item1);
//             console.log('recycle Item1');
//             setTimeout(() => {
//                 pool(item2);
//                 console.log('recycle Item2');
//             }, 10);
//         }, 10);
//     });
// });
//
// /*
// Symbol удобен для примеси-маркировки. Вдруг в этом же коде есть другая фабрика
// с точно такой же символьной меткой. Такой же метки не будет - Symbol уникален
//  */

// Неассинхронный пул

// const poolify = (factory, min, norm, max) => {
//     const duplicate = n => new Array(n).fill().map(() => factory());  // на основе фабрики
//                                                             // построили пул
//     const pool = item => {
//         if (item) {
//             if (pool.allocated <= max) {
//                 pool.items.push(item);
//             } else {
//                 pool.allocated--;
//             }
//
//             console.dir({
//                 action: 'Recycle item',
//                 length: pool.items.length,
//                 allocated: pool.allocated
//             });
//             return;
//         }
//         if (pool.items.length < min) {
//             const items = duplicate(norm - pool.items.length);
//             pool.allocated += items.length;
//             pool.items.push(...items);
//         }
//         const res = pool.items.pop();
//
//         console.dir({
//             action: 'Get item',
//             length: pool.items.length,
//             allocated: pool.allocated
//         });
//         return res;
//     };
//
//     const items = duplicate(norm);
//     return Object.assign(pool, { items, allocated: norm });
// };
//
// const factorify = (Category, ...args) => () => new Category(...args);  // Класс превратили в фабрику
//
// // Usage
//
// const factory = factorify(Uint32Array, 1024);
// const pool = poolify(factory, 5, 10, 13);
//
// let i = 0;
//
// const next = () => {
//     const item = pool();
//     //console.log('Buffer size', item.length * 32);
//     i++;
//     if (i < 20) {
//         setTimeout(next, i * 10);
//         setTimeout(() => pool(item), i * 100);
//     }
// };
//
// next();



