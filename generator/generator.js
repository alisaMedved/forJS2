// // // 'use strict';
// // //
// // // // генератор через function declaration
// // //
// // // // function* genFn(x) {
// // // //     yield (x * 2);     // генераторы несколько раз возвращают значение через yield и лишь последний через return
// // // //     return (x * 3);
// // // // }
// // // //
// // // // console.log(genFn);
// // // // console.log(genFn.toString());                  // у генераторов есть метод string прям как у функции
// // // // console.log(typeof genFn);                      // typeof определяет генераторы как function
// // // // const fnProto = Object.getPrototypeOf(genFn);
// // // // console.log(fnProto.constructor.name);          // предсказуемо GeneratorFunction
// // // //
// // // // console.log(genFn(5));                      // Object [Generator] {}
// // // // console.log(typeof genFn(5));               // object
// // // // console.log(genFn(5).toString());           //
// // // // const genProto = Object.getPrototypeOf(genFn(5));
// // // // console.log(genProto);
// // // // console.log(genProto[Symbol.iterator]);             // есть иттератор
// // // // console.log(genFn(5).next());
// // // // console.log(genFn(5).next().value, genFn(5).next().value);
// // // //
// // // //
// // // //
// // // //
// // // // // генератор через динамический метод class
// // // //
// // // // class Multiplier {
// // // //     constructor(k) {
// // // //         this.value = k;
// // // //     }
// // // //     * genMethod(a) {
// // // //         this.value = a * this.value;
// // // //         return a * this.value;
// // // //     }
// // // // }
// // // //
// // // // // генератор через метод объекта
// // // //
// // // // const m2 = {
// // // //     value: 2,
// // // //
// // // //     * genMethod(a) {
// // // //         yield this.value;
// // // //         this.value = this.value * a;
// // // //         return this.value;
// // // //     }
// // // // };
// // // //
// // // // function genFnY(x) {
// // // //     return (x * 3);
// // // // }
// // //
// // // // function* counter(begin, end, delta) {
// // // //     let value = begin;
// // // //     while (end > value) {
// // // //       value += delta;
// // // //         if (value > end) return;
// // // //       yield value;
// // // //     }
// // // // }
// // // //
// // // // function* counter(begin, end, delta) {
// // // //     let value = begin;
// // // //     while (end > value) {
// // // //         value += delta;
// // // //         // если элемент даже не последний и- вернет done: true потому что вернут через return
// // // //         if (value === 24) return value;
// // // //         yield value;
// // // //     }
// // // // }
// // // //
// // // // const c = counter(0, 30, 12); //Object [Generator] {},  - иттератор
// // // // const val1 = c.next();
// // // // const val2 = c.next();
// // // // const val3 = c.next();
// // // // const val4 = c.next();
// // // // console.log({c, val1, val2, val3, val4});
// // //
// // // // function* ids(...args) {
// // // //     let i = 0;
// // // //     while (args.length > i) {
// // // //         // не путай ++ это же пост операция
// // // //         const id = args[i++];
// // // //         if (id === undefined) return;
// // // //         yield id;
// // // //     }
// // // // }
// // // //
// // // // const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
// // // // let val;
// // // // do {
// // // //     val = id.next();
// // // //     console.log({ val });
// // // // } while (!val.done);
// // //
// // // // function* ids(...args) {
// // // //     let i = 0;
// // // //     while (args.length > i) {
// // // //         const id = args[i++];
// // // //         if (id === undefined) return;
// // // //         yield id;
// // // //     }
// // // // }
// // // //
// // // // // мы можем иттерироваться по иттератору циклом for of
// // // // const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
// // // // здесь ясно дело не будет возвращаться объект done value какой возвращает иттератор
// // // // ибо аод капотом for of вытаскивает для нас чистое value
// // // // for (const val of id) {
// // // //     console.log({ val });
// // // // }
// // //
// // // // function* ids(...args) {
// // // //     let i = 0;
// // // //     while (args.length > i) {
// // // //         const id = args[i++];
// // // //         if (id === undefined) return;
// // // //         yield id;
// // // //     }
// // // // }
// // // //
// // // // const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
// // // // // спред оператор тот же эффект что и for of
// // // // console.log(...id);
// // //
// // //
// // // // function* counter(begin, end, delta) {
// // // //     let value = begin;
// // // //     while (end > value) {
// // // //         value += delta;
// // // //         const back = yield value;
// // // //         if (back) value += back;
// // // //         console.log({ back, value });
// // // //     }
// // // // }
// // // //
// // // // const c = counter(0, 30, 12);
// // // // const val1 = c.next();
// // // // const val2 = c.next();
// // // // const val3 = c.next(150);
// // // // const val4 = c.next();
// // // // console.log({ c, val1, val2, val3, val4 });
// // //
// // //
// // // // function* counter(begin, end, delta) {
// // // //     let value = begin;
// // // //     while (end > value) {
// // // //         value += delta;
// // // //         console.log({ value });
// // // //         yield value;
// // // //     }
// // // // }
// // // //
// // // // const c = counter(0, 30, 12);
// // // // const val1 = c.next();
// // // // const val2 = c.next();
// // // // const val3 = c.next(150);
// // // // const val4 = c.next();
// // // // console.log({ c, val1, val2, val3, val4 });
// // //
// // //
// // // // из генератора можно возвращать и не итератор - а любой иттерируемый - например массив или set - хеш мапу и так далее
// // // // главное написать yield*
// // // // вернее вернется иттератор конткретно этого иттерируемого
// // //
// // // // function* genFn() {
// // // //     yield* [10, 20, 30];
// // // //     //yield* new Set([10, 20, 30]);
// // // // }
// // // //
// // // // const c = genFn();
// // // // const val1 = c.next();
// // // // const val2 = c.next();
// // // // const val3 = c.next();
// // // // const val4 = c.next();
// // // // console.log({ c, val1, val2, val3, val4 });
// // //
// // // // вот этот генератор вернет иттератор эдакого массива (но это не массив) 10 20 30
// // // // просто эффект тот же что и с массивом
// // // // function* gen1() {
// // // //     yield 10;
// // // //     yield 20;
// // // //     yield 30;
// // // // }
// // // //
// // // // // вот этот генератор вернет иттератор конкретного массива [10 20 30 ]
// // // // function* gen3() {
// // // //     yield* [10, 20, 30];
// // // // }
// // // //
// // // // function* gen2() {
// // // //     yield 40;
// // // //     yield 50;
// // // //     yield 60;
// // // // }
// // // //
// // // // // тупо возвращает то что возвращают генераторы
// // // // function* genFn() {
// // // //     yield* gen1();
// // // //     yield* gen2();
// // // // }
// // // //
// // // // console.log('[...genFn()] =', genFn().next());
// // //
// // // // так Тимур сказал что методы у генераторов return throw ненужные, но что они делают  рассказал
// // //
// // // // function* genFn() {
// // // //     yield 10;
// // // //     yield 20;
// // // //     yield 30;
// // // // }
// // // //
// // // // {
// // // //     const g = genFn();
// // // //     const val1 = g.next();
// // // //     const val2 = g.next();
// // // //     const val3 = g.next();
// // // //     // также как yield только return и после него yield будет возвращать done: true value: undefined
// // // //     const val4 = g.return(40);
// // // //     console.log({ val1, val2, val3, val4 });
// // // // }
// // // //
// // // // {
// // // //     const g = genFn();
// // // //     const val1 = g.next();
// // // //     const val2 = g.return(40);
// // // //     const val3 = g.next();
// // // //     const val4 = g.return(50);
// // // //     console.log({ val1, val2, val3, val4 });
// // // // }
// // //
// // // // а вот метод throw
// // //
// // // function* genFn() {
// // //     try {
// // //         yield 10;
// // //     } catch (err) {
// // //         console.error('intercepted', err);
// // //     }
// // //     try {
// // //         yield 20;
// // //     } catch (err) {
// // //         console.error('intercepted', err);
// // //     }
// // //     try {
// // //         yield 30;
// // //     } catch (err) {
// // //         // в первые вижу что с консоль так можно - прикольно
// // //         console.error('intercepted', err);
// // //     }
// // // }
// // //
// // // try {
// // //     const g = genFn();
// // //     const val1 = g.next();
// // //     const val2 = g.next();
// // //     const val3 = g.next();
// // //     const val4 = g.throw('Error message');
// // //     console.log({ val1, val2, val3, val4 });
// // // } catch (err) {
// // //     console.error(err);
// // // }
// // //
// // // try {
// // //     const g = genFn();
// // //     const val1 = g.next();
// // //     const val2 = g.throw('Error message 1');
// // //     const val3 = g.next();
// // //     const val4 = g.throw('Error message 2');
// // //     console.log({ val1, val2, val3, val4 });
// // // } catch (err) {
// // //     console.error(err);
// // // }
// // //
// // // // Синхронный генератор - это функция которая может несколько раз возвращать значение,
// // // // до return - при return  она вернет значение в последний раз - а если вызвать результат функции через next
// // // // выдасть то значение на котором сейчас иттерация - и до return хранит в себе значение
// // // // вообще вместо значение - я поставила бы иттератор
// // //
// // // // https://youtu.be/kvNm9D32s8s?list=PLHhi8ymDMrQZad6JDh6HRzY1Wz5WB34w0&t=1821
// //
// //
// // class Multiplier {
// //     constructor(k) {
// //         this.value = k;
// //     }
// //
// //     * genMethod(a) {
// //         yield this.value;
// //         this.value = this.value * a;
// //         return this.value;
// //     }
// // }
// //
// // const m1 = new Multiplier(2);
// // const m2 = m1.genMethod(5);
// // console.log('m1.genMethod(5).next() =', m2.next());
// // console.log('m1.genMethod(5).next() =', m2.next());
//
// function* counter(begin, end, delta) {
//     let value = begin;
//     while (end > value) {
//         value += delta;
//         console.log({valueBefore: value });
//         const back = yield value;
//         console.log({backBefore: back });
//         if (back) value += back;
//         console.log({value, back });
//     }
// }
//
// const c = counter(0, 30, 12);
// const val1 = c.next();
// const val2 = c.next();
// const val3 = c.next(150);
// const val4 = c.next();
// // console.log({ c, val1, val2, val3, val4 });

