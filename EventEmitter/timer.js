'use strict';


// таймеров нет в js. Они поставляются в js (инжектятся) либо из браузера либо из ноды
// и ясно дело реализация таймеров в ноде и  в браузере отличаются

// const timers = require('timers');
//
// console.log(Object.keys(timers));
// поговорим о полях таймера из node.js

// [ 'active', -
//     '_unrefActive',
// unenroll и enroll это для высоконагруженных таймеров такие есть только в ноде и они уже depricated - и вскоре вместо них полноценно заработает setTimeout
// а что ж они делали? - ну вот есть проблема создать 10000 таймеров - это много. А функция enroll позволяла с помощью одного таймера симмулировать множество таймеров
// просто несколько колбеков навешивались на один таймер и все отсчеты проводились в одном этом таймере, а функция unenroll производила отписку колбеков
//     'unenroll',
//     'enroll',
//     'setTimeout',
//     'clearTimeout',
//     'setInterval',
//     'clearInterval',
//     'setImmediate',
//     'clearImmediate'
// ]


// // да функция setTimeout и timers.setTimeout это одно и то же
// console.log(
//     'setTimeout === timers.setTimeout = ' +
//     (setTimeout === timers.setTimeout)
// );
//
// // setTimeout - это экземпляр класса Timeout
// дополнение у этого экземпляра мы также увидим поля onTimeout - это колбек навешанный в setTimeout
// и поле timerArgs - это аргументы этого колбека
// console.dir({ setTimeout: setTimeout(() => {}, 0) });
// // setInterval - это экземпляр класса Timeout
// console.dir({ setInterval: setInterval(() => {}, 0) });
// // setImmediate - это экземпляр класса Immediate
// console.dir({ setImmediate: setImmediate(() => {}) });
// //{ nextTick: undefined } - фишка в чем - все предыдущие возвращают какой-то объект с параметрами, которые можно настраивать
// // но nextTick возвращает undefined - он выполнится сразу как только колстек опустеет
// console.dir({ nextTick: process.nextTick(() => {}) });

// у таймеров в ноде есть также метод unref - в браузере такого нет
// стоит упомянуть что мы рассматриваем метод unref  - метод класса Timeout

// const timer = setTimeout(() => {}, 10000);
//
// console.dir(timer);
//
// // '--unref' - вот это так называемый "ключ" который я ввожу в консоли
// // то есть node EventEmitter/timer.js --unref
//
// // что делает метод unref - заставляет программу сразу завершится при запуске таймера, и ясно дело никого отчета таймера уже не будет
// а по другому - заставляет цикл событий ноды ( Node.js event loop) завершится при запуске таймера при условии что не будет других процессов, загромождающих или попадающих и т д в event loop
// if (process.argv[2] === '--unref') timer.unref();
// console.dir(timer);
//
// // node EventEmitter/timer.js --unref --ref
// // ref - это отмена unref - программа запустит таймер, таймер протикает и только потом если больше не останется событий в программе, то она завершится сразу после того как протикает таймер
// if (process.argv[3] === '--ref') timer.ref();
// console.dir(timer);
//
//
// // методы таймеров ноды - enroll и active

// const timers = require('timers');
//
// const timer = {
//     // да мы помним два момента
//     // 1) с _ начинаются системные свойства
//     // 2) _onTimeout - это колбек который навесили в setTimeout
//     _onTimeout: () => {
//         console.log('_onTimeout called');
//     }
// };
//
// // enroll -  указать через сколько таймер протикает, но сейчас этот метод deprecated
// // и вместо него юзают setTimeout метод
// timers.enroll(timer, 1000);
// // active - запуск таймера
// timers.active(timer);
// console.dir({ timer });

// схема event loop из официальной доки разбирается после этого момента в лекции

// EventEmitter - существует в ноде, но не существует в апи браузера. Хотя его там можно самому накастомить
// EventEmitter - это универсальная абстракция для работы с событиями через подписку (subscription: addListener, on, once) и отправку (emit)
// по сути это шина событий

