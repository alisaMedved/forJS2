'use strict';

function fib(n) {
    let a0 = 0;
    let a1 = 1;
    for (let i = 0; i < n; i++) {
        let a2 = a0 + a1;
        a0 = a1;
        a1 = a2;
    }
    return a0;
}

console.log(fib(77));

function bine(l) {
    let ss = +Math.sqrt(5).toFixed(1);
    let a = Math.round((Math.pow((1+ ss)/2, l))/ss);
    console.log(ss + "       " + a)
};

console.log(bine(77));

let ll = 0.2;
console.log(ll);
let i = 0;
while (i !== 10) {
  i = i + ll;
  i = +i.toFixed(1);
  console.log(i);
};

let d = 6.35.toFixed(20);
console.log(d);