// можно возвращать не просто значение а иттерируемый объект - yeld*
// function* genFn() {
//     yield* [10, 20, 30];
//     //yield* new Set([10, 20, 30]);
// }
//
// const c = genFn();
// const val1 = c.next();
// const val2 = c.next();
// const val3 = c.next();
// const val4 = c.next();
// console.log({ c, val1, val2, val3, val4 });
//
// // можно возвращать сам генератор
// function* gen1() {
//     yield 10;
//     yield 20;
//     yield 30;
// }
//
// function* gen2() {
//     yield 40;
//     yield 50;
//     yield 60;
// }
//
// function* genFn() {
//     yield* gen1();
//     yield* gen2();
// }
// // тупо склейка
// console.log('[...genFn()] =', [...genFn()]);
//
// // можно возврвщать  значение в генератор и  с помощью  return
// function* genFn() {
//     yield 10;
//     yield 20;
//     yield 30;
// }
// {
//     const g = genFn();
//     const val1 = g.next();
//     const val2 = g.next();
//     const val3 = g.next();
//     const val4 = g.return(40);
//     console.log({ val1, val2, val3, val4 });
// }
//
// {
//     const g = genFn();
//     const val1 = g.next();
//     const val2 = g.return(40);
//     const val3 = g.next();
//     const val4 = g.return(50);
//     console.log({ val1, val2, val3, val4 });
// }

