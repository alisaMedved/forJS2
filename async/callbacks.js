// import * as async from "async";

// контракт колбеков -  колбек последним передается, а ошибка - первой
// callback => callback(data)
// (...args, callback) => callback(error, data);

// решаение ох это горе - либо bind, либо делать раздельные именнованные функции и вызывать в друг друге
// (но тогда нет единого места управления вызовавми)


// еще одно решение позволяющее писать асинхронщину это
// async.js

// async.series(
//     [...arrayFuncs,(data, cb) => cb(err, result)],
//     (err, result) => {}
// );

// но тут два прикольных момента
// 1) можно первым агументом класть объект функции, н как известно
// иттерируются поля объекта в порядке добавления и потому надежнее
// если ратуете за строгую последовательность выполнения функции через массив

// 2) (err, result) => {} - второй агрумент необязательный
// это функция в которую будет передан конечный результат.

//3) если передаешь массив фе=ункций - то result это массив
// если передаешь объект фе=ункций - то result это объект

// async.parallel() для осуществеления любых операций, которые должны выполняться параллельно


// но вот если идет смесь последовательных и параллельных вызовов то async.js не спасает

// можно ассинхронность делать через Events
// выглядит страшно- читается плохо, но работает


//I suppose that starting from version 0.11 you can run var Emitter = require('events');,
// but in 0.10.x you are stuck with require('events').EventEmitter.

// вот так можно делать последовательные вызовы асинхронных функций
const eventEmitter = require('events');
// const ee = new events.EventEmitter();
const ee = new eventEmitter();
const f1 = (par) => {
    console.log(par);
    ee.emit('step2')
};
const f2 = (par) => {
    console.log(par);
    ee.emit('step3')
};
const f3 = (par) => {
    console.log(par);
    ee.emit('done')
};
ee.on('step1', f1.bind(null));
ee.on('step2', f2.bind(null, 'par2'));
ee.on('step3', f3.bind(null, 'par3'));
ee.on('done', () => console.log('done'));
ee.emit('step1', 'par1');

// а если нам нужно делать три последовательные функции и плюс три ругие последоватеьные функции,
// и обе грпуппы выполняются параллельно - то для второй группы создаем еще один eventEmitter


// ассинхронность на промисах

// если нужно последовательное выполнение то тогда юзаем чейнинг then
// правда где надо лучше дополнительно поставить catch

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => console.log("fooP1"), 5000);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => console.log("fooP2"), 10);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => console.log("fooP3"), 10);
});

// да да Promise.all не ждет выполнения p1 чтобы приступить к выполнению p2
// это эдакое параллельное выполнение
Promise.all([p1, p2, p3]).then(() => {
    console.log("values");
});

// но лучше делать allSettled - в этом методе пофикшено что обваливается
// если хоть один из помисов массиве rejected
Promise.allSettled([p1, p2, p3]).then(() => {
    console.log("values");
});

//Выведет:
// [3, 1337, "foo"]
