'use strict';

// Функция-обертка

// const wrap = fn => {
//     console.log('Wrap function: ', fn.name);
//     return (...args) => {
//         console.log('Called wrapper for: ', fn.name);
//         console.dir({ args });
//         const result = fn(...args);
//         console.log('Ended wrapper for: ', fn.name);
//         console.dir({ result });
//         return result;
//     };
// };
//
// const func = (par1, par2) => {
//     console.dir({ method: {par1, par2} });
//     return [par1, par2];
// };
//
//
// const wrapped = wrap(func);
// wrapped('Uno', 'Due');


// Функция-обертка с обработчиками оборачиваемой функции
// Функция-обертка для синхронных функции

// const wrap = (before, after, fn) => (...args) =>
//     after(...fn(...before(...args)));
//
// const func = (par1, par2) => {
//     console.dir({ method: {par1, par2} });
//     return [par1, par2];
// };
//
// const before = (...args) => {
//     console.log(arguments.length);
//     console.log(before.length);
//     console.log(args);
//     console.log('before');
//     return args;
// };
//
// const after = (...args) => {
//     console.log('after');
//     return args;
// };
//
// const wrapped = wrap(before, after, func);
// wrapped('Uno', 'Due');
//
// console.dir({
//     func: func.length,
//     wrapped: wrapped.length,
// before: before.length,
// });
//
// function.length vs arguments.length
//
// const sum = (...args) => {
//     console.log(args);
//     console.log(arguments.length);
//     console.log(sum.length);
// };
//
// sum(3, 78, 906, 100);

// function.length - кол-во аргументов, ожидаемых функцией
// arguments.length - кол-во фргументов, поступувших в функцию

// Функция -обертка универсальная для функции с колбеком и без,
// для асинхронной и синхорнной функции
//
// здесь представлен чисто принцип универсальной функции-обертки,
// а не ее рабочая программа.
//
// Тимур назвал ее Асинхронная обертка или обертка с колбеками


// const wrapUniver = (before, after, beforeCb, afterCb, fn) => // args -
//                                                             // аргументы fn.
//                                                             // before, after,
//                                                             // beforeCb, afterCb
//                                                             // - обработчики fn.
//     (...args) => {
//     const callback = args[args.length -1]; // последний аргумент fn - колбек,
//                                          // все остальные аргументы fn -
//                                             // аргументы колбека
//     if (typeof callback === "function") {
//         args[length - 1] = (...pars) =>  //аргументы кобека - pars,
//                     // здесь не раскрыто каким образом
//                     // все аргументы fn кроме
//                     // последнего (колбек) копируются в pars.
//            afterCb(callback(...beforeCb(...pars)));
//         }
//         return after(fn(...before(...args)));
//         // таким образом результат колбека войдет в массив args
//         // и будет там наряду с остальными аргументами args (их
//         // мы еще копировали в pars)
//     };

// Функция -обертка универсальная для функции с колбеком и без,
// для асинхронной и синхорнной функции.
// Тимур назвал ее Асинхронная обертка или обертка с колбеками

// (рабочая программа)

// const wrapFunction = fn => {
//     // console.log('Wrap function: ', fn.name);
//     return (...args) => {                           // args - аргументы fn
//       // console.log('Called wrapper for: ', fn.name);
//       console.dir({ args });                //по сути 1 перехват оберткой
//                                             // аргументов fn
//     if (args.length > 0) {
//         const callback = args[args.length - 1]; // последний аргумент fn - колбек,
//                                                 // все остальные аргументы fn -
//                                                 // аргументы колбека
//         if (typeof callback === 'function') {
//                                           // подменяем последний элемент args
//                                         //(подменяем колбек на его результат)
//            args[args.length - 1] = (...args) => {
//                // console.log('Callback: ', fn.name);
//                return callback(...args);
//            };
//         }
//     }
//     // console.log('Call: ', fn.name);
//     console.dir({ args });          //теперь в args нет колбека, там его результат
//     const result = fn(...args);       //пропускаем все args через fn
//     console.log('Ended wrapper for: ', fn.name);
//     console.dir({ result }); //закончилось оборачивание теперь увидим
//                                 // то что делает сама функция
//     return result;
//     };
// };
//
// const cloneInterface = anInterface => { // функция по клонированию объекта
//    const clone = {};        // создаем изначально пустой объект для копии
//    for (const key in anInterface) { //итерируемся по ключам копируемого объекта
//        const fn = anInterface[key];
//        clone[key] = wrapFunction(fn); // в копию мы вкладываем не
//            // просто копии функции исходного объекта,
//            //     а обернутые копии функции
//        }
//    return clone;
// };
//
// /* Что будут представлять из себя обернутые копии функции?
// Все аргументы функции будут пропущены через ее колбек,
// а затем все аргументы функции и результат колбека
//  будут вместе пропущены через саму функцию и вот этот ее результат и будет
//  значением поля копии исходного объекта.
//  */
//
// const interfaceName = {                 // копируемый исходный объект
//     methodName(par1, par2, callback) { // у него есть метод с колбеком
//                                 // этот то метод мы и скопируем и обернем
//         console.dir({method: { par1, par2 } });
//         // callback(null, { field: 'value' });
//     }
// };
//
// const cloned = cloneInterface(interfaceName); // копируем исходный объект
// cloned.methodName('Uno', 'Due', () => {
//     console.log('Fire');
// });