// весь асинхронный код и все и вся не стоит строит на eventEmitter - эта абстракция особенно популярна и хороша при малой связности кода
// мы не знаем нужно ли и кому и где нужно будет событие - вот и вызываем его и т д.

// модуль assert это эдакий удобный модуль проверки всяких переменных - удобен для тестов
// const assert = require("assert");
// const events = require("events");
// //
// const emitter = () => {
//     // в принципе это все что ттебуется дальше мы поднавернули
//     const ee = new events.EventEmitter();
//     const emit = ee.emit;
//     ee.emit = (...args) => {
//         if (args[0] !== "*") emit.apply(ee, args);
//         args.unshift('*');
//         emit.apply(ee, args);
//     }
//     return ee;
// }
// //
// const ee = emitter();
// //
// // on - навешивание обработчика на событие
// ee.on('smth', data => {
//     // равна ли константа 5
//     assert.strictEqual(data.a, 5);
// })
//
// // делаем универсальный обработчик события - на все виды событий
// ee.on('*', (name, data) => {
//     if (name === 'smth') {
//         assert.strictEqual(data.a, 5);
//     } else if (name === 'smth2') {
//         assert.strictEqual(data.a, 500);
//     } else if (name === '*') {
//         assert.strictEqual(data.a, 700);
//     } else {
//         assert.fail('This should never happen');
//     }
// })
//
// // // вызываем события + прокидываем данные которые должен получать обработчик при срабатывании события
// //вообще по правильному говорят отправляем события
// // навешиваем и отправляем
// ee.emit('smth', {a: 5});
// ee.emit('smth2', {a: 500});
// ee.emit('*', {a: 700});


// различные реализации eventEmitter

// eventEmitter на прототипах

// const EventEmitter = function() {
//     this.events = {}; // hash of array of function
// };
//
// EventEmitter.prototype.on = function(name, fn) {
//     const event = this.events[name];
//     if (event) event.push(fn);
//     else this.events[name] = [fn];
// };
//
// EventEmitter.prototype.emit = function(name, ...data) {
//     const event = this.events[name];
//     if (!event) return;
//     for (const listener of event) listener(...data);
// };
//
// module.exports = EventEmitter;

//usage

// const ee = new EventEmitter();
//
// ee.on('event1', data => {
//     console.dir(data);
// });
//
// ee.emit('event1', { a: 5 });

// расширение кастомизация функционала eventEmitter из ноды
//
// const events = require("events");
//
// const emitter = () => {
//     const ee = new events.EventEmitter();
//     const emit = ee.emit;
//     ee.emit = (...args) => {
//         if (args[0] !== "*") emit.apply(ee, args);
//         args.unshift('*');
//         emit.apply(ee, args);
//     }
//     return ee;
// }
//
// // usage
//
// const ee = emitter();
//
// ee.on('event1', data => {
//     console.log('Certain event');
//     console.dir(data);
// });
//
// ee.on('*', (name, data) => {
//     console.log('Any event');
//     console.dir([name, data]);
// });
//
// ee.emit('event1', { a: 5 });
// ee.emit('event2', { a: 500 });
// ee.emit('*', { a: 700 });


// eventEmitter на замыканиях

// const emitter = () => {
//     const events = {};
//     return {
//         on: (name, fn) => {
//             const event = events[name];
//             if (event) event.push(fn);
//             else events[name] = [fn];
//         },
//         emit: (name, ...data) => {
//             const event = events[name];
//             if (event) event.forEach(fn => fn(...data));
//         }
//     };
// };
//
// // Usage
//
// const ee = emitter();
//
// ee.on('event1', data => {
//     console.dir(data);
// });
//
// ee.emit('event1', { a: 5 });

// краткая версия на замыкания eventEmitter

// const emitter = (events = {}) => ({
//     // не оптимально лишнее присвоение events[name] = events[name] - так написали тупо для краткости кода и чтобы не использовать if
//     on: (name, fn) => (events[name] = events[name] || []).push(fn),
//     emit: (name, ...data) => (events[name] || []).forEach(fn => fn(...data))
// });
//
// // Usage
//
// const ee = emitter();
//
// ee.on('event1', data => {
//     console.dir(data);
// });
//
// ee.emit('event1', { a: 5 });

