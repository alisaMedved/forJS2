// // import * as async from "async";
//
// // контракт колбеков -  колбек последним передается, а ошибка - первой
// // callback => callback(data)
// // (...args, callback) => callback(error, data);
//
// // решаение ох это горе - либо bind, либо делать раздельные именнованные функции и вызывать в друг друге
// // (но тогда нет единого места управления вызовавми)
//
//
// // еще одно решение позволяющее писать асинхронщину это
// // async.js
//
// // async.series(
// //     [...arrayFuncs,(data, cb) => cb(err, result)],
// //     (err, result) => {}
// // );
//
// // но тут два прикольных момента
// // 1) можно первым агументом класть объект функции, н как известно
// // иттерируются поля объекта в порядке добавления и потому надежнее
// // если ратуете за строгую последовательность выполнения функции через массив
//
// // 2) (err, result) => {} - второй агрумент необязательный
// // это функция в которую будет передан конечный результат.
//
// //3) если передаешь массив фе=ункций - то result это массив
// // если передаешь объект фе=ункций - то result это объект
//
// // async.parallel() для осуществеления любых операций, которые должны выполняться параллельно
//
//
// // но вот если идет смесь последовательных и параллельных вызовов то async.js не спасает
//
// // можно ассинхронность делать через Events
// // выглядит страшно- читается плохо, но работает
//
//
// //I suppose that starting from version 0.11 you can run var Emitter = require('events');,
// // but in 0.10.x you are stuck with require('events').EventEmitter.
//
// // вот так можно делать последовательные вызовы асинхронных функций
// const eventEmitter = require('events');
// // const ee = new events.EventEmitter();
// const ee = new eventEmitter();
// const f1 = (par) => {
//     console.log(par);
//     ee.emit('step2')
// };
// const f2 = (par) => {
//     console.log(par);
//     ee.emit('step3')
// };
// const f3 = (par) => {
//     console.log(par);
//     ee.emit('done')
// };
// ee.on('step1', f1.bind(null));
// ee.on('step2', f2.bind(null, 'par2'));
// ee.on('step3', f3.bind(null, 'par3'));
// ee.on('done', () => console.log('done'));
// ee.emit('step1', 'par1');
//
// // а если нам нужно делать три последовательные функции и плюс три ругие последоватеьные функции,
// // и обе грпуппы выполняются параллельно - то для второй группы создаем еще один eventEmitter
//
//
// // ассинхронность на промисах
//
// // если нужно последовательное выполнение то тогда юзаем чейнинг then
// // правда где надо лучше дополнительно поставить catch
//
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => console.log("fooP1"), 5000);
// });
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => console.log("fooP2"), 10);
// });
// const p3 = new Promise((resolve, reject) => {
//     setTimeout(() => console.log("fooP3"), 10);
// });
//
// // да да Promise.all не ждет выполнения p1 чтобы приступить к выполнению p2
// // это эдакое параллельное выполнение
// Promise.all([p1, p2, p3]).then(() => {
//     console.log("values");
// });
//
// // но лучше делать allSettled - в этом методе пофикшено что обваливается
// // если хоть один из помисов массиве rejected
// Promise.allSettled([p1, p2, p3]).then(() => {
//     console.log("values");
// });

//Выведет:
// [3, 1337, "foo"]

// async.js --> callbacks
// async await --> promise --> callback
// async generators
// event --> observable ---> callback

// разницы нет между await и просто без

// async function f() {
//     return await new Promise((resolve, reject) => {
//         setTimeout(() => console.log("fooP3"), 4000);
//     });
// }

// async function f() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => console.log("fooP3"), 4000);
//     });
// }
//
// f().then(console.log("А вот и я!"))
// // так можно мешать синтаксисы промисов и async await
//
// // можно и на голом async await делать - ниже пример последовательного выполнения
//
// // Emulate Asynchronous calls
//
// const pause = () => new Promise((resolve) =>
//     setTimeout(resolve, 4000)
// );
//
// // Asynchronous functions
//
// const readConfig = async (name) => {
//     await pause();
//     console.log('(1) config loaded');
//     return { name };
// };
//
// const doQuery = async (statement) => {
//     await pause();
//     console.log('(2) SQL query executed: ' + statement);
//     return [{ name: 'Kiev' }, { name: 'Roma' }];
// };
//
// const httpGet = async (url) => {
//     await pause();
//     console.log('(3) Page retrieved: ' + url);
//     return '<html>Some archaic web here</html>';
// };
//
// const readFile = async (path) => {
//     await pause();
//     console.log('(4) Readme file loaded: ' + path);
//     return 'file content';
// };
//
// // Usage
//
// (async () => {
//
//     const config = await readConfig('myConfig');
//     const res = await doQuery('select * from cities');
//     const json = await httpGet('http://kpi.ua');
//     const file = await readFile('README.md');
//     console.log('Done');
//     console.dir({ config, res, json, file });
//
// })();

