'use strict';
//
// // образование функции высшего порядка inverse с помощью функции Math

// const { sin } = Math; // деструктивное присвоение
// const inverse = f => x => 1/f(x);
// const cosecant = inverse(sin);
// console.log(cosecant(5));

// // образование функции высшего порядка fn с помощью callback
//
// const fn = (par, callback) => {
//     if (!par) {
//         callback(new Error('Parameter needed'));
//         return;
//     }
//     callback(null, 'Data ' + par);
//     return 'value';
// };
//
// const res = fn('example', (err, data) => {
//     if (err) throw err;
//     console.dir({ data });
// });
//
// console.dir({ res });

// Образование функции высшего порядка fn с помощью замыкания

// const fn = a => {
//     const b = "Closure variable";
//     return c => {
//         console.dir({a, b, c});
//     }; // ФВП потому что возвращает анонимную лямбду с аргументом с
// };
//
// const f1 = fn('Parameter 1');
// f1('Parametr 2');


// Создание кэша cache с помощью замыкания захардкодили
//
// const fn = () => {
//     console.log('Generate cache');
//     const cache = {};
//     return key => {
//         let res = cache[key];
//         if (res) {
//             console.log('From cache');
//             return res;
//         } else {
//             console.log("calculate and save to cache");
//             res = 'value' + key;
//             cache[key] = res;
//             return res;
//         }
//     };
// };
//
// const f1 = fn();
// const f2 = fn();
//
// /* Вспомни два параллельных счетчика Кантера из замыкания.
// Здесь Тимур тоже показывает что при каждом вызове фнешней
// функции замыкания мы создаем
// новый LE - два независимых LE */
//
// //Вызов внутренней функции
//
// f1(1); //посчитали и сохранили в кэш
// f1(2);
// f1(1); //вытащили из кэша
// f1(2);
//
// f2(1); //посчитали и сохранили в кэш
// f2(2);
// f2(1); //вытащили из кэша
// f2(2);


// функция высшего порядка как обертка (ибо добавленно поведение логирования)

// const logable = fn => (...args) => {
//  const res = fn(...args);
//  console.log(`Call: ${fn.name}(${args.join(', ')}) Result: ${res}`); // логирование
// };
//
// const sum = (a, b) => (a+b);
//
// const wrapped = logable(sum);
// wrapped(3, 5);
// wrapped(9, 5);
//

 // callback синхронный

// const add = (a, b) => (a+b);
// const sum = (a, b, callback) => callback(a+b);
//
// console.log('Use add: '+ add(5, 2));
// sum(5, 2, console.log.bind(null, 'Use sum: ') );
// // В метод bind также передаётся набор аргументов, которые будут
// // установлены перед переданными в привязанную функцию
// // аргументами при её вызове

// // Асинхронный колбэк
//
// const fs = require('fs');
//
// fs.readFile('new66.js', 'utf8', (err, data) => {
//     console.log({ lines: data.split('\n').length});
// });};
//
// /* лямбда (err, data) => {} является асинхронным колбэком.
// Т.к. этот колбек начнет исполнятся не в порядке написания/чтения файла,
// а после свершения определенного события ( в данном случае после прочтения
// функцией ВП readFile файла ) */
//
// console.log('end');

// Именнованый колбек

// const fs = require('fs');
// const print = (err, data) => {
//     console.log({ lines: data.split('\n').length});
// };
//
// const fileName = 'new66.js';
//
// fs.readFile(fileName, 'utf8', print);

// в callback ФВП readFile можно передавать только 2 аргумента

// const fs = require('fs');
// const print = (fileName, err, data) => {
//     console.log({ lines: data.split('\n').length});
// };
//
// const fileName = 'new66.js';
//
// fs.readFile(fileName, 'utf8', print.bind(null, fileName));

// с помощью bind создаем из функции с 3 аргументами функцию с 2 аргументами.
//Но по мне в данном случае это извращение какое-то. 3 аргумента -> 2 аргумента
// частичное применение

// Колбек с таймером

// const fn = () => {
//     console.log('Callback from from timer')
// };
//
// setTimeout(fn, 5000); // начало исполнения колбека fn через 5000 мс

// Легкое создание (множим) новых разновдностей ФВП с колбеками с
// помощью каррирования будто по шаблону

