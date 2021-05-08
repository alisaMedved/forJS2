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

function timeout(msec, fn) {
    let timer = setTimeout(() => {
        if (timer) console.log('Function timeout');
        timer = null;
    }, msec);
    return (...args) => {
        if (timer) {
            timer = null;
            fn(...args);
        }
    }
}
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

const utils = fn => {
    const wrapper = (...args) => {
        console.log(...args);
        if (fn && wrapper.col !== 0) {
                if (wrapper.col !== undefined) {
                    wrapper.col = wrapper.col - 1;
                }
                    wrapper.res(fn(...args));
                    return wrapper;
        }
    }
    wrapper.col = undefined;
    wrapper.timeDeb = false;
    wrapper.res = (par) => {
        return par;
    }
    wrapper.cancel = () => {
        fn = null;
        return wrapper;
    };
    wrapper.once = () => {
            if (wrapper.col !== 0 && !wrapper.timeDeb) {
                wrapper.col = 1
            }
            return wrapper;
        }
    wrapper.limit = (col) => {
        if (wrapper.col !== 0 && !wrapper.timeDeb) {
            wrapper.col = col;
        }
        return wrapper;
    }
    wrapper.timeout = (msec) => {
        setTimeout(() => {
            fn = null;
        }, msec);
        return wrapper;
    }
    wrapper.debounce = (msec) => {
        wrapper.timeDeb = true;
        wrapper.col = 1;
        setInterval(() => {
            wrapper.col = 1;
            console.log("куку");
        }, msec);
        return wrapper;
    }
    wrapper.throttle = (colc, msec) => {
        wrapper.timeDeb = true;
        wrapper.col = colc;
        setInterval(() => {
            wrapper.col = colc;
        }, msec);
        return wrapper;
    }
    return wrapper;
}

//usage

const fn = par => {
    console.log('Function called, par: ' + par);
}
const f = utils(fn).limit(3)("8")("0").cancel()("788")
// const f1 = utils(fn).limit(3)("8")("0")("788").debounce(25000)
// setInterval(() => {
//     f1("7888889")
// }, 10000)
const f1 = utils(fn).limit(3)("8")("0")("788").throttle(2, 24000)
setInterval(() => {
    f1("7888889")
}, 5000)