// Обертка-таймер

// const timeout = (msec, fn) => {
//     let timer = setTimeout(() =>{
//         if (timer)
//             console.log('Function timedout'); // Время таймера вышло!
//         timer = null; /* Пора обнулить таймер ибо время когда функция fn
//         может вызываться и
//         выполнятся вышло.
//         Пока существует таймер функцию
//         еще можно вызывать и выполнять.
//         Надо обнулить чтобы настало timedout */
//
//         /* В то же время timedout - старт для выполнения
//         (...args) => {}; поэтому сможет выполнится лишь та функция у которой
//         время когда функция fn может вызываться > времени старта выполнения
//         (...args) => {}
//          */
//
//     }, msec);
//     return (...args) => {
//         if (timer) { /* настало ли время timedout или еще нет ?
//         Раз нет (true)
//         то можем вызывать и выполнять функцию fn(...args) */
//             clearTimeout(timer);
//             timer = null;
//
//             /* Чтобы функцию нельзя было вызвать вновь
//             Новый запуск fn200('second') - создание нового таймера,
//             новое наступление timedout - надо и здесь обнулить
//             и сбросить таймер. */
//
//             return fn(...args);
//         }
//     };
// };
//
// const fn = par => {
//     console.log('Function called, par: ', par);
// };
//
// const fn100 = timeout(100, fn);
// const fn200 = timeout(200, fn);
//
// // fn200('second1');
// setTimeout(() => {
//     fn100('one');
//     fn200('second2'); // новый запуск не сработает
// }, 150);

// Обертка-таймер когда новый запуск сработает
//
// const timeout = (msec, fn) => {
//     let timer = setTimeout(() => {
//         if (timer) console.log('Function timedout');
//         timer = null;
//     }, msec);
//     return (...args) => {
//         if (timer) {
//             clearTimeout(timer); /* отменяет действия ближайшего setTimeout,
//             но не обнуляет ссылку на него
//             и потому при следующем запуске
//             функция находит таймер
//             и (timer) - true */
//
//             // timer = null;  // удаляем эту строку
//
//             return fn(...args);
//         }
//     };
//
// };
//
//
// const fn = par => {
//     console.log('Function called, par:', par);
// };
//
// const fn100 = timeout(100, fn);
// const fn200 = timeout(200, fn);
//
// fn200('second2');
// setTimeout(() => {
//     console.log('call 2');
//     fn100('one');
//     fn200('second2'); // новый запуск сработает
// }, 150);

//Обертка-таймер асинхронная для функции с колбеком - ДЗ 1 СДЕЛАНО

// const timeout = (msec, fn) => {
//     let timer = setTimeout(() => {
//         if (timer) console.log('Function timedout');
//         timer = null;
//     }, msec);
//     return (...args) => {
//         console.log('args до колбека  ' + args);
//         if (timer) {
//             clearTimeout(timer);
//             timer = null;
//
//             if (args.length > 0) {
//                 const callback = args[args.length - 1];
//                 console.log('callback.toString()  ' + callback.toString());
//
//                 if (typeof callback === 'function') {
//                     const mas = args.slice(0, args.length - 1);
//                     const z = mas => {
//                         console.log('mas ' + mas);
//                         return callback(...mas);
//                     };
//                     args[args.length - 1] = z(mas);
//                     console.log('args[args.length - 1]  ' + args[args.length - 1]);
//                 }
//             }
//             console.log('args после колбека  ' + args);
//             return fn(args);
//         }
//     };
// };
//
// const fn = (par, callback) => {
//     console.log('Function called: ', par);
// };
//
// const fn100 = timeout(100, fn);
// const fn200 = timeout(200, fn);
//
// setTimeout(() => {
//     fn100('first', (data) => {
//         console.log('Callback first', data);
//     });
//     fn200('second', (data) => {
//         console.log('Callback second', data);
//         return 'Callback second' + data;
//     });
// }, 150);