// class Proto {
//     move() {
//         console.log("динамический метод")
//     }
//     static more() {
//         console.log("статический метод")
//     }
// }
//
// Proto.prototype.love = function() {
//     console.log("динамический метод 2")
// }
//
// Proto.lore = function() {
//     console.log("статический метод 2")
// }
//
// const potomok = new Proto();
//
// potomok.love()
// potomok.move()
//
// // вызовет ошибку ведь статические методы не вызываются у потомков
// // potomok.lore()
// // potomok.more()
//
//
// Proto.lore()
// Proto.more()
// Proto.prototype.love()
// Proto.prototype.move()


// const c1 = chain()
//     .do(readConfig, "myConfig")
//     .do(doQuery, "bla bla")
//     .do(httpGet, "http:/bla.ru")
//     .do(readFile, "readme.md");
// c1();
//
// const cur = {
//     fn: null,
//     args: null,
//     prev: {
//         fn: doQuery,
//         args: "bla bla",
//         prev: {
//             fn: readConfig,
//             args: "myConfig",
//             prev: null,
//         }
//     }
// }
// ------
// const cur = {
//     fn: null,
//     args: null,
//     prev: {
//         fn: doQuery,
//         args: "bla bla",
//         prev: {
//             fn: readConfig,
//             args: "myConfig",
//             prev: null,
//             next: {
//                 fn: doQuery,
//                 args: "bla bla",
//                 prev: {
//                     fn: readConfig,
//                     args: "myConfig",
//                     prev: null,
//                 },
//                 next: {
//                     fn: null,
//                     args: null,
//                     prev: {
//                         fn: doQuery,
//                         args: "bla bla",
//                         prev: {
//                             fn: readConfig,
//                             args: "myConfig",
//                             prev: null,
//                         },
//                     }
//                 }
//             }
//         },
//         next: {
//             fn: null,
//             args: null,
//             prev: {
//                 fn: doQuery,
//                 args: "bla bla",
//                 prev: {
//                     fn: readConfig,
//                     args: "myConfig",
//                     prev: null,
//                 },
//             }
//         }
//     }
// }
// ----
//
//
// function chain(prev = null) {
//     const cur = () => {
//         if (cur.prev) {
//             cur.prev.next = cur;
//             cur.prev();
//         } else {
//             cur.forward();
//         }
//     };
//     cur.prev = prev;
//     cur.fn = null;
//     cur.args = null;
//     cur.do = (fn, ...args) => {
//         cur.fn = fn;
//         cur.args = args;
//         return chain(cur);
//     };
//     cur.forward = () => {
//         if (cur.fn) cur.fn(cur.args, () => {
//             if (cur.next) cur.next.forward();
//         })
//     }
//     return cur;
// }
//
//
// -----
//     const cur = {
//     prev: null,
//         fn: null,
//         args: null,
//     }
//
//     ------
//         const cur = {
//             fn: null,
//             args: null,
//             prev: {
//                 fn: readConfig,
//                 args: "myConfig",
//                 prev: null,
//             }
//         }
//         ------
//             const cur = {
//                 fn: null,
//                 args: null,
//                 prev: {
//                     fn: doQuery,
//                     args: "bla bla",
//                     prev: {
//                         fn: readConfig,
//                         args: "myConfig",
//                         prev: null,
//                     }
//                 }
//             }
//             ---
//

// проблемы всех выше описанных подходов
// смеси синтаксисов например промисов и колбеков
// приходится писать адаптер

// промисы и async await работают медленее колбеков

// нету возможности отмены вызванного ассинхронного действия
// если оно не успело завершится в течение заданного времени

// ниже реализуем эту возможность

