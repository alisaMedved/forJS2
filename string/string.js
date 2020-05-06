'use strict';



// const name = 'Mark Avral';

// console.log(`${name}`);
// console.log(`${typeof name}`);
// console.log(`${name.length}`); // посчитает пробел
// console.log(`${name.charAt(3)}`); // код ASCII не вернет так как в js нет формата char
// console.log(`${name.codePointAt(3)}`); // код Unicode в 10-ричной системе исч
// console.log(`${name.repeat(3)}`);
// console.log(' AHJ  '.trimLeft());
// console.log(String.fromCharCode(256));
// console.log(`${name.charCodeAt(5)}`); // ASCII код в 10-ричной системе исч
// console.log(`${name[5]}`);
// console.log(`${name.codePointAt(5)}`); // код Unicode в 10-ричной системе исч
//
//
// // последний совпадающий символ ASCII и Unicode
//
// const last = 'Unicode'
// console.log(`${name.charCodeAt(5)}`); // ASCII код в 10-ричной системе исч
// console.log(`${name.codePointAt(5)}`); // код Unicode в 10-ричной системе исч
// const f = 256;
// console.log(f.toString(16));

// методы прототипов для работы с подстроками
// const name = 'Mark Aurelius Aurelius';
//
// console.log(`${ name.indexOf('Aur') }`); //позиция первой букы подстроки в строке
// // только первая встреча слева
//
// console.log(`${ name.lastIndexOf('Aur') }`); //позиция первой букы подстроки в строке
// // только первая встреча справа
//
// console.log(`${ name.includes('Ma') }`); // существует ли в строке подстрока
//
// console.log(`${ name.startsWith('Ma') }`); // начинается ли строка подстрокой
//
// console.log(`${ name.endsWith('lius') }`); // заканчивается ли строка подстрокой

// методы прототипов, что не изменяют старую строку, а создают новую строку

// const name = 'Mark Aurelius Aurelius';
//
// console.log(`${ name.split(' ') }`);
// console.log(`${ JSON.stringify(name.split(' '))  }`);
// console.log(`${ name.replace('r', 'R') }`);
// console.log(`${ name.replace(/r/g, 'R') }`);
// console.log(`${ 'string1 '.concat('string2', 'string3') }`);

// создаем из строки подстроку

//substr - deprecated
//
// const name = 'Mark Aurelius';
// console.log(`${ name.substr(2, 5) }`); // c какой буквы начать вырезать,
//                     //(можно отриательные числа тогда отсчет будет с конца)
//                                 // сколько букв вырезать (необязательное)
//                         // если не сказать вырежет до конца все что справа
// console.log(`${ name.substr(-5, 4) }`);
//
// // slice(begin, end)
//
// console.log(`${ name.slice(2, 8) }`); // c какой буквы по какую вырезаем
//                                 // для той буквы что ведет отчет с края - (
//                                 // для той что не ведет отчет с края - [
//
// console.log(`${ name.slice(3, -2) }`);
//
// //можно 1 аргумент - begin
// // если не сказать end вырежет до конца все что справа
// console.log(`${ name.slice(-3) }`); // c конца
// console.log(`${ name.slice(3) }`); // с начала
//
// // substring(begin, end)
//
// console.log(`${ name.substring(2, 4) }`); // c какой буквы по какую вырезаем
//                                     // для той буквы что ведет отчет с края - (
//                                     // для той что не ведет отчет с края - [
//
// console.log(`${ name.substring(3, -2) }`); // отрицательных координат
//                                             // не существует! они за
//                                         // пределом строки
// console.log(`${ name.substring(-3, 2) }`);
//
// //можно 1 аргумент - begin
// // если не сказать end вырежет до конца все что справа
// console.log(`${ name.substring(-3) }`); // не существуент
// console.log(`${ name.substring(3) }`); // с начала

// const name = 'Mark Aurelius';

// console.log(`${ name.includes(' Mark ') }`);
//
// //polyfill
//
// if (!String.prototype.includes) {
//     String.prototype.includes = function (s) {
//         return this.indexOf(s) > -1;
//     };
// }
//
// console.log(name.includes('Mark '));
//
// // bad practice
//
// String.prototype.includesWord = function(s) {
//     return ` ${this}`.includes(` ${s} `);
// };
//
// console.log(name.includesWord('Mark'));

// //padStart и padEnd - экспериментальные! Осторожно
//
// const st1 = 'hello';
//
// const st2 = 'Mark ';
//
// console.log(st1.padStart(30, st2));
//
// // обратная trim
//
// console.log(st1.padStart(6).padEnd(7) + '!');

// Стандартная шаблонизирующая функция

// const tag = (strings, ...values) => {
//   console.dir({ strings, values })
// };
//
// const greeting = 'Hello';
// const person = { name: 'Marcus Aurelius' };
//
// tag`${greeting} ${person.name}!`;

/* в первый аргумент strings шаблонизирующей функции tag
попадут все строки что не были переданы в шаблонизирующую строку
и находились там изначально. Во второй аргумент ...values попадут все
результаты экспрешенов, и переменные переданные в шаблонизирующую строку.
 */

// Нестандартная шаблонизирующая функция

// const esc = (code, s) => `\x1b[${code}m${s}\x1b[0m`;
// /* функция esc ставит в консоль перед строкой s
// определенную escape-последовательность, которая задает строке s
// определенный стиль написания (курсив, жирный и т.д.).
// Определенная escape-последовательность расчитывается из определенного
// значения code.
//  */
//
// const tag = (strings, ...values ) => {
// const result = [strings[0]];
// let i = 1; // итерация по двум масивам
//     for (const val of values) {
//         const str = strings[i++];
//         result.push(esc(i+1, val), str);
//     }
//     return result.join('') //склеивание элементов массива
// };
//
// const greeting = 'Ave';
// const person = { name: 'Marcus Aurelius', position: 'Emperor' };
//
// const text = tag`${greeting}, ${person.position} ${person.name}!`;
//
// console.log(text);

console.log('https://bs.bregis.ru/api/bregis/ui/apiroutes/routes/rule/5d3679e7-cca5-4fe6-8d7e-4869a2310d77?destination-icmid=4b888b04-6b22-496a-acb6-8f43850d3769&currentPage=600&pageSize=10&searchType=name&sortType=name&sortValue=abc&searchValue='.length);


console.log('sdfghjkl;,mnbvcsewrtyuioplkfdsasdfghjkl;. cxsqwertyuiop[kjhgfdsaqwopkjhgfdsaячсмитьбжщшгнекуцйфывапролдтимсч'.length);

console.log('https://bs.bregis.ru/api/bregis/ui/integrationterms/matching?source=d6b9a2e8-14c7-4322-a795-a8609452240f&destination=1ec774e9-6f08-4714-8239-2479ea3ba4fc&termType=services&currentPage=1&pageSize=10&searchType=sourceName&searchValue=Кровь&sortType=sourceName&sortValue=abc'.length);


const sesTimeNum = parseInt("", 10);
console.log(sesTimeNum);