//

//
// function* genFn() {
//     try {
//         yield 10;
//     } catch (err) {
//         console.error('intercepted', err);
//     }
//     try {
//         yield 20;
//     } catch (err) {
//         console.error('intercepted', err);
//     }
//     try {
//         yield 30;
//     } catch (err) {
//         console.error('intercepted', err);
//     }
// }
//
// try {
//     const g = genFn();
//     // const val1 = g.next();
//     // const val2 = g.next();
//     // const val3 = g.next();
//     const val4 = g.throw('Error message');
//     console.log({ val1, val2, val3, val4 });
// } catch (err) {
//     console.error(err);
// }
//
// try {
//     const g = genFn();
//     const val1 = g.next();
//     const val2 = g.throw('Error message 1');
//     const val3 = g.next();
//     const val4 = g.throw('Error message 2');
//     console.log({ val1, val2, val3, val4 });
// } catch (err) {
//     console.error(err);
// }

// ассинхронные генераторы

// const asyncGenFn2 = async function* (x) {
// return x * 2;
// };
//
// async function* asyncGenFn5(x) {
//     return x * 2;
// }
// asyncIterator

//AsyncGeneratorFunction
// object AsyncGenerator
// function* genFn(x) {
//     yield x * 2;
//     return x * 3;
// }
//
// async function* asyncGenFn(x) {
//     yield x * 2;
//     return x * 3;
// }
//
// const asyncGenFn2 = async function* (x) {
//     yield x * 2;
//     return x * 3;
// };
//
// console.log('asyncGenFn =', [asyncGenFn]);
// console.log('asyncGenFn.toString() =', [asyncGenFn.toString()]);
// console.log('typeof asyncGenFn =', typeof asyncGenFn);
// const fnProto = Object.getPrototypeOf(asyncGenFn);
// console.log('fnProto.constructor.name =', fnProto.constructor.name);
//
// console.log('typeof asyncGenFn(5) =', typeof asyncGenFn(5));
// console.log('asyncGenFn(5).toString() =', asyncGenFn(5).toString());
// const genProto = Object.getPrototypeOf(asyncGenFn(5));
// console.log('genProto =', genProto);
// console.log('genProto[Symbol.asyncIterator] =', genProto[Symbol.asyncIterator]);
//
// console.log('asyncGenFn(5) =', asyncGenFn(5));
// // ассинхронный генератор при next возвращает нам промис в состоянии пендинг
// console.log('asyncGenFn(5).next() =', asyncGenFn(5).next());
// console.log('asyncGenFn(5).next().value =', asyncGenFn(5).next().value);