// function timeout(msec, fn) {
//     let timer = setTimeout(() => {
//         if (timer) console.log('Function timeout');
//         timer = null;
//     }, msec);
//     return (...args) => {
//         if (timer) {
//             timer = null;
//             fn(...args);
//         }
//     }
// }
//
// // usage
//
// const fn = par => {
//     console.log('Function called, par: ' + par);
// }
//
// const fn100 = timeout(100, fn);
// const fn200 = timeout(200, fn);
//
// setTimeout(() => {
//     fn100('first');
//     fn200('second');
// }, 150)

// пишем функцию отмены ассинхронной функции коль нет встроенного
//
// const cancelable = fn => {
//     const wrapper = (...args) => {
//         if (fn) return fn(...args);
//     }
//     wrapper.cancel = () => {
//         fn = null;
//     };
//     return wrapper;
// }
//
// // usage
//
// const fn = par => {
//     console.log('Function called, par: ' + par);
// }
//
// const f = cancelable(fn);
//
// f('first');
// f.cancel();
// f('second');


//больше самописных утилит

// once - функция вызывается только один раз
// limit - вызывается максимум n-ое кол-во раз
// trottle - ограничение по частоте вызова - допускается максимальное колво n раз в m секкунд
// debounce - раз в сколько минут допускается единичный вызов функции
// utils - возвращает функтор у которого все методы выше описанные

// const utils = fn => {
//     const wrapper = (...args) => {
//         console.log(...args);
//         if (fn && wrapper.col !== 0) {
//                 if (wrapper.col !== undefined) {
//                     wrapper.col = wrapper.col - 1;
//                 }
//                     wrapper.res(fn(...args));
//                     return wrapper;
//         }
//     }
//     wrapper.col = undefined;
//     wrapper.timeDeb = false;
//     wrapper.res = (par) => {
//         return par;
//     }
//     wrapper.cancel = () => {
//         fn = null;
//         return wrapper;
//     };
//     wrapper.once = () => {
//             if (wrapper.col !== 0 && !wrapper.timeDeb) {
//                 wrapper.col = 1
//             }
//             return wrapper;
//         }
//     wrapper.limit = (col) => {
//         if (wrapper.col !== 0 && !wrapper.timeDeb) {
//             wrapper.col = col;
//         }
//         return wrapper;
//     }
//     wrapper.timeout = (msec) => {
//         setTimeout(() => {
//             fn = null;
//         }, msec);
//         return wrapper;
//     }
//     wrapper.debounce = (msec) => {
//         wrapper.timeDeb = true;
//         wrapper.col = 1;
//         setInterval(() => {
//             wrapper.col = 1;
//             console.log("куку");
//         }, msec);
//         return wrapper;
//     }
//     wrapper.throttle = (colc, msec) => {
//         wrapper.timeDeb = true;
//         wrapper.col = colc;
//         setInterval(() => {
//             wrapper.col = colc;
//         }, msec);
//         return wrapper;
//     }
//     return wrapper;
// }
//
// //usage
//
// const fn = par => {
//     console.log('Function called, par: ' + par);
// }
// const f = utils(fn).limit(3)("8")("0").cancel()("788")
// // const f1 = utils(fn).limit(3)("8")("0")("788").debounce(25000)
// // setInterval(() => {
// //     f1("7888889")
// // }, 10000)
// const f1 = utils(fn).limit(3)("8")("0")("788").throttle(2, 24000)
// setInterval(() => {
//     f1("7888889")
// }, 5000)

// // встроенные в ноду функции
//
// const util = require('util');
//
// //promisify
//
// const promise = util.promisify(fn);
// promise.then((data) => {
//     // Do something with `stats`
// }).catch((error) => {
//     // Handle the error.
// });
//
// // callbackify
//
// const callbackFunction = util.callbackify(promise);
//
// callbackFunction((err, ret) => {
//  // do something
// });

// надо дасть ниже определение адаптеру

// есть также понятия прикладного и системного кода
// системный код - это уровень ние, из него состоит конструкцииприкладного кода
// системный код - должен быть производительным
// прикладной код должен быть архитектурно правильным и читаемым

// фдаптер sync to async

