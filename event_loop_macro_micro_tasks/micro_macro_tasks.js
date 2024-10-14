// // пауза циклом while
//
// const timer = msec => {
//     const end = new Date().getTime() + msec;
//     do {} while(new Date().getTime() < end)
// };
//
// console.log('Start timer: ' + new Date().toISOString());
// console.log('  Sleep about 3 sec');
// timer(3000);
// console.log('After timer: ' + new Date().toISOString());
//
// //пауза промисом
//
// const sleep = msec => new Promise(resolve => {
//     setTimeout(resolve, msec);
// });
//
// (async () => {
//     console.log('Start sleep: ' + new Date().toISOString());
//     console.log('  Sleep about 3 sec');
//     await sleep(3000);
//     console.log('After sleep: ' + new Date().toISOString());
// })();
//
//
// // теперь разница двух подходов
//
// // цикл - это синхронная операция
// // а промис - это асинхронная операция.
// // цикл сразу передается в выполнение в callstack и потому события
// // из render queue не могут переходить в callstack так как он занят синхронщиной цикла.
// // а это значит не будет происходит перерисовка перерендеринг в браузере
// // и нельзя будет кликать выделять и отправлять и делать другие вещи до тех пор пока
// // callstack не очистится
//
// // промис передается в callstack но из него сразу же в web api
// // и когда протикает время колбек промиса придет в task queue. и callstack сразу же освобождается при передачи
// //в web api
// // Callstack не занят и к тому же события из render queue имеют более высокий приоритет чем соытия из
// // task queue и потому события из task queue и render queue чередуются при попадании в callstack
// // и экран браузера не блокируется.
//
// // JS runtime - это однопоточность. И псевдомногопоточность создают дополнительные webApi.
//
// const sleep1 = msec => new Promise(resolve => {
//     setTimeout(resolve, msec);
// });
//
// console.log('Start sleep1: ' + new Date().toISOString());
// console.log('  Sleep about 3 sec');
// sleep1(3000).then(() => {
//     console.log('After sleep1: ' + new Date().toISOString());
// });
//
// // порядок вызовов
//
// const fs = require('fs');
//
// setTimeout(() => {
//     console.log('callback #1 setTimeout 0');
// }, 0);
//
// setTimeout(() => {
//     console.log('callback #2 setTimeout 0');
// }, 0);
//
// setTimeout(() => {
//     console.log('callback #3 setTimeout 1');
// }, 2);
//
// setTimeout(() => {
//     console.log('callback #4 setTimeout 1');
// }, 2);
//
// setImmediate(() => {
//     console.log('callback #5 setImmediate');
// });
//
// setImmediate(() => {
//     console.log('callback #6 setImmediate');
// });
//
// const t7 = setInterval(() => {
//     clearInterval(t7);
//     console.log('callback #7 setInterval 0');
// }, 0);
//
// const t8 = setInterval(() => {
//     clearInterval(t8);
//     console.log('callback #8 setInterval 0');
// }, 0);
//
// process.nextTick(() => {
//     console.log('callback #9 process.nextTick');
// });
//
// process.nextTick(() => {
//     console.log('callback #10 process.nextTick');
// });
//
// (callback => callback())(() => {
//     console.log('callback #11 callback');
// });
//
// (callback => callback())(() => {
//     console.log('callback #12 callback');
// });
//
// fs.readFile('./4-order.js', 'utf8', () => {
//     console.log('callback #13 readFile');
// });
//
// fs.readFile('./4-order.js', 'utf8', () => {
//     console.log('callback #14 readFile');
// });
//
// console.log('main ended');
//
// // и вот что получилось.
// // первыми идут синхронные операции (они ведь при попадании в callstack и там сразу выполняются)
// // это IFFE и console.log
// // далее идут все ассинхронные операции (они ведь при попадании в callstack и сразу отправляются в webApi/"Api Node.js на сервере" и затем из webApi/"Api Node.js на сервере" eventLoop
// // переносит их колбеки в callstack когда пробьет их таймер/приоритет)
//
// // process.nextTick - самый высокий приоритет - кстати у него есть своя очередь next tick queue
// // setTimeout 0
// // затем setTimeout 1
// // как ни странно setInterval 0 - скорее всего погрешность - все таки маленькие значения таймаутов как 1. Вот на 2 поменяла и все норм стало
// // далее файл успел прочитаться к моменту
// // setImmediate - он вообще сейчас уже нестандарт, но как и описано в документации - он идет после всех событий и ререндеров
//
// // callback #11 callback
// // callback #12 callback
// // main ended
// // callback #9 process.nextTick
// // callback #10 process.nextTick
// // callback #1 setTimeout 0
// // callback #2 setTimeout 0
// // callback #3 setTimeout 1
// // callback #4 setTimeout 1
// // callback #7 setInterval 0
// // callback #8 setInterval 0
// // callback #13 readFile
// // callback #14 readFile
// // callback #5 setImmediate
// // callback #6 setImmediate
//
//
// // ниже пример показывает что setTimeout на самом деле свойственно ошибаться эдак на 1ms и более. по понятным причинам
//
// // process.hrtime - в ноде выдает время текущее в наносекундах
// const begin = process.hrtime.bigint();
//
// const diff = end => (end - begin) / 1000000n;
//
// setTimeout(() => {
//     const end = process.hrtime.bigint();
//     console.log('  10ms: ' + diff(end));
// }, 10);
//
// setTimeout(() => {
//     const end = process.hrtime.bigint();
//     console.log(' 100ms: ' + diff(end));
// }, 100);
//
// setTimeout(() => {
//     const end = process.hrtime.bigint();
//     console.log(' 500ms: ' + diff(end));
// }, 500);
//
// setTimeout(() => {
//     const end = process.hrtime.bigint();
//     console.log('1000ms: ' + diff(end));
// }, 1000);


console.log('Hello => number 1');
setImmediate(() => {
    console.log('Running before the timeout => number 3');
});
setTimeout(() => {
    console.log('The timeout running last => number 4');
}, 0);
process.nextTick(() => {
    console.log('Running at next tick => number 2');
});