// const curry = (fn, ...par) => {
//     const curried = (...args) => (
//         fn.length > args.length ? curry(fn.bind(null, ...args)) : fn(...args)
//     );
//     return par.length? curried(...par) : curried;
// };
//
// const fn = () => {
//     console.log('Callback from from timer');
// };
//
// const setTimeoutCallback = (timeout, fn) => setTimeout(fn, timeout);
//
// const timer = curry(setTimeoutCallback);
// const timer2s = timer(2000);
// timer2s(fn);

// Лисенер listener

// const iterate = (array, listener) => {
//     for (const item of array) {
//         listener(item);
//     }
// };
//
// const cities = ['Kiev', 'Rom', 'Lisa'];
//
// const print = city => {
//     console.log('city: ' + city);
// };
//
// iterate(cities, print);

// Лисенер асинхронный (в данном случае асинхронность закл-ся в
// интервал между итерациями 1с и в зацикленности)

// const iterate = (array, listener) => {
//     let counter = 0;
//   setInterval(() => {
//       listener(array[counter++]);
//       if (counter >= array.length) counter = 0;
//   }, 1000);
// };
//
// const cities = ['Kiev', 'Rom', 'Lisa'];
//
// const print = city => {
//     console.log('Next city: ' + city);};
// iterate(cities, print);

// Сумматор. прелесть: ставим дельты - меняем value (чуть ли не рандомно)
// и нам прога сама сообщит когда
// value привысит порог. Слежка за изменениями переменных
//
const adder = initial => {
    let value = initial;
    const add = delta => {
        value += delta;
        console.log(value);
        if (value >= add.maxValue) add.maxEvent(value);
        //(value >= add.maxValue) - событие
        // add.maxEvent(value) - обработчик событий - лисенер
        return add;
    };
    add.max = (max, event) => {
        add.maxValue = max;
        add.maxEvent = event;
        return add;
    };
    return add;
};

const maxReached = value => {
    console.log('max value reached, value: ' + value);
};

const a1 = adder(10).max(100, maxReached)(-12);
a1(20);
a1(50);
a1(75);
a1(100);
a1(-200)(50)(30);

// Event-emitter

// const events = require('events'); // подключение библиотеки node js events
// const emitter = new events.EventEmitter();
//
// emitter.on('new city', city => {
//     console.log('Emitted city: ' + city);
// }); // задали событие и навесили обработчик
//
// emitter.on('new city', city => {
//     console.log('Emitted city 11: ' + city);
// });
//
// emitter.on('data', array => {
//     console.log(array.reduce((a, b) => a+b));
// });
//
// emitter.emit('new city', 'Delphi'); // вызвали событие и задали
//                                     // аргументы для обработчика
// emitter.emit('new city', 'Der');
// emitter.emit('new city', 'DFRa');
// emitter.emit('data', [5, 10, 7, -3]);

// Отложенный колбек за счет не отложенного времени выполнения, а
// за счет отложенного времени прихода аргументов для колбека

const getConferences = () => {
    let onDone = null;
    const deferred = {
        data: callback => onDone = callback,
    };
    setTimeout(() => {
        if (onDone) onDone(['Tehran', "yalta", 'Postdam']);
    }, 5000); // событие - пришли аргументы в колбек
    return deferred;
};

const  conferences = getConferences(); // отложенный объект
console.log(conferences);

conferences.data(list => {
    console.log(list);
});
console.log('end');

//Асинхронный вызов событий. Обработка ошибок try...catch
// (ловит только синхронные ошибки) 
const adder = value => {
    const add = a => {
        value += a;
        if (value >= add.maxValue) {
           setImmediate(() => {
               add.maxEvent(new Error('max value reached'), value);
           }); // асинхронное событие - генератор ошибки
        }
        return add;
    };
    //callback-last
    add.max = (max, event) => {
        add.maxValue = max;
        add.maxEvent = event;
        return add;
    };
    return add;
};

const maxReached = (err, value) => { //обработчик событий
    if (err) throw err;
    console.log('value: ' + value);
};

try {
    const a1 = adder(10).max(100, maxReached)(-12);
    a1(20);
    a1(50);
    a1(75);
    a1(100);
    a1(-200)(50)(30);
} catch (e) {
    console.log('Never');
}

console.log('end');

