// eventEmitter на замыкании с большим количеством методов

// const emitter = () => {
//     let events = {};
//     const ee = {
//         on: (name, f, timeout = 0) => {
//             const event = events[name] || [];
//             events[name] = event;
//             event.push(f);
//             if (timeout) setTimeout(() => {
//                 ee.remove(name, f);
//             }, timeout);
//         },
//         emit: (name, ...data) => {
//             const event = events[name];
//             if (event) event.forEach(f => f(...data));
//         },
//         // при первом emit события - вызывает обработчик
//         // при втором и последующей отправке этого события - удаляет обработчик
//         once: (name, f) => {
//             const g = (...a) => {
//                 ee.remove(name, g);
//                 f(...a);
//             };
//             ee.on(name, g);
//         },
//         // удаление обработчика события
//         // учитывает случай i === -1 - это же тогда когда мы g поставили в обработчики в once
//         remove: (name, f) => {
//             const event = events[name];
//             if (!event) return;
//             const i = event.indexOf(f);
//             if (i !== -1) event.splice(i, 1);
//         },
//         // удаляет событие со всеми его обработчиками
//         // а если имя удаляемого события не передано в качестве аргумента - удаляет все события и все их обработчики
//         clear: name => {
//             if (name) delete events[name];
//             else events = {};
//         },
//         // количество обработчиков на событие
//         count: name => {
//             const event = events[name];
//             return event ? event.length : 0;
//         },
//         listeners: name => {
//             const event = events[name];
//             // хитрая уловка - так получится тупо копия массива - и оригинал будет недоступен пользователю
//             return event.slice();
//         },
//         names: () => Object.keys(events)
//     };
//     return ee;
// };
//
// // Usage
//
// const ee = emitter();
//
// // on and emit
//
// ee.on('e1', data => {
//     console.dir(data);
// });
//
// ee.emit('e1', { msg: 'e1 ok' });
//
// // once
//
// ee.once('e2', data => {
//     console.dir(data);
// });
//
// ee.emit('e2', { msg: 'e2 ok' });
// ee.emit('e2', { msg: 'e2 not ok' });
//
// // remove
//
// const f3 = data => {
//     console.dir(data);
// };
//
// ee.on('e3', f3);
// ee.remove('e3', f3);
// ee.emit('e3', { msg: 'e3 not ok' });
//
// // count
//
// ee.on('e4', () => {});
// ee.on('e4', () => {});
// console.log('e4 count', ee.count('e4'));
//
// // clear
//
// ee.clear('e4');
// ee.emit('e4', { msg: 'e4 not ok' });
// ee.emit('e1', { msg: 'e1 ok' });
//
// ee.clear();
// ee.emit('e1', { msg: 'e1 not ok' });
//
// // listeners and names
//
// ee.on('e5', () => {});
// ee.on('e5', () => {});
// ee.on('e6', () => {});
// ee.on('e7', () => {});
//
// console.log('listeners', ee.listeners('e5'));
// console.log('names', ee.names());
//
// // const obj = {
// //     a: "yyuu",
// //     b: "yyuu88",
// // }
// // console.dir(obj);
// // delete obj.a;
// // console.dir(obj);

// более короткая реализация

