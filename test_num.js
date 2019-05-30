'use strict';

console.log(1.1, isFinite(true));
console.log(1.2, isFinite('true')); //является NaN
console.log(2.1, isFinite(false));
console.log(2.2, isFinite('false'));
console.log(3.1, isFinite(null));
console.log(3.2, isFinite('null'));
console.log(4.1, isFinite(NaN));
console.log(4.2, isFinite('NaN'));
console.log(5.1, isFinite(Infinity));
console.log(5.2, isFinite('Infinity'));
console.log(6.1, isFinite(-Infinity));
console.log(6.2, isFinite(''));

console.log(parseFloat('Infinity'));
console.log(parseFloat(Infinity));
console.log(parseInt('Infinity'));
console.log(parseInt(Infinity));

console.log(parseFloat('true'));
console.log(parseFloat(null));
console.log(parseInt('null'));
console.log(parseInt(null));

console.log(+null);

console.log(6.2, isNaN(''));

console.log(parseFloat(' '));
console.log(parseInt(' '));