// class Multiplier {
//     constructor(k) {
//         this.value = k;
//     }
//
//     async* asyncGenMethod(a) {
//         yield this.value;
//         this.value = this.value * a;
//         return this.value;
//     }
// }
//
// const obj1 = new Multiplier(2);
// console.log('obj1 =', obj1);
// console.log('obj1.asyncGenMethod(5) =', obj1.asyncGenMethod(5));
// console.log('obj1.asyncGenMethod(5).next() =', obj1.asyncGenMethod(5).next());
//
// const p = obj1.asyncGenMethod(5).next();
// p.then(console.log).then(console.log);

// также можно и у объектов
// const obj1 = {
//     value: 2,
//     async* asyncGenMethod(a) {
//         yield this.value;
//         this.value = this.value * a;
//         return this.value;
//     }
// };
//
// console.log('obj1 =', obj1);
// console.log('obj1.asyncGenMethod(5) =', obj1.asyncGenMethod(5));
// console.log('obj1.asyncGenMethod(5).next() =', obj1.asyncGenMethod(5).next());

// obj1.asyncGenMethod(5).next().then(console.log);

// а вот уже с yeld пример
//
// async function* counter(begin, end, delta) {
//     let value = begin;
//     let nextValue = begin + delta;
//     while (true) {
//         value = nextValue;
//         nextValue += delta;
//         if (nextValue > end) return value;
//         else yield value;
//     }
// }
//
// const c = counter(0, 30, 12);
// console.log(c);
// c.next().then(console.log);
// c.next().then(console.log);
// c.next().then(console.log);
// c.next().then(console.log);

// а вот тут прикольно - дождались - await как замена then
// async function* ids(...args) {
//     let i = 0;
//     while (args.length > i) {
//         const id = args[i++];
//         if (id === undefined) return;
//         yield id;
//     }
// }
//
// (async () => {
//     const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
//     for await (const val of id) {
//         console.log({ val });
//     }
// })();

// то же самое только с do while

// async function* ids(...args) {
//     let i = 0;
//     while (args.length > i) {
//         const id = args[i++];
//         if (id === undefined) return;
//         yield id;
//     }
// }
//
// (async () => {
//     const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
//     let val;
//     do {
//         val = await id.next();
//         console.log({ val });
//     } while (!val.done);
// })();


// спред оператор тут не получится - вместо него promise.all

// async function* ids(...args) {
//     let i = 0;
//     while (args.length > i) {
//         const id = args[i++];
//         if (id === undefined) return;
//         yield id;
//     }
// }
//
// (async () => {
//     const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
//     // console.log([...id]);
//     // console.log(await [...id]);
//     // console.log([await ...id]);
//     // console.log([...await id]);
//     Promise
//         .all([id.next(), id.next(), id.next(), id.next(), id.next(), id.next()])
//         .then(console.log);
// })();

