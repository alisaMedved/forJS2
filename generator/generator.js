'use strict';

// генератор через function declaration

function* genFn(x) {
    yield (x * 2);     // генераторы несколько раз возвращают значение через yield и лишь последний через return
    return (x * 3);
}

console.log(genFn);
console.log(genFn.toString());                  // у генераторов есть метод string прям как у функции
console.log(typeof genFn);                      // typeof определяет генераторы как function
const fnProto = Object.getPrototypeOf(genFn);
console.log(fnProto.constructor.name);          // предсказуемо GeneratorFunction

console.log(genFn(5));                      // Object [Generator] {}
console.log(typeof genFn(5));               // object
console.log(genFn(5).toString());           //
const genProto = Object.getPrototypeOf(genFn(5));
console.log(genProto);
console.log(genProto[Symbol.iterator]);             // есть иттератор
console.log(genFn(5).next());
console.log(genFn(5).next().value, genFn(5).next().value);




// генератор через динамический метод class

class Multiplier {
    constructor(k) {
        this.value = k;
    }
    * genMethod(a) {
        this.value = a * this.value;
        return a * this.value;
    }
}

// генератор через метод объекта

const m2 = {
    value: 2,

    * genMethod(a) {
        yield this.value;
        this.value = this.value * a;
        return this.value;
    }
};

function genFnY(x) {
    return (x * 3);
}
