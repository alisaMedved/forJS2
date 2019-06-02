'use strict';

// let max = 3;
// let min = 1;
//
// console.log(parseInt(Math.random()*(max - min + 1) + min));
// console.log(Math.floor(Math.random()*(max - min + 1) + min));
// console.log(Math.round(Math.random()*((max + 0.4) - (min - 0.5)) + (min - 0.5)));


const args = [1, 2, 3];
const mas = args.slice(0, args.length-1);

const z = mas => {
    const nov = [];
    for (const i in mas) {
        let el = sum(mas[i]);
        nov.push(el);
    }
    return nov;
};


const sum = (par) => {
     return par + 1;
};

args[args.length-1] = z(mas);
console.log(args);