// можно конечно ресолвить промисы внутри неассинхронного генератора
// еще одна обработка ассинхронных штук генераторами

// function* ids(...args) {
//     let i = 0;
//     while (args.length > i) {
//         const id = args[i++];
//         if (id === undefined) return Promise.resolve(-1);
//         yield Promise.resolve(id);
//     }
// }
//
// const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
// Promise.all([...id]).then(console.log);

// можно в yield возвращать значение
// async function* counter(begin, end, delta) {
//     let value = begin;
//     let nextValue = begin + delta;
//     while (true) {
//         value = nextValue;
//         nextValue += delta;
//         if (nextValue > end) return value;
//         const back = yield value;
//         if (back) {
//             value += back;
//             nextValue += back;
//             if (nextValue > end) return;
//         }
//     }
// }
//
// const c = counter(0, 180, 12);
// c.next().then(console.log);
// c.next().then(console.log);
// c.next(150).then(console.log);
// c.next().then(console.log);


// а вот здесь интересно что будет если возвращать иттерируемый тип данных

// async function* genFn() {
//     yield* [10, 20, 30];
//     //yield* new Set([10, 20, 30]);
// }
//
// (async () => {
//     const c = genFn();
//     c.next().then(console.log);
//     c.next().then(console.log);
//     c.next().then(console.log);
//     c.next().then(console.log);
// })();

// главное помнить никаких next().value ассинхронные возвращают не объект итератора а промис


// async function* gen1() {
//     yield 10;
//     yield 20;
//     yield 30;
// }
//
// async function* gen2() {
//     yield 40;
//     yield 50;
//     yield 60;
// }
//
// async function* genFn() {
//     yield* gen1();
//     yield* gen2();
// }
//
//
// // еще одна приятная вещь - await промис замена promise.then
// // одна беда тобы пользоваться await приходится вызыать async да еще и в стиле IFFE дабы не городить вызов и второй async
// (async () => {
//     const c = genFn();
//     const val1 = await c.next();
//     const val2 = await c.next();
//     const val3 = await c.next();
//     const val4 = await c.next();
//     const val5 = await c.next();
//     const val6 = await c.next();
//     const val7 = await c.next();
//     console.log({ val1, val2, val3, val4, val5, val6, val7 });
// })();

// есть таакже методы throw и return

function* genFn() {
    try {
        // yield 10;
        // а вот и полезная вещь throw - можно выкидывать ошибу в теле самого генератора - с учетом того что
        // в ассинхронном генераторе возвращают промис и делают ассинхронные вещи это может быть полезным
        throw('Error mew');
    } catch (err) {
        console.error('intercepted', err);
    }
    try {
        yield 20;
    } catch (err) {
        console.error('intercepted', err);
    }
    try {
        yield 30;
    } catch (err) {
        console.error('intercepted', err);
    }
}

// try {
//     const g = genFn();
//     const val1 = g.next();
//     const val2 = g.next();
//     const val3 = g.next();
//     const val4 = g.throw('Error message');
//     console.log({ val1, val2, val3, val4 });
// } catch (err) {
//     console.error(err);
// }


// что интересно в генераторах так это то что выполнение генератора не прерывается throw
// try {
//     const g = genFn();
//     const val1 = g.next();
//     const val2 = g.throw('Error message 1');
//     const val3 = g.next();
//     const val4 = g.throw('Error message 2');
//     console.log({ val1, val2, val3, val4 });
// } catch (err) {
//     console.error(err);
// }

// но вообще не являются ли ассинхронные генераторы излишеством...

// теперь немножко про иттераторы

// const iterable = [0, 1, 2];
//
// // заметь как необычно вызываем поле Symbol  - да это один из специальных случаев оговоренных в JS
// // Symbol.iterator - Метод, возвращающий итератор по умолчанию для объекта. Используется конструкцией for...of.
// const iterator = iterable[Symbol.iterator]();
// const step1 = iterator.next();
// const step2 = iterator.next();
// const step3 = iterator.next();
// const step4 = iterator.next();
// console.log({ step1, step2, step3, step4 });
//
// for (const step of iterable) {
//     console.log({ step });
// }

