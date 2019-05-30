'use strict';

// //логгер через замыкание
// const logger = level => {
//     const color = logger.colors[level] || logger.colors.info;
//     return s => {
//         const date = new Date().toISOString();
//         console.log(color + date + '\n' + s);
//     };
// };
//
// logger.colors = {
//     warning: '\x1b[30m',
//     error: "\x1b[37m",
//     info: "\x1b[35m",
// };
// const warning = logger('warning');
// const error = logger('error');
// const debug = logger('debug');
// const slow = logger('slow');
//
// warning('Hello');
// error('gth');
// debug('klop');
// slow('kiol');

// //логгер через прототипы
//
// function Logger(level) { // конструктор объекта с полем color
//     this.color = Logger.colors[level] || Logger.colors.info;
// }
//
// Logger.colors = { //статический метод конструктора (в конструкторе - даб в объекте - нет)
//     warning: '\x1b[30m',
//     error: "\x1b[37m",
//     info: "\x1b[35m",
// };
//
// Logger.prototype.log = function(s) {
//     const date = new Date().toISOString();
//     console.log(this.color + date + '\n' + s);
// };
//
// const warning = new Logger('warning');
// const error = new Logger('error');
// const debug = new Logger('debug');
// const slow = new Logger('slow');
//
// warning.log('Hello');
// error.log('gth');
// debug.log('klop');
// slow.log('kiol');

//логгер через класс

class Logger {
    constructor(level) {
        this.color = Logger.colors[level] || Logger.colors.info;
    }

    log(s) {
        const date = new Date().toISOString();
        console.log(this.color + date + '\n' + s);
    }
}

Logger.colors = {
    warning: '\x1b[30m',
    error: "\x1b[37m",
    info: "\x1b[35m",
};

const warning = new Logger('warning');
const error = new Logger('error');
const debug = new Logger('debug');
const slow = new Logger('slow');

warning.log('Hello');
error.log('gth');
debug.log('klop');
slow.log('kiol');