// const last = arr => arr[arr.length - 1]
//
// const toAsync = fn => (...args) => {
//     const callback = last(args);
//     args.pop();
//     callback(null, fn(...args));  // асинхронная фун-я
// }
//
// // usage
//
// const f1 = par => par;
// const f2 = par => par;
// const f3 = par => par;
// const f4 = par => par;
//
// const af1 = toAsync(f1);
// const af2 = toAsync(f2);
// const af3 = toAsync(f3);
// const af4 = toAsync(f4);
//
// af1('value', (e, data) => {
//     af2('value', (e, data) => {
//         af3('value', (e, data) => {
//             af4('value', (e, data) => {
//                 console.log(data);
//             })
//         })
//     })
// })

// зачем он? Если есть функции синхроннфе и ассинхронные и нужно привести их к единому контракту
// то можно синхронные привести к контракту ассинхронных
// тгда можно создать цепочку вызовов

// адаптер sync to Promise

// const toPromise = fn => (...args) =>
//     new Promise(resolve => resolve(fn(...args)));
//
// // usage
// const f1 = par => par;
// const f2 = par => par;
// const f3 = par => par;
// const f4 = par => par;
//
// // вот здесь цепочка синхронных функций
// console.log(f4(f3(f2(f1('value')))));
//
// const pf1 = toPromise(f1);
// const pf2 = toPromise(f2);
// const pf3 = toPromise(f3);
// const pf4 = toPromise(f4);
//
// Promise.resolve()
//     .then(pf1.bind(null, 'value'))
//     .then(pf2())
//     .then(pf3())
//     .then(pf4())
//     .then(data => {
//         console.log(data)
//     })

// на 43 мин посмотри методы metasync может сама напишешь

// вот примеры использования metasync

// const fx = metasync.flow(
//     [f1, f2, f3, [[f4, f5, [f6, f7], f8]], f9]
// )
//
// // если двойные скобки массива - параллельное исполнение
// // одинарные - последовательное исполнение
//
// //то же самое
//
// const fx = metasync(
//     [f1, f2, f3, [[f4, f5, [f6, f7], f8]], f9]
// )

// надо признать что и flow что sequential и parallel все эти функции из metasync осуществляют
// только контракт ассинхронных функции - все аргументы АФ и на выходе АФ
// с четким соблюдением контракта callback-last error-first


// Data Collector
// но иногда работа с асинхронщиной сводится к обработке события инициируемое пользователем
// и тогда удобен другой паттерн Data Collector похлжий на паттерн event

// const dc1 = new metasync.DataCollector(4);
// // первый аргумент кол-во кусков информации
// // второй - таймаут в течение которого если все куски инфы придут вызовется событие done
// const dc2 = new metasync.DataCollector(4, 5000);
//
// dc1.on('error', (err, key) => {});
// dc1.on('timeout', (err, data) => {});
// dc1.on('done', (err, data) => {});
//
// // сам DataCollector хранит внутри себя коллекцию (массив)
// // вот так мы кладем кусок данных в эту коллекцию
//
// dc1.collect(data);
//
// // а вот так мы кладем ошибку
//
// dc1.error(new Error());
//
// //Key collector
//
// // в keyCollector уже хранится хеш мапа
// // первый аргумент - массив ключей (индексов)
// //
// const keyCollector = new KeyCollector(
//     ['k1', 'k2'], data => console.dir(data)
// );
//
// // вот так мы кладем значение в поле определенного ключа
// // вот тут синхронная вставка
// keyCollector.collect('k1', {});
//
//
// // а вот тут ассинхронная вставка
// fs.readFile('History.md', (err, data) => {
//     keyCollector.collect('history', data);
// })
//
// // в чем прикол DataCollector и keyCollector - они быстрее и производительнее колбеков и промисов
//
// // пчм производительнее колбеков? колбеки очень сильно набивают стек, а развязка через события
// // набивает колстек намного меньше
//
//
// //а вот и окончательный синтаксис
//
// const dc1 = metasync
//     .collect(3)
//     .timeout(5000)
//     .done((err, data) => {})
// dc1(item);
//
// const dc2 = metasync
//     .collect(['k1', 'k2', 'k3'])
//     .timeout(5000)
//     .done((err, data) => {})
// dc1(key, value);

// парочка фич date/key collect (коллектора) из metasync