// а вот и вся соль

// const gen = function* () {
//     let i = 0;
//     while (true) {
//         if (i >= 3) return;
//         yield i++;
//     }
// };
//
// // Так что же нам возвращает синхронный генератор - тип данных Object Generator, который является иттерируемым типом данных.
// {
//     const iterable = gen();
//     const iterator = iterable[Symbol.iterator]();
//     const step1 = iterator.next();
//     const step2 = iterator.next();
//     const step3 = iterator.next();
//     const step4 = iterator.next();
//     console.log({ step1, step2, step3, step4 });
// }
//
// {
//     const iterable = gen();
//     for (const step of iterable) {
//         console.log({ step });
//     }
// }
//
// {
//     const iterable = gen();
//     console.log({ steps: [...iterable] });
// }
//
// console.log({ steps: [...iterable] });


// возвращаем из генератора иттерируемый тип данных - он и так и сяк иттерируемый
// const gen = function* () {
//     yield* [0, 1, 2];
// };
//
// // а зачеем изоляты - лень было новые названия придумывать
// {
//     const iterable = gen();
//     const iterator = iterable[Symbol.iterator]();
//     const step1 = iterator.next();
//     const step2 = iterator.next();
//     const step3 = iterator.next();
//     const step4 = iterator.next();
//     console.log({ step1, step2, step3, step4 });
// }
//
// {
//     const iterable = gen();
//     for (const step of iterable) {
//         console.log({ step });
//     }
// }
//
// {
//     console.log({ steps: [...gen()] });
// }

// ассинхроные иттераторы
//
// const asyncIterator = {
//     counter: 0,
//     async next() {
//         return {
//             value: this.counter++, // current value
//             done: this.counter > 3 // boolean
//         };
//     }
// };
//
// const step1 = asyncIterator.next();
// const step2 = asyncIterator.next();
// const step3 = asyncIterator.next();
// const step4 = asyncIterator.next();
// console.log({ step1, step2, step3, step4 });

// ассинхронный итератор хранится в сивлоном поле asyncIterator
// метод next является ассинхронной функцией - возвращает промис,
// который когда зарезолвится выдает объект иттератора


// хороший пример здесь

const iterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        const iterator = {
            async next() {
                return {
                    value: i++,
                    done: i > 3
                };
            }
        };
        return iterator;
    }
};

// Usage

const iterator = iterable[Symbol.asyncIterator]();
const step1 = iterator.next();
const step2 = iterator.next();
const step3 = iterator.next();
const step4 = iterator.next();
console.log({ step1, step2, step3, step4 });

// так как возвращается промис то его обрабатывают не циклом for of
// а for await
(async () => {
    for await (const step of iterable) {
        console.log({ step });
    }
})();

// да да верно по тому что возращает ассинхронный генератор иттерируются for await

const gen = async function* () {
    let i = 0;
    while (true) {
        if (i >= 3) return;
        yield i++;
    }
};

{
    const iterable = gen();
    const iterator = iterable[Symbol.asyncIterator]();
    const step1 = iterator.next();
    const step2 = iterator.next();
    const step3 = iterator.next();
    const step4 = iterator.next();

    // по тому что возвр-ет асинх генератор можно иттерироваться с помощбю Promise all then
    Promise.all([step1, step2, step3, step4]).then(steps => {
        console.log({ steps });
    });
}

// а можно и с помощью for await
(async () => {
    const iterable = gen();
    for await (const step of iterable) {
        console.log({ step });
    }
})();

    // и наконец последнее

// возвращает промис что резолвится одномеркой,
// возвращает промис что резолвится двойкой и т.д;
// const gen = async function* () {
//     yield* [0, 1, 2];
// };
//
// {
//     const iterable = gen();
//     const iterator = iterable[Symbol.asyncIterator]();
//     const step1 = iterator.next();
//     const step2 = iterator.next();
//     const step3 = iterator.next();
//     const step4 = iterator.next();
//     Promise.all([step1, step2, step3, step4]).then(steps => {
//         console.log({ steps });
//     });
// }
//
// (async () => {
//     const iterable = gen();
//     for await (const step of iterable) {
//         console.log({ step });
//     }
// })();
