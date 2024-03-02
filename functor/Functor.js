'use strict';

// фуектор можно сделать из класса из мпрототипа из замыкания? Но из класса и прототипа функтор небезопасный
// ведь к его значению может достучаться извне


// функтор через прототип функции

// function Maybe(x) {
//     this.x = x;
// }
// Maybe.prototype.map = function(fn) {
//     if (this.x && fn) {
//         return new Maybe(fn(this.x));
//     } else {
//         return new Maybe(null);
//     }
// };
// Maybe.prototype.map = function(fn) {
//     return new Maybe(this.x && fn ? fn(this.x) : null);
// };
//
// new Maybe(5).map().map(console.log);
// new Maybe(5).map(x => x * 2).map(console.log);  // сработает только это
// new Maybe(null).map(x => x * 2).map(console.log);
//
// console.log(new Maybe(5).map());             // null
// console.log(new Maybe(null).map(x => x * 2));   // null
//
// // функтор через рекурсивное замыкание
//
function maybe(x) {
    return function(fn) {
        if (x && fn) {
            return maybe(fn(x));
        } else {
            return maybe(null);
        }
    };
}
const maybe = x => fn => maybe(x && fn ? fn(x) : null);
maybe(5)()(console.log);
maybe(5)(x => x*2)(x => ++ x)(console.log);

// а вот тут метода нет

// аппликативный функтор через прототип функции
//
// Вообще в js существует apply - это метод прототипа функции (это динамический метод)
// позволяет задать функции контекст this
// коль название apply занято - мы назовем наш метод ap

/** Аппликативный функтор - это такой функтор который умеет распаковать
функтор со значением, распаковать функтор с функцией, применить функцию к значению
и запаковать результат в функтор **/

/**
 Функтор - это контейнер, в котором запаковано значение и эта контейнер умеет
 распаковаться применить к значению функцию и запаковать результат в новый контейнер

 Функтор - это рекурсивное замыкание которое хранит в себе значение -
 мы сделали map - и смапленное значение преобразовали через функцию и
 полученный результат поместили в новое рекурсивное замыкание.
 **/

function Maybe(x) {                                     // аппликативный функтор
    this.x = x;
}

Maybe.prototype.map = function(fn) {                     // метод аппликативного функтора map -
    const res = (this.x && fn) ? fn(this.x) : null;      // применяет предоставленную функцию к своему значению
    return res instanceof Maybe ? res : new Maybe(res);  // и запаковывает результат в новый функтор
};                                                      //не будет двойного оборачивания

Maybe.prototype.ap = function(functor) {                // метод аппликативного функтора ap -
  return this.map(val => functor.map(f => f(val))
  );                                                    // распаковывает функциюиз другого функтора
};                                                      // и применяет ее к своему значению

// добавили метод chain чтобы сделать монаду
Maybe.prototype.ch = function(fn) {
    return fn(this.x);
}

const a = new Maybe(5);
const f1 = new Maybe(x => x * 2);
const f2 = new Maybe(x => ++x);
const f3 = x => new Maybe(x + 3)
a.ap(f1).ap(f2).ch(f3).map(console.log);

// применение монады

const maybe = x => {
    const map = fn => maybe(x ? fn(x) : null);
    map.ap = functor => functor(f => x && f ? f(x) : null);
    map.chain = fn => x ? fn(x) : null;
    return map;
};
//
// // Usage
//
// const config = {
//     coords: {
//         x: 0,
//         y: 5,
//     },
//     velocity: {
//         x: 1,
//         y: 1,
//     },
// };
//
// const addVelocity = velocity => coords => {
//     coords.x += velocity.x;
//     coords.y += velocity.y;
//     return coords;
// };
//
// const coords = maybe(config.coords);
// const velocity = maybe(config.velocity);
//
// coords.ap(velocity(addVelocity)).chain(console.log);

// второй пример применения функтора

