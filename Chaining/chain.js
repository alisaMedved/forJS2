'use strict';

//Чейнинг функции через синтаксис функции
// способ 1: функция возвращает функцию или просто вложенные lambda-function

// function fn(a) {
//     return function(b) {
//         return function(c) {
//             return a + b + c;
//         }
//     }
// }
//
// const fn2 = a => b => c => a + b + c;
//
// const res1 = fn(1)(56)(589);
// const res2 = fn2(1)(56)(589);
// console.log(res1);
// console.log(res2);

// // Чейнинг функции через синтаксис прототипов
//
const Text = function(s) {  // конструктор прототипа
    this.value = s;
};

Text.prototype.line = function(a) {
    this.value += '\n' + a;
    return this;              // возвращает экземпяляр прототипа со всеми методами -
};                               //  возможность для чейнинга

Text.prototype.toString = function() {
    return this.value;
};

const txt = new Text('line1')    // экземпляр прототипа
.line('line2')
.line('line3')
.line('line4')

console.log(`${txt}`);  // console.log вызывает метод экземпляра toString

// Чейнинг функции через синтаксис классов

// class Text {
//     constructor(s) {
//         this.value = s;
//     }
//     line(a) {
//         this.value += '\n' + a;
//         return this;
//     }
//     toString() {
//         return this.value;
//     }
// }
//
// const txt = new Text('line1')
//     .line('line2')
//     .line('line3')
//     .line('line4');
//
// console.log(`${txt}`);

// // Чейнинг функции через синтаксис функтора
//
// const text = (s = '') => ({           // Функтор
//     line: a => text(s + '\n' + a),  // рекурсивный вызов - создается новый экземпяляр замыкания
//     toString: () => s                 // новый объект замкнутый на новом контексте функции
// });
//
// /*
// Функтор возвращает новое замыкание -
// новый объект замкнутый на новом контексте функции
//  */
//
// const txt = text('line1')
//     .line('line2')
//     .line('line3')
//     .line('line4');
//
// console.log(`${txt}`);    // console.log вызывает метод toString
//
// const txtob  = text('lineob');       // общий экземпляр замыкания
// const vetka1 = txtob.line('vetka1'); // разветвление на два экземпляра замыкания
// const vetka2 = txtob.line('vetka2');
//
// console.log('vetka1 ' + ': ' + vetka1);
// console.log('vetka2 ' + ': ' + vetka2);

// чейнинг функции функциональным способом
// с мутирующимся базовым объектом. На фабрике

// const text = (s = '', o = {
//     line: a => text(s + '\n' + a),
//     toString: () => s
// }) => o;
//
// /*
// Теперь мутируется базовый экземпляр (мутируется объект о)
//  */
//
// const txt = text('line1')  // создание базового экземпляра
//     .line('line2')   // мутация базового экземпляра
//     .line('line3')
//     .line('line4');
//
// console.log(`${txt}`);

// // чейнинг функции функциональным способом
// // с мутирующимся базовым объектом, у которого есть итератор
// // и потому этот объект можно будет вызвать с помощью spread-оператора
//
// const text = (s = '', o = {                  // мутирующийся базовый объект
//     line: a => text(s + '\n' + a),
//     [Symbol.iterator]: () => ({
//         next() {
//             const res = { value: s, done: this.finished }; // чему равен finished? его нет
//                                                            // и потому он равен undefined
//             this.finished = true;             // конец итерации - присваиваем true
//                                               // а при втором вызове при следующей итерации
//                                               // finished будет сразу равен true и потому это
//                                                //итератор на один раз
//             return res;
//         }
//     })
// }) => o;
//
// /*
// Теперь мутируется базовый экземпляр (мутируется объект о)
// А по чему итерируется итератор o? Забавно но благодаря методу line
// value одна единая склейная строка, нету там набора элементов-строк.
//  */
//
// const txt = text('line1')  // создание базового экземпляра
//     .line('line2')   // мутация базового экземпляра
//     .line('line3')
//     .line('line4');
//
// console.log(...txt);   // наличие итератора позволяет использовать spread-оператор
//
// /*
// Получается что мы создали итератор тупо ради
// красивого вывода в console с помощью spread-оператора
//  */


