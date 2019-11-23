'use strict';

// функтор через прототип функции

// function Maybe(x) {
//     this.x = x;
// }
// // Maybe.prototype.map = function(fn) {
// //     if (this.x && fn) {
// //         return new Maybe(fn(this.x));
// //     } else {
// //         return new Maybe(null);
// //     }
// // };
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

// функтор через рекурсивное замыкание

// function maybe(x) {
//     return function(fn) {
//         if (x && fn) {
//             return maybe(fn(x));
//         } else {
//             return maybe(null);
//         }
//     };
// }
// const maybe = x => fn => maybe(x && fn ? fn(x) : null);
// maybe(5)()(console.log);
// maybe(5)(x => x*2)(x => ++ x)(console.log);

// аппликативный функтор через прототип функции

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

// function Maybe(x) {                                     // аппликативный функтор
//     this.x = x;
// }
//
// Maybe.prototype.map = function(fn) {                     // метод аппликативного функтора map -
//     const res = (this.x && fn) ? fn(this.x) : null;      // применяет предоставленную функцию к своему значению
//     return res instanceof Maybe ? res : new Maybe(res);  // и запаковывает результат в новый функтор
// };                                                      //не будет двойного оборачивания
//
// Maybe.prototype.ap = function(functor) {                // метод аппликативного функтора ap -
//   return this.map(val => functor.map(f => f(val)));     // распаковывает функциюиз другого функтора
// };                                                      // и применяет ее к своему значению
//
// const a = new Maybe(5);
// const f1 = new Maybe(x => x * 2);
// const f2 = new Maybe(x => ++x);
// a.ap(f1).ap(f2).map(console.log);

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

const fp = {};

fp.mapNull = (fn, x) => (x ? fn(x) : null);

fp.maybe = x => {                                       // монада
    const map = fn => fp.maybe(fp.mapNull(fn, x));      // метод монады map для отображения через другие функции
    map.ap = fnA => fnA(fn => fp.mapNull(fn, x));       //для применения функции других функторов
    map.chain = fnM => fnM(x);                          // для постороения цепочек
    return map;
};

fp.maybe(5)(x => x * 2)(x => ++x)(console.log);
fp.maybe(5)(x => x * 2).ap(fp.maybe(x => ++x))(console.log);
fp.maybe(5).chain(x => fp.maybe(x * 2))(x => ++x)(console.log);


// Функциональный объект

/**
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

// function Counter() {}
//
// const counter = initial => {
//     const f = val => {
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
//     if (event) event.push(callback);
//     else this.events[n] = [callback];
//     return this(0);
// };
//
// // Usage
//
// const c = counter(10);
// c.on(5, val => console.log('Counter > 5, value:', val));
// c.on(25, val => console.log('Counter > 25, value:', val));
// c(5);
// setTimeout(() => c(15), 100);

// второй функциональный объект  прекрасная реализация + удивительно быстрая

function Collector() {}

const collect = expected => {
    const collector = (key, value) => {                   // [строка1] за счет привязывания expected с помощью assign
        if (collector.finished) return collector;        // мы игнорим строки 1-2 при просто тупо добавлении
        collector.count++;                                // новых полей data
        collector.data[key] = value;
        if (value instanceof Error) {
            collector.callback(value, collector.data);
            return collector;
        }
        if (collector.expected === collector.count) {
            collector.callback(null, collector.data);
        }
        return collector;
    };                                                  // [строка 2]

    const fields = {
        count: 0,
        expected,
        data: {},
        callback: null,
        finished: false
    };

    Object.setPrototypeOf(collector, Collector.prototype);
    return Object.assign(collector, fields);
};

Collector.prototype.done = function(callback) {
    this.callback = callback;
    return this;
};

// Usage

const dc = collect(4).done((err, data) => {
    console.log('Done callback ');
    console.dir({ err, data });
});

dc('key1', 'value1');

setTimeout(() => {
    dc('key2', 'value2');
}, 100);

setImmediate(() => {
    dc('key3', 'value3');
});

dc('key4', 'value4');
dc('key5', 'value5');

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


