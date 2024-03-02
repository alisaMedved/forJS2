
/**
 * Итератор / Iterator - интерфейс доступа к элементам коллекции: массива, множества, списка;
 * механизм, который позволяет перемещаться (итерироваться) по элементам коллекции в определённом порядке и делает их доступными.
 * Конкретнее это объект который умеет обращаться к элементам коллекции по одному за раз, при этом отслеживая
 * своё текущее положение внутри этой последовательности.
 *
 * В JavaScript итератор — это объект, который возвращает сам себя, и у которого есть метод next(), который воззвращает объект с двумя полями
 *
 * value — значение текущего элемента коллекции.
 * done — индикатор, указывающий, есть ли ещё в коллекции значения, доступные для перебора.
 *
 * Все встроенные итераторы наследуются от класса Iterator.
 * Класс Iterator предоставляет метод @@iterator, который возвращает сам объект итератора,
 * что делает итератор также итерируемым. Такое замыкание дает возможность использовать вспомогательные
 * методы итератора при работе с ним.
 *
 * Асинхронный итератор - то же самое что и итератор только у него ассинхронный метод next который возвращает
 * промис, который в свою очередь резолвится объектом  с двумя полями value и done.
 *
 * Генератор как итерируемый объект имеет поле Symbol.iterator значением которого является синхронный итератор
 * Асинхронный Генератор как итерируемый ассинхронный объект имеет поле Symbol.asyncIterator значением которого является
 * Асинхронный итератор
 */

// Пример №1: сделаем свой итератор
function makeIterator(array) {
    let nextIndex = 0;
    return {
        next: function () {
           if (nextIndex < array.length) {
               const result = {
                   value: array[nextIndex],
                   done: false
               }
               nextIndex++;
               return result;
           } else {
               return {done: true}
           }
        }
    }
}
const iteratorI = makeIterator(['Hello', 'world'])
console.log(iteratorI.next().value)
// 'Hello'
console.log(iteratorI.next().value)
// 'world'
console.log(iteratorI.next().done)
// true

// Пример №2 Неитерируемые типы данных не могут быть проитерируемы в цикле for of
// - подробнее в generator_and_iterator/for_in_fo_of.js
const Obj = {
    a: 't',
    b: 89,
    c: 7
};

// for (let value of Obj) {
//     console.log(value);
// }
// выдаст Obj is not iterable

for (let value in Obj) {
    console.log(value);
}

// Для неитерируемых структур данных можно создасть свой итератор
// Ну и конечно помним что у типов итерируемых iterator лежит в Symbol.iterator

// Пример №3 Создаем итератор для объекта

const person = {
    name: 'Mark',
    age: 30,
    gender: 'male',
    interests: ['music', 'fishing'],
}


person[Symbol.iterator] = function () {
    const properties = Object.keys(this)
    let count = 0

    return {
        next() {
            if (count < properties.length) {
                const key = properties[count]
                let result = { done: false, value: person[key] }
                count++
                return result
            } else {
                return { done: true }
            }
        },
    }
}

for (let x of person) {
    console.log(x)
    // Mark, 30, male, ['music', 'fishing']
}

// Пример №4 Небольшое отступение: красивое решение Фибоначи через генератор
// Сейчас в mdn описан новый интерфейс new Iterator
// И есть куча экспериментальных технологий, связанных с ним,
// например const seq = fibonacci().drop итд
// в ноде пока не доступно а вот в хроме уже есть
function* fibonacci() {
    let current = 1;
    let next = 1;
    while (true) {
        yield current;
        [current, next] = [next, current + next];
    }
}

const seq = fibonacci();
console.log(seq.next().value); // 1
console.log(seq.next().value); // 1
console.log(seq.next().value); // 2
console.log(seq.next().value); // 3

// Пример №5 Создаем итератор для класса

class Counter {
    begin;
    end;
    step;
    constructor(begin, end, step = 1) {
        this.begin = begin;
        this.end = end;
        this.step = step;
    }

    [Symbol.iterator] () {
        const end = this.end;
        const step = this.step
        let i = this.begin;
        return {
            next () {
                if (i <= end) {
                    const item = {
                        value: i,
                        done: false
                    }
                    i += step;
                    return item;
                } else {
                    return {done: true}
                }
            }
        }
    }
}

const counter = new Counter(0, 10, 2);
for (let value of counter) {
    console.log(value);
}
const iteratorForCounter = counter[Symbol.iterator]()

for (let i=0; i<6; i++) {
    console.log('56')
    const step = iteratorForCounter.next();
    console.log(step);
}

// Смотрим встроенный итератор массива

const arrWW = [1,6,7,9];
const iteratorForArrWW = arrWW[Symbol.iterator]()

for (let i=0; i<4; i++) {
    console.log('56')
    const step = iteratorForArrWW.next();
    console.log(step);
}

// Пример №6 Создаем итератор классу с помощью синхронного генератора
class Counter2 {
    begin;
    end;
    step;

    constructor(begin, end, step = 1) {
        this.begin = begin;
        this.end = end;
        this.step = step;
    }

    * generator() {
        let i = this.begin;
        while (true) {
            if (i > this.end) return;
            yield i
            i += this.step;
        }
    }

    [Symbol.iterator]() {
        return this.generator()[Symbol.iterator]()
    }
}

const counter2 = new Counter2(0, 10, 2);
for (let value of counter2) {
    console.log('counter2 ', value);
}

const iteratorForCounter2 = counter2[Symbol.iterator]()

for (let i=0; i<6; i++) {
    console.log('562')
    const step = iteratorForCounter2.next();
    console.log(step);
}

// Пример №7 Создаем асинхронный итератор для класса
class Counter3 {
    begin;
    end;
    step;
    constructor(begin, end, step = 1) {
        this.begin = begin;
        this.end = end;
        this.step = step;
    }

    [Symbol.asyncIterator] () {
        const end = this.end;
        const step = this.step
        let i = this.begin;
        return {
            async next () {
                if (i <= end) {
                    const item = {
                        value: i,
                        done: false
                    }
                    i += step;
                    return item;
                } else {
                    return {done: true}
                }
            }
        }
    }
}
const counter3 = new Counter3(0, 10, 2);
(async () => {
    for await (const step of counter3) {
        console.log('async ', step)
    }
})()

const iteratorForCounter3 = counter3[Symbol.asyncIterator]()
    const step1 = iteratorForCounter3.next();
    const step2 = iteratorForCounter3.next();
    const step3 = iteratorForCounter3.next();
    const step4 = iteratorForCounter3.next();
    const step5 = iteratorForCounter3.next();
    console.log(step1);
    console.log(step2);
    console.log(step3);
    console.log(step4);
    console.log(step5);

// Пример №8 Создаем асинхронный итератор для класса с помощью асинхронного генератора
class Counter4 {
    begin;
    end;
    step;

    constructor(begin, end, step = 1) {
        this.begin = begin;
        this.end = end;
        this.step = step;
    }

    async * generator() {
        let i = this.begin;
        while (true) {
            if (i > this.end) return;
            yield i
            i += this.step;
        }
    }

    [Symbol.asyncIterator]() {
        return this.generator()[Symbol.asyncIterator]()
    }
}

const counter4 = new Counter4(0, 10, 2);
(async () => {
    for await (let value of counter4) {
        console.log('counter4 async  ', value);
    }
})()

const iteratorForCounter4 = counter4[Symbol.asyncIterator]()
const steps4 = [];
for (let i=0; i<6; i++) {
    console.log('562')
    steps4.push(iteratorForCounter4.next());
}
Promise.all(steps4).then((step) => console.log(step))
