'use strict';

// Измерение производительности: за сколько выполнится реализация

const benchmark = {};
module.exports = benchmark;

const PRE_COUNT = 1000;

const rpad = (s, char, count) => (s + char.repeat(count - s.length));
const lpad = (s, char, count) => (char.repeat(count - s.length) + s);

benchmark.do = (num, name, fn) => {
    let i;
    let count = 0;
    const result = [];
    const begin = process.hrtime();

    const done = () => {
        const end = process.hrtime(begin);
        const diff = end[0] * 1e9 + end[1];
        const time = lpad(diff.toString(), '.', 12);
        name = rpad(name, '.', 12);
        console.log(name + time + ' nanoseconds');
    };

    const next = () => (++count === num && done ? done() : 0);
    for (i = 0; i < PRE_COUNT; i++) result.push(fn(() => {}));
    for (i = 0; i < num; i++) result.push(fn(next));
};

for (const item of array) {

}

for (i=0; i < array.length - 1; i++) {

}