// const dc = metasync
//     .collect(count)
//     .distinct()
//     .done((err, data) => {})
//
// // ключ значение ошибка (ну вдруг в поле надо записать ошибку а не значение) иои есть вероятность ошибки
// dc(key, error, value);
//
// // pick - запись элемента в поле
// dc.pick(key, value);
// // fail - запись ошибки
// dc.fail(key, error);
// fs.readFile(filename, dc.bind(null, key));
// // а вот если результат АФ ндо записать в поле с опред ключом
// // 1 арг - ключ поля
// // 2 - АФ
// // 3- аргументы АФ
// dc.take(key, fs.readFile, filename)

//а теперь подводим итоги с производительностью
// promiseAll - 17
// flow - 7
// collect - 3

// это тесты на ноде 7
// в ноде 10 промисы сильно оптимизировали и теперь там отставание меньше

// паттерн очереди

// //  создаем очередь из 3 параллельных каналов
// const cq = metasync.quene(3)
//     //в каждом канале идет ожидание до оьработкидо 2000 мс
//     .wait(2000)
//     // запрос обрабатывается не более 5000 мс
//     .timeout(5000)
//
//     // в очередб поступает не более 100 запросов в 1с
//     .throttle(100, 1000)
//     // колбек обработки запроса
//     .process((item, cb) => cb(err, resut))
//     // колбек обработки рез-та запроса при success
//     .success(item => {})
//     // и fail
//     .failure(item => {})
//     // и success и failure вместе (как в промисах помнишь)
//     .done(() => {})
//     // когда все очередь рассосалась выз-ся метод drain
//     .drain(() => {})

//Адаптер / Adapter - Паттерн достижения совместимости,
// позволяющий обернуть класс, функцию или другой программный компонент
// с несовместимым контрактом в программный компонент с контрактом, который нам нужен.

// 1) адаптер из функции возвращающей промис
// to callback-last / error-first contract

// const promiseToCallbackLast = promise => callback => {
//     promise.then(
//         value => {
//             callback(null, value);
//         }
//     ).catch(reason => {
//         callback(reason);
//     })
// };
//
// const callbackify = fn => (...args) => {
//     const callback = args.pop();
//     promiseToCallbackLast(fn(...args))(callback);
// };
//
// // usage
//
// async function FuncReturnPromise(par) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // return reject(par);
//            return resolve(par)
//         }, 4000);
//     });
// }
//
// const callbackFunction = callbackify(FuncReturnPromise);
//
// callbackFunction(60, (err, res) => {
//  console.log("мяу мяу наш результат ", res);
// });
//
// callbackFunction(new Error('ggggh'), (err, res) => {
//     console.log("мяу мяу наша ошибка ", err);
// });
//
// // 2) asyncify(fn) - приведена выше под именем toAsync - адаптер
// // из синхронной функции to callback-last / error-first contract
//
// // 3) promiseToCallbackLast(promise, callback) - адаптер
// // из промиса to callback-last / error-first contract - приведен выше
//
// // 4) promisify(fn) - адаптер
// // из callback-last / error-first contract
// // в функцию возвращающую промис - обратная 1
//
// const promisify = fn => (...args) =>
//     new Promise((resolve, reject) => {
//         fn(...args, (err, data) => {
//             if (err) reject(err);
//             else resolve(data);
//         });
//     });
//
// // использование:
//
// function loadScript(src, callback) {
//     let script = document.createElement('script');
//     script.src = src;
//
//     script.onload = () => callback(script);
//     script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));
//
//     document.head.append(script);
// }
//
// const loadScriptPromise = promisify(loadScript)('path/script.js')
// loadScriptPromise
//     .then((res) => {
//         console.log(res)
//     });

// 5) promisifySync - адаптер
// из синхронной функции в функцию возвращающую промис

// const promisifySync = fn => (...args) => {
//     let result;
//     try {
//         result = fn(...args);
//     } catch (error) {
//         return Promise.reject(error);
//     }
//     return Promise.resolve(result);
// };
//
// // использование
//
// const syncFn = par => par;
//
// const promiseFn = promisifySync(syncFn)(5);
// promiseFn
//     .then((res) => {
//         console.log(res)
//     });

// new Promise((resolve, reject) => {
//     console.log(5);
//     return true;
// })
//     .then((res) => {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => resolve('error'), 1000)
//         })
//     })
//     .catch((e) => {
//         console.log("reject! ", e);
//     })
//     .then((res) => {
//         console.log("resolve! ", res);
//     })

const mas = [null];
console.log([].join(', ').length);
console.log(mas.join(', ').trim().length);

