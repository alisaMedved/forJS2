// // 'use strict';
// //
// // // Создание экземпляра регулярного выражения
// //
// // // const rx1 = /abc/g;
// // // console.log('abc Do you know abc?'.match(rx1));  // метод строки возвращает вхождения рег. выр-ия в строке
// // //
// // // const rx2 = new RegExp('abc');
// // // console.dir('Do you know abc?'.match(rx2));
// //
// // // Основные символы регулярных выражений
// //
// // // пример 1 x+
// // // const rx3 = /[a-z]+a[a-z]+/g;     // + один раз или несколько, [] набор
// // // const st3 = 'A man can die but once mman an';
// // // console.log(st3.match(rx3));
// //
// // // пример 2 x*
// // // const rx3 = /[a-z]*a[a-z]+/g;
// // // const st3 = 'A man can die but once mman an';
// // // console.log(st3.match(rx3));
// //
// // // Специальные символы
// //
// // // const rx4 = /\sg\w*/g;        // * нуль раз, один раз или несколько
// // //                                 // \w [A-Z a-z 0-9 _]
// // // const st4 = 'Some are born great, ' +
// // //     'some achieve greatness, ' +
// // //     'and some have greatness thrust upon them. g g8';
// // // console.log(st4.match(rx4));
// // //
// // // const rx5 = /.u../g;               // . любой символ кроме некоторых пробельных
// // // const st5 = '— Such much? — For whom how';
// // // console.log(st5.match(rx5));
// // //
// // // const rx6 = /\w{3,5}/g;            // x{3, 5} количество символов x [3...5]
// // // const st6 = '— MGIMO finishe? — Ask?! kk';
// // // console.log(st6.match(rx6));
// // //
// // // const rx7 = /[^l] /g;            // [^l] любой символ кроме l    // [ghk] либо g либо h либо k
// // // const st7 = 'Nothing will come of nothing';
// // // console.log(st7.match(rx7));
// // //
// // // const rx8 = /^\+?\d{12}$/;      // \d [0..9]
// // //                                 // ^x - строка должна начаться с x
// // //                                 // x$ - строка должна закончится на x
// // //                                 // x? либо x либо ничего (за ничего даже пробел не считается)
// // // const st8 = '+380661234567';
// // // const st81 = '-380661234567';
// // // const st82 = '380661234567';
// // // console.log(st8.match(rx8), st81.match(rx8), st82.match(rx8));
// // //
// // // const rx9 = /[0-9]+ (hours|days|year)/g;   // либо hours либо days либо year - () - группа
// // // const st9 = '5 days 8 hours 8 year 9 century';
// // // console.log(st9.match(rx9));
// // //
// // // const rx47 = /f*?/;
// // // const st47 = 'fi fk';
// // // console.log(st47.match(rx47));
// //
// // // Флаг m
// //
// // // const rx99 = /h$/gm;     // флаг m учитывает \n и видит st588 как многострочный текст
// // //                         // 3 строки заканчиваются на h
// // // const rx100 = /h$/g;   // не учитывает \n - st588 одна единая строка - одна строка заканчивается на h
// // // const st588 = 'r meow h\nr ggggggggggggg h\nt jjjjj h';
// // // console.log(st588.match(rx99));
// //
// // // const reg = /[abc]/g;
// // // const str = 'abcdefgabc';
// // // console.dir(reg.exec(str));
// // // console.dir(reg.exec(str));
// // // console.dir(reg.exec(str));
// // // console.log(reg.exec(str), reg.lastIndex);
// // // console.log(str.match(reg), reg.lastIndex);
// //
// // // const reg = /[abc]/g;
// // // const str = 'abcdefgabc';
// // // console.log(reg.test(str), reg.lastIndex);
// // // console.log(reg.test(str), reg.lastIndex);
// // // console.log(reg.test(str), reg.lastIndex);
// // // console.log(reg.test(str), reg.lastIndex);
// //
// // // Свойства РВ, методы РВ exec и test
// //
// // // const rx = /[abc]/gi;
// // //
// // // console.dir({
// // //     rx,
// // //     flags: rx.flags,   // флаги РВ
// // //     global: rx.global, // true при флаге g
// // //     ignoreCase: rx.ignoreCase,  // true при флаге i
// // //     multiline: rx.multiline,  // true при флаге m
// // //     source: rx.source,  // само РВ без флагов
// // //     sticky: rx.sticky,
// // //     unicode: rx.unicode,
// // //     lastIndex: rx.lastIndex,  // индекс в строке с которого будет
// // //                                 // продолжен пойск сопоставления
// // // });
// // //
// // // console.dir({
// // //     xyz: rx.test('xyz'),
// // //     abcdefgabc: rx.test('abcdefgabc'),
// // // });
// // //
// // // const s = 'abcdefgabc';
// // //
// // // let res;
// // // do {
// // //     res = rx.exec(s);
// // //     console.log({ lastIndex: rx.lastIndex, res});
// // // } while (res);
// //
// // // РВ сопоставления электронной почты
// // //
// // // const s = 'Hello <User1@domain.> and user2@domain.com';
// // //
// // // const rx = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/gi;
// // // console.dir(s.match(rx));
// //
// // // Метод строки replace в качестве аргумента-шаблона принимает РВ
// // // Пример 1
// //
// // // const s = 'POp lkoi olk';
// // // const s1 = ' ';
// // // const rx1 = /\s/g;
// // // const rx2 = /\s/;
// // // console.log(s.replace(s1, '____'));   // при шаблоне-строке будет заменено только первое вхождение
// // // console.log(s.replace(rx1, '____'));  // при шаблоне-РВ с флагом g будут заменены все сопоставления
// // // console.log(s.replace(rx2, '____')); // при шаблоне-РВ без флага g будет заменено только первое сопаставление
// //
// // // Парсер переводит строку в массив уникальных слов написанных маленькими буквами
// // // Создаем парсер с помощью рег выражений и методов строк
// //
// // // const words = s => [...new Set(s
// // //     .toLowerCase()
// // //     .replace(/\W+/g, ' ')
// // //     .trim()
// // //     .split(/\s/)             // а вот для split не нужен флаг g
// // // )];
// // //
// // // const s = 'Hello World, here we are!';
// // // console.dir(words(s));
// // // console.dir(words(s + s));
// //
// // // Метод строки replace в качестве аргумента-шаблона принимает РВ
// // // Пример 2
// //
// // // const rx1 = /abc/g;
// // // const s11 = 'abcdefg';
// // // const s12 = s11.replace(rx1, '123');
// // // console.log(s12);
// // //
// // // const rx2 = new RegExp('abc', 'gi');  // Еще один способ создавать РВ
// // // const s21 = 'abcdefgABCDEFG';
// // // const s22 = s21.replace(rx2, '789');
// // // console.log(s22);
// //
// // // Метод строки replace с аргументом-шаблоном РВ и с аргументом-заменителем функцией
// // // Пример 3
// // //
// // // const rx = /(abc)(defg)/g;
// // // const s = 'abcdefgAbC';
// // // const res = s.replace(rx, (sub, p1, p2, pos, str) => {
// // //     console.dir({sub, pos, str, p1, p2});
// // //     return sub.toUpperCase();
// // // });
// // //
// // // console.log(res);
// // //
// // // /*
// // // sub - сопоставившаяся подстрока в строке
// // // p1, p2 - сопоставившиеся группы в РВ,
// // // pos - индекс первого символа сопоставившейся подстроки в строке,
// // // str - строка
// // //  */
// //
// // // Метод String search
// // //
// // // const rx1 = /def/g;
// // // const s1 = 'abcdefgabc';
// // // const res1 = s1.search(rx1);
// // // console.log(res1);
// // //
// // // const rx2 = /cba/g;
// // // const s2 = 'abcdefgabc';
// // // const res2 = s2.search(rx2);
// // // console.log(res2);
// //
// // // const str = 'hg7.098';
// // // const strT = 'hg7.98';
// // // const strS = '.9';
// // // // const rx = /\.9/gi;
// // //
// // //
// // //
// // // const rx = new RegExp(\ + `${strS}`');
// // // // const rx = new RegExp(strS);
// // // console.log(rx.test(str));
// // // console.log(rx.test(strT));
// //
// // // const str = "gh.jk";
// // // str.
// //
// // // const mas ='jk .g.f'.split("");
// // // console.log(mas);
// // // const newI = mas.map(el => {
// // //     if (el === '.')  {
// // //         return  '\\.';
// // //     } else {
// // //         return el;
// // //     }
// // // });
// //
// // // const newI = mas.map(el => el === '.' ? '\\.' : el);
// // //
// // // console.log(newI);
// // //
// // // console.log(newI.join(''));
// // //
// // //
// // //
// // //
// // // // лучше конструктор если регулярка будет изменяться
// // //
// // // const time = 1000240000000;
// // // console.log(new Date(time));
// // // const timeTo = 1586120400000;
// // // console.log(new Date(timeTo));
// //
// // // console.log("http://localhost:8081/api/bregis/ui/manager/observations/zali/pathologies?from=1527800400000&to=1586936343877&organizations=[\"a1312369-5a99-46bf-bffa-a50304cb886b\", \"a1312369-5a99-46bf-bffa-a50304cb886b\"]&currentPage=1&pageSize=10&searchType=measurementName&searchValue=ЛПНП (холестерин липопротеидов низкой плотности) ЛПНП (холестерин липопротеидов низкой плотности) ЛПНП (холестерин липопротеидов низкой плотности) ЛПНП (холестерин липопротеидов низкой плотности)&sortType=measurementName&sortValue=cba".length);
// // //
// // // console.log(new Date());
// //
// // // const rx = /([а-яА-Я\s.]+),\s([0-9]+),\sИжевск/;
// // // console.log(rx.exec("45678Пер. Тихоновский, 33, Ижевск, 5678")[0]);
// //
// // // const adressRexExp = (str) => {
// // //     const rx = /([а-яА-Я\s.]+),\s([0-9]+),\sИжевск/;
// // //
// // //     // проверяем
// // //     // 1) из Ижевска ли адрес
// // //     // 2) указаны ли в адресе улица и дом
// // //     if (rx.exec(str) !== null) {
// // //
// // //         // возвращаем в требуемом формате улица, дом
// // //         // специально не стала убирать ул. пер. просп.
// // //         // так как возможно в одном городе найдутся "просп. Руставели" и "ул. Руставели"
// // //         return rx.exec(str)[0].slice(0, -8)
// // //     } else {
// // //         return null
// // //     }
// // // }
// // //
// // // console.log(adressRexExp("ул. Репина, 10, Ижевск, республика Удмуртия, Россия, 426035"));
// // //
// // // const rx = /^([а-яА-Я\s.0-9]+),\s\d+[a-z/\d]*$/;
// // // // const street = str.split(", ")[0]
// // // const rxTwo = /[А-Яа-я]/
// // // // проверяем
// // // // 1) из Ижевска ли адрес
// // // // 2) указаны ли в адресе улица и дом
// // // //
// // //
// // // console.log(rx.exec("Шишкина, 3" ));
// // // console.log(rx.exec("3 Шишкина" )); // null
// // // console.log(rx.exec("3, Шишкина" ));
// // // console.log(rx.exec("Шишкина 3" )); // null
// // // console.log(rx.exec("просп. 8 Марта, 3" )); // null
// // // console.log(rx.exec("Шишкина, 3б, Ижевск" )); // null
// //
// // const today = new Date(1610111531846);
// // const time = today.getTime();
// // console.log(today.getTime());
// // console.log(today.getUTCMilliseconds());
// //
// // console.log(today);
// // console.log(today.toString());
//
// // const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
// // console.log(animals.slice(animals.length - 3));
// // console.log
//
// // const myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
// // const myFishS = ['cat', 'dog'];
// // const removed = myFish.splice(2, 4, ...myFishS);
//
// // const str = "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";
// // // console.log(str.length)
// //
// // for (let i = 0; i < str.length;) {
// //     console.log(str.slice(i, i + 2000 > str.length ? str.length : i + 2000))
// //     i = i + 2001;
// // }
//
// // const str = "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";
//
// // const reg = /^(data).(base64,)$/;
// const reg = "data:image/jpg;base64,";
// const reg = "data:image/png;base64,";
// const reg = "data:image/jpeg;base64,";
// const str = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAD4APgDASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMEBQECBv/EACUQAQACAgICAQUBAQEAAAAAAAABAgMRBDESIUETMlFhcRQzIv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD60AAAAAAAAAAAAeb5K07lBblxH2wCyKU8q89Of6rgvCpTlTvVoWomJjcdA6G4/IAAAAAAAAAAAAAAAAAAAAADlrRSszM+gLWisbmdKmblTPqnX5RZs85LfpEDs2m07mdubADbu3ADaT61/HW/SMB687fmVjDyZidX9quzYNaJiY3ApcXPqYpbpdAAAAAAAAAAAAAAAAAAAmdQz+Tm87ajqFjl5fCmo7lQAAAAAAAAAAAX+Lm86+M9woPWO80vFoBqjzjvF6RaHoAAAAAAAAAAAAAAA69iHk5PDHP5kFLPfzyTPwjAAAAAAAAAAAAAFniZfG3hM+pXmTE+MxMNLDf6mOJBIAAAAAAAAAAAAAAocu/lk18Qu5LeFJll2nytM/kHAAAAAAAAAAAAAAFnh5NX8Z6lWeqT43iQao5Wd1iXQAAAAAAAAAAAAVebfVYrHypJ+Xbyy6/CAAAAAAAAAAAAAAAAAGngneKqRDxZ3hhMAAAAAAAAAAASE9T/AAGXlneS0/t4dt98/wBcAAAAAAAAAAAAAAAABf4f/JYV+H/yWAAAAAAAAAAACepAGVljWS39eU/Lr45Z/aAAAAAAAAAAAAAAAAAGhxI1ihOjwRrFWEgA64AAAAAAAAAACpza+osptPkV8sUswAAAAAAAAAAAAAAB7xUm+SIeF3h49R5z89AtRGoiPwADrgAAAAAOuAAAAAExuJhlZK+N5hqs7l11mmfyCEAAAAAAAAAAAAACO4hq4q+OOsfpl19Whq1+2P4DoAAAAAAAAAAPGXf07a7B7GZXNkpPqUscy0dwC8o83X1I/j1/tnX2q2S85LTaQeQAAAAAAAAAAAAAPlp4LeWKJZifjZ/p+p6BoDzXJW3UvQAAAAA6A4AATG4mABmZ6TTJMfCNocnD9Sm47hnzGp1IAAAAAAAAAAAAAAAAAAOxMx1MpMWa9bR73CJZ43HmbeVo1AL1Z3ES646AAAADgAAACDNxa39x6lOAzb8fJX42jmsx3EtZ5mlZ7iAZQ0rYsURuaxChltWbz4x6B4AAAAAAAAAABNgtjj1kjsEL3TFe8+o9L9ceK3usRKSIiOoBXw8WtfdvcrMRqAB0AAAAAHAAByZiO5RX5NKfO5BM5NorHudKV+ZafVY0gtktafcyC/fk46/O0F+ZaftjSqA93y3v90vAAAAAAAAAAAAAA9UyWpP/AJlZx8z4vCoA1KZaXj1L2yImY6nSfHyr179wDQEFOVS3fqU0Wiep2D0AAACK+ele52r35kz6pCp2A93y3vPuXgAAAAAAAAAAAAAAAAAAAAAAAHqt7V6mXkBYpy71+72npy6W79KADVretupgZcWmOpmAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z";
// const newstr = str.replace(reg, "");
// // const str = "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";
// // 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
// // console.log(str.length);
// // const byteLength = (str).replace(/=/g,"").length * 0.75;
// // console.log(byteLength);
// console.log(newstr);
//
// var myFish = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
// const arr = ['new 6', 'new 7', 'new 8', 'new 9', 'new 10']
// var removed = myFish.splice(5, 5, ...arr);
// console.log(myFish);