// const fp = {};
//
// fp.path = data => (
//     path => (
//         fp.map(path)(path => (
//             path.split('.').reduce(
//                 (prev, key) => (prev[key] || {}),
//                 (data || {})
//             )
//         ))
//     )
// );
//
// fp.map = x => fn => fp.map(x && fn ? fn(x) : null);
//
// // Usage
//
// const fs = require('fs');
//
// const config = {
//     server: {
//         host: {
//             ip: '10.0.0.1',
//             port: 3000
//         },
//         ssl: {
//             key: {
//                 filename: './7-path.js'
//             }
//         }
//     }
// };
//
// // Imperative style
//
// if (
//     config &&
//     config.server &&
//     config.server.ssl &&
//     config.server.ssl.key &&
//     config.server.ssl.key.filename
// ) {
//     const fileName = config.server.ssl.key.filename;
//     fs.readFile(fileName, 'utf8', (err, data) => {
//         if (data) console.log();
//     });
// }
//
// // Functional style
//
// fp.path(config)('server.ssl.key.filename')(
//     file => fs.readFile(file, 'utf8', (err, data) => {
//         fp.map(data)(console.log);
//     })
// );


/**
 Итак функтор - это абстрактная концепция - это функция хранящяя в себе значение
 и имеющая метод map. Метод map применяет предложенную функцию к значению
 хранящемся в функторе и помещает результат в новый функтор

 Функтор - это АК - это рекурсивное замыкание, которое хранит в себе значение
 и предложенную функцию, и возвращает результат применения предложенной функции к значению.
 и помещает результат в новое замыкание путем рекурсивного вызова.

 Аппликативный функтор в отличие от обычного функтора применяет к своему значению функцию,
 запакованную в другой функтор с помощью метода apply и также как обычный функтор
 помещает результат в новый функтор с помощью метода map.

 отображает значение через предложенную функцию

 Монада - аппликативный функтор, который имеет метод map с подметодом chain и с помощью его
 производить чейнинг функторов

 Монада -это АК для построения цепочки контейнеров, связывая их функциями преобразования их значений
 **/

// монада

// const fp = {};
//
// fp.mapNull = (fn, x) => (x ? fn(x) : null);
//
// fp.maybe = x => {                                       // монада
//     const map = fn => fp.maybe(fp.mapNull(fn, x));      // метод монады map для отображения через другие функции
//     map.ap = fnA => fnA(fn => fp.mapNull(fn, x));       //для применения функции других функторов
//     map.chain = fnM => fnM(x);                          // для постороения цепочек
//     return map;
// };
//
// fp.maybe(5)(x => x * 2)(x => ++x)(console.log);
// fp.maybe(5)(x => x * 2).ap(fp.maybe(x => ++x))(console.log);
// fp.maybe(5).chain(x => fp.maybe(x * 2))(x => ++x)(console.log);


/**
 Старые заметки оставлены для истории размышления


 В отличие от функтора функциональный объект посто хранит в себе значение и
 результат применения функции к его значению он не кладет в новый контейнер
 **/

/** Функцилональный объект - это одновременно функция и объект
функцию можно вызвать а у объекта есть методы

Итак функциональный объект - походу это функция с методами и с полями значений
хранящихся в ней. Функциональный объект мы можем вызвать как функцию и присвоить
 таким образом новое значение полю его или изменить его. А также его методы могут реагировать на изменение
 значений его поля и выполнять какие либо колбеки в честь этого или еще чего.
 Но при этом функциональны йобъект не является функтором или монадой так как не имеет
 метоы для чейнинга, а также map, apply.
 **/