// const emitter = (l, o) => (l = {}, o = {
//     on: (n, f) => (l[n] = l[n] || []).push(f),
//     emit: (n, ...d) => (l[n] || []).map(f => f(...d)),
//     once: (n, f, g) => o.on(n, g = (...a) => (f(...a), o.remove(n, g))),
//     remove: (n, f, e) => (e = l[n] || [], e.splice(e.indexOf(f), 1)),
//     clear: n => (n ? delete l[n] : l = {}),
//     count: n => (l[n] || []).length,
//     listeners: n => (l[n] || []).slice(),
//     names: () => Object.keys(l)
// });
//
// // Usage
//
// const ee = emitter();
//
// // on and emit
//
// ee.on('e1', data => {
//     console.dir(data);
// });
//
// ee.emit('e1', { msg: 'e1 ok' });
//
// // once
//
// ee.once('e2', data => {
//     console.dir(data);
// });
//
// ee.emit('e2', { msg: 'e2 ok' });
// ee.emit('e2', { msg: 'e2 not ok' });
//
// // remove
//
// const f3 = data => {
//     console.dir(data);
// };
//
// ee.on('e3', f3);
// ee.remove('e3', f3);
// ee.emit('e3', { msg: 'e3 not ok' });
//
// // count
//
// ee.on('e4', () => {});
// ee.on('e4', () => {});
// console.log('e4 count', ee.count('e4'));
//
// // clear
//
// ee.clear('e4');
// ee.emit('e4', { msg: 'e4 not ok' });
// ee.emit('e1', { msg: 'e1 ok' });
//
// ee.clear();
// ee.emit('e1', { msg: 'e1 not ok' });
//
// // listeners and names
//
// ee.on('e5', () => {});
// ee.on('e5', () => {});
// ee.on('e6', () => {});
// ee.on('e7', () => {});
//
// console.log('listeners', ee.listeners('e5'));
// console.log('names', ee.names());

// тоже самое только в качестве колекции используется new Map

// const emitter = () => {
//     const events = new Map();
//     const wrapped = new Map();
//     const ee = {
//         on: (name, f, timeout = 0) => {
//             const event = events.get(name);
//             if (event) event.push(f);
//             else events.set(name, [f]);
//             if (timeout) setTimeout(() => {
//                 ee.remove(name, f);
//             }, timeout);
//         },
//         emit: (name, ...data) => {
//             const event = events.get(name);
//             if (event) event.forEach(f => f(...data));
//         },
//         once: (name, f) => {
//             const g = (...a) => {
//                 ee.remove(name, g);
//                 f(...a);
//             };
//             wrapped.set(f, g);
//             ee.on(name, g);
//         },
//         remove: (name, f) => {
//             const event = events.get(name);
//             if (!event) return;
//             let i = event.indexOf(f);
//             if (i !== -1) {
//                 event.splice(i, 1);
//                 return;
//             }
//             const g = wrapped.get(f);
//             if (g) {
//                 i = event.indexOf(g);
//                 if (i !== -1) event.splice(i, 1);
//                 if (!event.length) events.delete(name);
//             }
//         },
//         clear: name => {
//             if (name) events.delete(name);
//             else events.clear();
//         },
//         count: name => {
//             const event = events.get(name);
//             return event ? event.length : 0;
//         },
//         listeners: name => {
//             const event = events.get(name);
//             return event.slice();
//         },
//         names: () => [...events.keys()]
//     };
//     return ee;
// };
//
// // Usage
//
// const ee = emitter();
//
// // on and emit
//
// ee.on('e1', data => {
//     console.dir(data);
// });
//
// ee.emit('e1', { msg: 'e1 ok' });
//
// // once
//
// ee.once('e2', data => {
//     console.dir(data);
// });
//
// ee.emit('e2', { msg: 'e2 ok' });
// ee.emit('e2', { msg: 'e2 not ok' });
//
// // remove
//
// const f3 = data => {
//     console.dir(data);
// };
//
// ee.on('e3', f3);
// ee.remove('e3', f3);
// ee.emit('e3', { msg: 'e3 not ok' });
//
// // count
//
// ee.on('e4', () => {});
// ee.on('e4', () => {});
// console.log('e4 count', ee.count('e4'));
//
// // clear
//
// ee.clear('e4');
// ee.emit('e4', { msg: 'e4 not ok' });
// ee.emit('e1', { msg: 'e1 ok' });
//
// ee.clear();
// ee.emit('e1', { msg: 'e1 not ok' });
//
// // listeners and names
//
// ee.on('e5', () => {});
// ee.on('e5', () => {});
// ee.on('e6', () => {});
// ee.on('e7', () => {});
//
// console.log('listeners', ee.listeners('e5'));
// console.log('names', ee.names());

// console.log("hjjyyyu ", as);
// console.log("hjjyyyu ", as);
// console.log("hjjyyyu ", as);