// const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
//
// const findedIndex = 3;
// console.log(animals.slice(0, findedIndex));
// console.log(animals.slice(findedIndex + 1, animals.length));
//
// // если последний элемент
// console.log(animals.slice(0, animals.length - 1))
//
// // если первый элемент
// console.log(animals.slice(1, animals.length))

// const old = ['4', '5', '6', '7', '8', '9'];
// const newT = [ '0', '1', '2', '3', '4'];
//
// const dif = 5 - 4;
//
// old.splice(0, dif, ...newCommentsItems)
// setArrayComments(prevState => newCommentsItems.slice(0, dif).concat(prevState));
//
// const r = new Set([]);
// console.log(r);

// const old = ['4', '5', '6', '7', '8', '9'];
// // old.push(7);
// // console.log(old);
// console.log(old.slice(3, 6));
// console.log(old.slice(0, 3));
//
// const commentsAllReplies = [1, 8, 9];
// const parentForNewComment = 4;
// let findArray = [];
// findArray = [...commentsAllReplies];
// findArray.push(parentForNewComment);
// console.log(findArray);
//
// const isoDate = "2020-02-19 21:30:00";
//
//     // const date = new Date(`${isoDate}+3:00`).getDate();
//     // const mounth = new Date(`${isoDate}+3:00`).getMonth()
//     // const nowDate = new Date().getDate();
//     // const nowMounth = new Date().getMonth();
//
// new Date(`${isoDate}+3:00`).getTime();
// const mins = (new Date().getTime() - new Date(`${isoDate}+3:00`).getTime()) / 1000 / 60
// const hours = (new Date().getTime() - new Date(`${isoDate}+3:00`).getTime()) / 1000 / 60 / 60
//
//
//
// console.log("mins ", mins);
// console.log("hours ", hours);
// // console.log("nowDate ", nowDate);
// // console.log("nowMounth ", nowMounth);