// Обертка предотвращающая 2-ой вызов функции

// const once = fn => (...args) => {
//     if (!fn) return;
//     const res = fn(...args);
//     fn = null; // при следуующем вызове !fn - true
//     return res;
// };
//
// const fn = par => {
//     console.log('Function called: ', par);
// };
//
// const f = once(fn);
//
// f('first');
// f('second'); // не сработает

// Обертка предотвращающая n-ый вызов функции

// const limit = (count, fn) => {
//     let counter = 0;
//     return (...args) => {
//         if (counter === count) return;
//         counter++;
//         return fn(...args);
//     };
// };
//
// const fn = par => {
//     console.log('Function called: ', par);
// };
//
// const fn2 = limit(2, fn);
//
// fn2('first');
// fn2('second');
// fn2('third');

// Обертка которая перестает вызывать функцию
// и отменяет дальнейшие вызовы по нашей команде

// const cancelable = fn => {
//     const wrapper = (...args) => {
//         if (fn) return fn(...args);
//     };
//     wrapper.cancel = () => fn = null;
//     return wrapper;
// };
//
// const fn = par => {
//     console.log('Function called, par: ', par);
// };
//
// const f = cancelable(fn);
//
// f('first');
// f.cancel();
// f('second');

// Обертка с методами
// ДЗ 2 - написать метод wrapped.resue - отменяющий действие cancel
// и добавить его сюда
//
// const wrap = fn => {
//     let limit = 0; // если 0 - значит нет ограничении по
//                     // количеству вызова функции fn
//     let counter = 0; // сколько раз вызвали fn
//
//     const wrapper = (...args) => {
//         if (limit && counter === limit) wrapper.cancel(); // приоритет у === выше
//         if (fn) {
//             const res = fn(...args);
//             counter++;
//             return res;
//         }
//     };
//
//     wrapper.cancel = () => {
//         fn = null;
//         return wrapper;
//     };
//
//     wrapper.timeout = msec => {
//        setTimeout(() => {
//            wrapper.cancel();
//        }, msec);
//        return wrapper;
//     }
//
//     wrapper.limit = count => {
//         limit = count;
//         return wrapper;
//     };
//
//     return wrapper;
// };
//
// const fn = par => {
//     console.log('Function called, par: ', par);
// };
//
// const f = wrap(fn).timeout(200).limit(3);
// f('1st');
//
// setTimeout(() => {
//     f('2nd');
//     f('3nd');
//     f.cancel();
//     f('4th');
// }, 150);

// Обертка которая дает вызвать функцию только один раз в течении
// определенного промежутка времени.

    // const throttle = (timeout, fn, ...args) => {
    //     let timer;
    //     let wait = false;
    //     let wrapped = null;
    //
    //     const throttled = (...par) => { // удачный запуск №2 в 200мс начинается!
    //
    //         timer = undefined;
    //         if (wait) wrapped(...par); //все неудачные запуски [50мс...150мс] return wait = true;
    //
    //     };
    //
    //     wrapped = (...par) => { // первый запуск начинается!     //привет, 2 неудачный запуск в 50 мс!
    //         if (!timer) {  // просто let timer; означает undefined
    //
    //             timer = setTimeout(throttled, timeout, ...par); /* постановили
    //             что throttled(...par) запустится только через 200мс - не раньше! */
    //             wait = false;
    //             return fn(...args.concat(par));
    //         } else {  // в запуске в 50мс timer =  setTimeout(throttled, timeout, ...par)
    //             wait = true;
    //         }
    //     };
    //
    //     return wrapped;
    // };
    //
    // const fn = (...args) => {
    //     console.log('Function called, args:', args);
    // };
    //
    // const ft = throttle(200, fn, 'value1');
    //
    // const timer = setInterval(() => {
    //     fn('value2');
    //     ft('value3');
    // }, 50);
    //
    // setTimeout(() => {
    //     clearInterval(timer);
    // }, 2000);


