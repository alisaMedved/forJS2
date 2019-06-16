'use strict';

// // Ошибка в синхронном коде
//
// const sum = (a, b) => {
//     if (typeof a === 'number' && typeof b === 'number') {
//         return a + b;
//     } else {
//         throw new Error('a and b should be numbers');  // Инструкция throw генерирует исклюяение
//     }   // Конструктор new Error создает ошибку
// };
//
// try {
//     console.log(sum(4, 5));
// } catch (err) {
//     console.log(err.message);
// }
//
// try {
//     console.log(sum(4, 'A'));
// } catch (err) {
//     console.log(err.message);   // выводим поле message ошибки
// }
//
// console.log(sum(4, 'B'));  // не найден catch - программа останавливается

// Обходим остановку синхронной программы из-за ошибки без try и catch
// Совмещаем синхронную программу, содержащую ошибку, с колбеком

// const sum = (a, b) => {
//     if (typeof a === 'number' && typeof b === 'number') {
//         return [null, a + b];  // null - для контракта колбека вместо ошибки
//     } else {
//         return [new Error('a and b should be numbers')];   // как обойти стоп программы из-за ошибки -
//     }  // просто обернуть ошибку в массив
// };
//
// const cb = (err, data) => {
// return('Это ошибка!!! ' + err + '\n' + 'Сумма: ' + data);
// }
//
// console.log(sum(2, 3));
// console.log(sum(7, 'A')); // ошибка - элемент массива - прог-ма не остановится
//
// console.log(cb(...sum(2, 3)));
// console.log(cb(...sum(2, 'F')));

// Обработка ошибок ассинхронных функции через колбек

// const sum = (a, b, callback) => {             // ассинхронная функция с колбеком
//     if (typeof a === 'number' && typeof b === 'number') {
//         callback(null, a+b);
//     } else {
//         callback(new Error('a and b should be numbers'));
//     }
// };
//
// sum(2, 3, (err, result) => {
//     if (err) {                              //  случае если функция возвращает ошибку через коллбек
//         console.log(err.message);  // тогда коллбек по сути вместо try...catch и в нем обязательно должны быть
//         return;             // проверка на существование ошибки и обработка ошибки
//     }
//     console.log(result);
// });
//
// sum(7, 'A', (err, result) => {
//     if (err) {
//         console.log(err.message);
//         return;
//     }
//     console.log(result);
// });

// обработка несловленных ошибок (неожиданных!) с помощью process.on
// и дальнейшее закрытие проги для уничтожения утечек с помощью process.exit(1)

// process.on('uncaughtException', err => {  // ловля непойманной ошибки
//     console.log('on uncaughtException: ' + err.message);  // обработка ошибки
//     process.exit(1);  // закрытие утечки, синхронное завершение проги со статусом кода
// });  // код 1 - статус "сбой"
//
// const sum = (a, b) => {
//     if (typeof a === 'number' && typeof b === 'number') {
//         return a + b;
//     } else {
//         throw new Error('a and b should be numbers');  // создаем ошибку
//     }
// };
//
// console.log(sum(2, 3));
// console.log(sum(7, 'A'));  // ошибка несловлена - ее ловит process.on

// Обработка ошибок и результатов промисами

// const sum = (a, b) => new Promise((resolve, reject) => {  // асинхронная ф-я воз-ет промис
//     if (typeof a === 'number' && typeof b === 'number') {  // усл-ия выполнения колбеков
//      resolve(a + b);                                       // аргумент resolve - результат асинх. функции
//     } else {
//         reject(new Error('a and b should be numbers'));
//     }                                       // аргумент reject - причина по которой Promise был отклонен
// });
//
// sum(2, 3)
// .then(data => {   // навешиваем на промис метод, а не вызываем метод. then и catch навешиваются
//     console.log(data);
// })                          // then  вызовется когда промис выполнится - т.е. будет в состоянии fulfiled
// .catch(err => {   // catch вызовется когда промис отклонен - т.е. будет в состоянии rejected
//     console.log(err.message);
// });
//
// sum(7, 'A')
//     .then(data => {
//         console.log(data);    // then содержит колбек промиса resolve и возвращает
//     })
//     .catch(err => {
//         console.log(err.message);  // catch содержит колбек промиса reject
//     });
//
// /*
// Самое что замечательное в промисах это всюду чейнинг.
// then и catch возвращают старые промисы и вызывают и выполняют колбеки
// reject возвращает старый промис, что был отклонен с указанной причиной
// resolve возвращает старый промис что был выполнен с переданным значением
//  */

// Обработка ошибки у асинхронной функции, определенной с помощью
// async. Оператор await

// const sum = async (a, b) => {                        // определяем ассинхронную функцию с помощью async
//     // такая функция автоматом вернет нам промис
//     if (typeof a === 'number' && typeof b === 'number') {
//         return a + b;  // результат функции будет добавлен в промис с помощью resolve
//     } else {
//         throw new Error('a and b should be numbers');
//     }     // исключение будет добавлено в промис с помощью reject
// };
//
// (async () => {
//
//     try {
//         console.log(await sum(2, 3));  // оператор await будет ждать окончания Promise
//     } catch (e) {                            // и вернет значение полученное из Promise
//         console.log(e.message);
//     }
//
//     try {
//         console.log(await sum(7, 'A'));
//     } catch (err) {                           // из отклоненного промиса await вернет ошибку
//         console.log(err.message);              // то переведет выполнение проги в блок catch
//     }
//
// })();