// var myFish = ['angel', 'clown', 'mandarin', 'sturgeon', 'sturgeon1', 'sturgeon2', 'sturgeon3'];
// console.log(myFish.slice(0,3));

/**
 * Короче у нас тут новый метод matchAll появился - ну он тоже как и match возвращает массив совпадений.
 * Только у matchAll эл-ты в массивах не сами совпадения, а прям объекты посвященные им с подробной инфой
 * об индексе о группе захвата и бла бла
 */
const regexp = /t(e)(st(\d?))/g;
const str = 'test1 test2';

console.log(str.match(regexp));

console.log([...str.matchAll(regexp)]);

// ну мы помним search это тупо проверка есть нет - индекс отдаст иначе -1 вернет
console.log(str.search(regexp));

// Аналоги
// search от string = test от regexp условно - один индекс, второй boolean возвращает
console.log(regexp.test(str));
// matchAll от string и exec от regexp
console.log(regexp.exec(str));
// возникла странность

// const str = "Быть или не быть, вот в чём вопрос.";
//
// console.log(str.startsWith("Быть")); // true
// console.log(str.startsWith("не быть")); // false
// console.log(str.startsWith("не быть", 9)); // true

// У строк появились улучшенные учитывающие правила локали toLocaleLowerCase и тд

// новые методы padEnd и padStart

"abc".padEnd(10); // "abc       "
"abc".padEnd(10, "foo"); // "abcfoofoof"
"abc".padEnd(6, "123456"); // "abc123"

"abc".padStart(10); // "       abc"
"abc".padStart(10, "foo"); // "foofoofabc"
"abc".padStart(6, "123465"); // "123abc"
"abc".padStart(8, "0"); // "00000abc"
"abc".padStart(1); // "abc"