// // Обертка с методами
// // ДЗ 2 - написать метод wrapped.resue - отменяющий действие cancel
// // и добавить его сюда   СДЕЛАНО_1, но СДЕЛАНО_2 лучше.
//
// const wrap = fn => {
//     let limit = 0; // если 0 - значит нет ограничении по
//     // количеству вызова функции fn
//     let counter = 0; // сколько раз вызвали fn
//     let res;
//     let p = false;
//     let t = false;
//
//     const wrapper = (...args) => {
//
//         if (limit && counter === limit) wrapper.cancel(); // приоритет у === выше
//         if (p) {
//             res = undefined;
//         } else {
//             res = fn(...args);
//             counter++;
//         }
//             return res;
//         };
//
//
//     wrapper.cancel = () => {
//         p = true;
//         return wrapper;
//     };
//
//     wrapper.timeout = msec => {
//         setTimeout(() => {
//             wrapper.cancel();
//             t = true;
//         }, msec);
//         return wrapper;
//     };
//
//     wrapper.limit = count => {
//         limit = count;
//         return wrapper;
//     };
//
//     wrapper.resume = () => {
//         (t) ? p = true : p = false;
//         return wrapper;
//     };
//
//     return wrapper;
// };
//
// const fn = par => {
//     console.log('Function called, par: ', par);
// };
//
// const f = wrap(fn).timeout(130).limit(0);
// f('1st');
//
// setTimeout(() => {
//     f('2nd');
//     f('3nd');
//     f.cancel();
//     f('4th');
//     f.resume();
//     f('5th');
// }, 200);


// Обертка с методами
// ДЗ 2 - написать метод wrapped.resume - отменяющий действие cancel
// и добавить его сюда   СДЕЛАНО_2 лучше

// const wrap = fn => {
//     let limit = 0; // если 0 - значит нет ограничении по
//     // количеству вызова функции fn
//     let counter = 0; // сколько раз вызвали fn
//     let func = fn;
//
//     const wrapper = (...args) => {
//         if (!fn) {console.log('jjjj'); return;}       //просто выход из функции
//         if (limit && counter === limit) wrapper.cancel(); // приоритет у === выше
//         else {
//             const res = fn(...args);
//             counter++;
//             return res;
//         }
//     };
//
//     wrapper.cancel = () => {
//         fn = null;
//         return wrapper;
//     };
//
//     wrapper.timeout = msec => {
//         setTimeout(() => {
//             wrapper.cancel();
//             func = null;
//         }, msec);
//         return wrapper;
//     };
//
//     wrapper.limit = count => {
//         limit = count;
//         return wrapper;
//     };
//
//     wrapper.resume = () => {
//        fn = func;
//        return wrapper;
//     };
//
//     return wrapper;
// };
//
// const fn = par => {
//     console.log('Function called, par: ', par);
// };
//
// const f = wrap(fn).timeout(160).limit(4);
// f('1st');
//
// setTimeout(() => {
//     f('2nd');
//     f('3nd');
//     // f.cancel();
//     f.resume();
//     f('4th');
//     f('5th');
// }, 2000);

//

// const wrap = func => {
//     let limit = 0;
//     let counter = 0;
//     let timer = null;
//     let fn = func;
//
//     const wrapper = (...args) => {
//         console.dir({ limit, counter, fn, args });
//         if (!fn) {
//             console.log('fn = null уже!');
//             return;
//         }
//         if (limit && counter === limit) {
//             console.log('Закончился лимит вызовов');
//             limit = 0;
//             counter = 0;
//             wrapper.cancel();
//             return;
//         }
//     const res = fn(...args);
//     counter++;
//     return res;
//     };
//
//     const methods = {
//         cancel() {
//             fn = null;
//             return this;
//         },
//         resume() {
//             if (!fn) fn = func;
//             return this;
//         },
//         timeout(msec) {
//             if (timer) clearTimeout(timer);
//             timer = setTimeout(() => this.cancel(), msec);
//             return this;
//         },
//         limit(count) {
//             limit = count || 0;
//             counter = 0;
//             return this;
//         },
//     };
//
//     return Object.assign(wrapper, methods);
// };

// const fn = par => {
//     console.log('Function called, par:', par);
// };
//
// const f = wrap(fn).timeout(200).limit(3);
// f('1st');
//
// setTimeout(() => {
//     f('2nd');
//     f.cancel();
//     f('3rd');
//     f.resume();
//     f('4th');
//     f.timeout(200);
//     setTimeout(() => {
//         f('5th');
//         setTimeout(() => {
//             f.limit(1);
//             f('6th'); /* при 5th limit: 3, counter: 3, -применили cancel() - fn = null;
//              на момент 6th fn все также оставалась null и не было resue что могла б
//             востановить ссылку fn а counter=1, limit =0; */
//
//             f('7th');
//             f.resume();
//             f('8th'); /* из-за того что функция fn так и не выполнялась то и counter
//               не увеличился и потому к моменту 8 th сохранились counter=1, limit =0; */
//         }, 150);
//     }, 150);
// }, 150);


















































