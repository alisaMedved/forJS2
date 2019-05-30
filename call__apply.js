'use strict';

const obj = {
    name: 1,
    born: 20,
};

const mas = [3, 5];

function f1(a, b) {
    let c = this.born;
    const sum = a + b + c;
    console.log(sum);
}

f1.call(obj, 3, 5);
f1.apply(obj, mas);



