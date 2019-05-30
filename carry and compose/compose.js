'use strict';

//через reduce

// const compose = (f1, f2) => x => f2(f1(x)); //1 arg, 2 func

// const compose = (f1, f2) => (...args) => f2(f1(...args));

// const compose = (...fns) => (...args) => (
//     fns.reverse().reduce((args, fn) => [fn(...args)], args) // args = fn(...args)
//                                                     // возвращает
// );

// через итератор

// const compose = (...fns) => (...args) => {
//     if (fns.length === 0) return args[0];
//
//     let res = fns[0](...args);
//     for (let i = 1; i < fns.length; i++) {
//         res = fns[i](res);
//     }
//     return res;
// };

// через recursive

const compose = (...fns) => (...args) => {
    if (fns.length === 0) return args[0];
    const fn = fns.shift();
    const res = fn(...args);
    if (fns.length === 0) return res;
    return compose(...fns)(res);
};

const f1 = (x) => x*2;
const f2 = x => x+3;
const f3 = x => x+100;

const osn = compose(f1, f2, f3);
console.log(osn(2));



