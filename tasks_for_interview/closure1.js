'use strict';
/*
const hash = () => {
    const data = {};
    let counter = 0;
    return (key, value) => {
        data[key] = value;
        counter++;
        console.dir({counter});
        return data;
    };
};

const h1 = hash();
h1('name', 'Marcus');
h1('city', 'Roma');
const obj1 = h1('born', 121);
console.dir({ obj1 });
*/

//primer 2

const add = x => y => {
    const z = x+y;
    console.log(x + '+' + y + "=" + z);
    return z;
};

const res = add(3)(6);
console.log(res);

//closure-recursive

// const add = x => y => {
//     const z = x+y;
//     console.log(x + '+' + y + "=" + z);
//     return add(z);
// };
//
// // const a1 = add(5);
// // const a2 = a1(2);
// // const a3 = a2(3);
// // const a4 = a1(1);
// // const a5 = a2(10);
// // console.log(a1, a2, a3, a4, a5);
//
// const res = add(1)(2)(8)(8);
// console.log(res);


