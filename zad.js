'use strict';

function makeBuffer() {
    let mas = "";
    function f(a) {
        if (arguments.length !== 0) {
            mas += a;
        }
        else {
            return mas;
        }
        }
    f.clear = function() {
       mas = "";
    };
    return f;
    }

const buffer = makeBuffer();

buffer("Тест");
buffer(" тебя не съест ");
console.log( buffer() ); // Тест тебя не съест

buffer.clear();

console.log( 'meow' + buffer() ); // ""