// Функциональный объект
//
// function Counter() {}
//
// const counter = initial => {
//     const f = val => {
//         console.log("val ", val);
//         f.count += val;
//         Object.keys(f.events).filter(n => n <= f.count).forEach(n => {
//             f.events[n].forEach(callback => callback(f.count));
//             delete f.events[n];
//         });
//         return f;
//     };
//     Object.setPrototypeOf(f, Counter.prototype);
//     return Object.assign(f, { count: 0, events: {} })(initial);
// };
//
// Counter.prototype.on = function(n, callback) {
//     const event = this.events[n];
//     if (event) {
//         event.push(callback);         // этот блок никогда не исполняется
//         console.log("мы здесь");
//     }
//     else this.events[n] = [callback];
//     // return this(0);               // тупо чтобы показать возможности ФО - и как функцию мол можно вызвать
// };
//
// // Usage
//
// const c = counter(10);
// c.on(5, val => console.log('Counter > 5, value:', val));
// c.on(25, val => console.log('Counter > 25, value:', val));
// c(5);
// setTimeout(() => c(15), 100);
//
// // второй функциональный объект  прекрасная реализация + удивительно быстрая
//
// function Collector() {}
//
// // почему реализация удивительно бстрая если юзаешь ее в чем-то (например в браузере) основанном на движке v8 ?
// // через 2-3 иттерации js понимает что верхний аргумент expected не используется - там нет замыкания
// // вместо замыкания завязка на прототипе
//
// //но интересный вопрос в другом - сама операция setPrototypeOf медленная
//
// const collect = expected => {
//     const collector = (key, value) => {                   // [строка1] за счет привязывания expected с помощью assign
//         if (collector.finished) return collector;        // мы игнорим строки 1-2 при просто тупо добавлении
//         collector.count++;                                // новых полей data
//         collector.data[key] = value;
//         if (value instanceof Error) {
//             collector.callback(value, collector.data);
//             return collector;
//         }
//         if (collector.expected === collector.count) {
//             collector.callback(null, collector.data);
//         }
//         return collector;
//     };                                                  // [строка 2]
//
//     const fields = {
//         count: 0,
//         expected,
//         data: {},
//         callback: null,
//         finished: false
//     };
//
//     Object.setPrototypeOf(collector, Collector.prototype);
//     return Object.assign(collector, fields);
// };
//
// Collector.prototype.done = function(callback) {
//     this.callback = callback;
//     return this;
// };
//
// // Usage
//
// const dc = collect(4).done((err, data) => {
//     console.log('Done callback ');
//     console.dir({ err, data });
// });
//
// dc('key1', 'value1');
//
// setTimeout(() => {
//     dc('key2', 'value2');
// }, 100);
//
// setImmediate(() => {
//     dc('key3', 'value3');
// });
//
// dc('key4', 'value4');
// dc('key5', 'value5');


// важная заметка (напоминание) - вот что выведется - и главный прикол
// сначала все синхронные операции дае написанные позже
// и лишь потом все setImmediate setTimeout
// {
//   key1: 'value1',
//   key4: 'value4',
//   key5: 'value5',
//   key3: 'value3'
// }

/**
 Функциональный объект - это функция в которой хранятся поля значений
 и изменяются путем ее вызова по контракту функции
 и динамические методы которой могут реагировать на изменение этих полей
 *
 */

/**
 Подводим итоги:
ФО - это такая функци которую можно использовать как функцию и у которой есть свои методы

 Функторы - рекурсивные замыкания - это такие контейнеры в которые можно положить значения
 и преобразовать при помощи их метода map

 АФ - функтор у которого есть метод ap (apply) который позволяет
 применить один функтор к значению другого

 Монады - это АФ с методом chain который позволяет реализовывать цепочки вычислений
 *
 */

//__________________________________\
// спустя несколько лет
/**
Функциональный объект -объект функционального типа,
 который является функцией и объектом одновременно.
 Другими словами, функциональный объект может быть вызван,
 как функция и может иметь свойства и методы, как объект.


 Функтор / Functor - это функциональный объект, который хранит защищенное значение и позволяющий
 отобразить это значение в другой функтор через вызов метода map или через функциональный чейнинг

 Реналь сказал что функтор построенный не на замыкании это эндофунктор -
 но об этом лучше на с. не вспоминать

 Апликативный функтор - это функтор с методом apply - благодаря этому методу он может применить к
 своему значению функцию другого функтора и положить результат в новый функтор

 Монада - это апликативный функтор с методом chain
 **/

// ФО через функцию
// const FO = (par) => {
//     this.a = par;
// }
//
// FO.methodFO = function() {
//     console.log(this.a);
// }

// ФО через прототип

function FO () {}

const fo = (par) => {
    const func = (val) => {
        func.count += val;
            Object.keys(func.events).filter(n => n <= func.count).map(el => func.events[el](func.count));
        return func;
    }
    Object.setPrototypeOf(func, FO.prototype);
   return Object.assign(func, {count: 0, events: {}})(par);
}

FO.prototype.on = function(n, callback) {
        this.events[n] = callback;
}

//usage

const example = fo(10);
example.on(5, val => console.log("Счетчик меньше или равен 5, счетчик = ", val));
example(5);
setTimeout(() => example(15), 100);

// ФО через класс





































