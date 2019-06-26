'use strict';

// Создание экземпляра регулярного выражения

// const rx1 = /abc/g;
// console.log('abc Do you know abc?'.match(rx1));  // метод строки возвращает вхождения рег. выр-ия в строке
//
// const rx2 = new RegExp('abc');
// console.dir('Do you know abc?'.match(rx2));

// Основные символы регулярных выражений

// пример 1 x+
// const rx3 = /[a-z]+a[a-z]+/g;     // + один раз или несколько, [] набор
// const st3 = 'A man can die but once mman an';
// console.log(st3.match(rx3));

// пример 2 x*
// const rx3 = /[a-z]*a[a-z]+/g;
// const st3 = 'A man can die but once mman an';
// console.log(st3.match(rx3));

// Специальные символы

// const rx4 = /\sg\w*/g;        // * нуль раз, один раз или несколько
//                                 // \w [A-Z a-z 0-9 _]
// const st4 = 'Some are born great, ' +
//     'some achieve greatness, ' +
//     'and some have greatness thrust upon them. g g8';
// console.log(st4.match(rx4));
//
// const rx5 = /.u../g;               // . любой символ кроме некоторых пробельных
// const st5 = '— Such much? — For whom how';
// console.log(st5.match(rx5));
//
// const rx6 = /\w{3,5}/g;            // x{3, 5} количество символов x [3...5]
// const st6 = '— MGIMO finishe? — Ask?! kk';
// console.log(st6.match(rx6));
//
// const rx7 = /[^l] /g;            // [^l] любой символ кроме l    // [ghk] либо g либо h либо k
// const st7 = 'Nothing will come of nothing';
// console.log(st7.match(rx7));
//
// const rx8 = /^\+?\d{12}$/;      // \d [0..9]
//                                 // ^x - строка должна начаться с x
//                                 // x$ - строка должна закончится на x
//                                 // x? либо x либо ничего (за ничего даже пробел не считается)
// const st8 = '+380661234567';
// const st81 = '-380661234567';
// const st82 = '380661234567';
// console.log(st8.match(rx8), st81.match(rx8), st82.match(rx8));
//
// const rx9 = /[0-9]+ (hours|days|year)/g;   // либо hours либо days либо year - () - группа
// const st9 = '5 days 8 hours 8 year 9 century';
// console.log(st9.match(rx9));
//
// const rx47 = /f*?/;
// const st47 = 'fi fk';
// console.log(st47.match(rx47));

// Флаг m

// const rx99 = /h$/gm;     // флаг m учитывает \n и видит st588 как многострочный текст
//                         // 3 строки заканчиваются на h
// const rx100 = /h$/g;   // не учитывает \n - st588 одна единая строка - одна строка заканчивается на h
// const st588 = 'r meow h\nr ggggggggggggg h\nt jjjjj h';
// console.log(st588.match(rx99));

// const reg = /[abc]/g;
// const str = 'abcdefgabc';
// console.dir(reg.exec(str));
// console.dir(reg.exec(str));
// console.dir(reg.exec(str));
// console.log(reg.exec(str), reg.lastIndex);
// console.log(str.match(reg), reg.lastIndex);

// const reg = /[abc]/g;
// const str = 'abcdefgabc';
// console.log(reg.test(str), reg.lastIndex);
// console.log(reg.test(str), reg.lastIndex);
// console.log(reg.test(str), reg.lastIndex);
// console.log(reg.test(str), reg.lastIndex);

// Свойства РВ, методы РВ exec и test

// const rx = /[abc]/gi;
//
// console.dir({
//     rx,
//     flags: rx.flags,   // флаги РВ
//     global: rx.global, // true при флаге g
//     ignoreCase: rx.ignoreCase,  // true при флаге i
//     multiline: rx.multiline,  // true при флаге m
//     source: rx.source,  // само РВ без флагов
//     sticky: rx.sticky,
//     unicode: rx.unicode,
//     lastIndex: rx.lastIndex,  // индекс в строке с которого будет
//                                 // продолжен пойск сопоставления
// });
//
// console.dir({
//     xyz: rx.test('xyz'),
//     abcdefgabc: rx.test('abcdefgabc'),
// });
//
// const s = 'abcdefgabc';
//
// let res;
// do {
//     res = rx.exec(s);
//     console.log({ lastIndex: rx.lastIndex, res});
// } while (res);

// РВ сопоставления электронной почты
//
// const s = 'Hello <User1@domain.> and user2@domain.com';
//
// const rx = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/gi;
// console.dir(s.match(rx));

// Метод строки replace в качестве аргумента-шаблона принимает РВ
// Пример 1

// const s = 'POp lkoi olk';
// const s1 = ' ';
// const rx1 = /\s/g;
// const rx2 = /\s/;
// console.log(s.replace(s1, '____'));   // при шаблоне-строке будет заменено только первое вхождение
// console.log(s.replace(rx1, '____'));  // при шаблоне-РВ с флагом g будут заменены все сопоставления
// console.log(s.replace(rx2, '____')); // при шаблоне-РВ без флага g будет заменено только первое сопаставление

// Парсер переводит строку в массив уникальных слов написанных маленькими буквами
// Создаем парсер с помощью рег выражений и методов строк

// const words = s => [...new Set(s
//     .toLowerCase()
//     .replace(/\W+/g, ' ')
//     .trim()
//     .split(/\s/)             // а вот для split не нужен флаг g
// )];
//
// const s = 'Hello World, here we are!';
// console.dir(words(s));
// console.dir(words(s + s));

// Метод строки replace в качестве аргумента-шаблона принимает РВ
// Пример 2

// const rx1 = /abc/g;
// const s11 = 'abcdefg';
// const s12 = s11.replace(rx1, '123');
// console.log(s12);
//
// const rx2 = new RegExp('abc', 'gi');  // Еще один способ создавать РВ
// const s21 = 'abcdefgABCDEFG';
// const s22 = s21.replace(rx2, '789');
// console.log(s22);

// Метод строки replace с аргументом-шаблоном РВ и с аргументом-заменителем функцией
// Пример 3
//
// const rx = /(abc)(defg)/g;
// const s = 'abcdefgAbC';
// const res = s.replace(rx, (sub, p1, p2, pos, str) => {
//     console.dir({sub, pos, str, p1, p2});
//     return sub.toUpperCase();
// });
//
// console.log(res);
//
// /*
// sub - сопоставившаяся подстрока в строке
// p1, p2 - сопоставившиеся группы в РВ,
// pos - индекс первого символа сопоставившейся подстроки в строке,
// str - строка
//  */

// Метод String search
//
// const rx1 = /def/g;
// const s1 = 'abcdefgabc';
// const res1 = s1.search(rx1);
// console.log(res1);
//
// const rx2 = /cba/g;
// const s2 = 'abcdefgabc';
// const res2 = s2.search(rx2);
// console.log(res2);









