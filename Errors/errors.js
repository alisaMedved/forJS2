// 'use strict';
//
// // // Ошибка в синхронном коде
// //
// // const sum = (a, b) => {
// //     if (typeof a === 'number' && typeof b === 'number') {
// //         return a + b;
// //     } else {
// //         throw new Error('a and b should be numbers');  // Инструкция throw генерирует исклюяение
// //     }   // Конструктор new Error создает ошибку
// // };
// //
// // try {
// //     console.log(sum(4, 5));
// // } catch (err) {
// //     console.log(err.message);
// // }
// //
// // try {
// //     console.log(sum(4, 'A'));
// // } catch (err) {
// //     console.log(err.message);   // выводим поле message ошибки
// // }
// //
// // console.log(sum(4, 'B'));  // не найден catch - программа останавливается
//
// // Обходим остановку синхронной программы из-за ошибки без try и catch
// // Совмещаем синхронную программу, содержащую ошибку, с колбеком
//
// // const sum = (a, b) => {
// //     if (typeof a === 'number' && typeof b === 'number') {
// //         return [null, a + b];  // null - для контракта колбека вместо ошибки
// //     } else {
// //         return [new Error('a and b should be numbers')];   // как обойти стоп программы из-за ошибки -
// //     }  // просто обернуть ошибку в массив
// // };
// //
// // const cb = (err, data) => {
// // return('Это ошибка!!! ' + err + '\n' + 'Сумма: ' + data);
// // }
// //
// // console.log(sum(2, 3));
// // console.log(sum(7, 'A')); // ошибка - элемент массива - прог-ма не остановится
// //
// // console.log(cb(...sum(2, 3)));
// // console.log(cb(...sum(2, 'F')));
//
// // Обработка ошибок ассинхронных функции через колбек
//
// // const sum = (a, b, callback) => {             // ассинхронная функция с колбеком
// //     if (typeof a === 'number' && typeof b === 'number') {
// //         callback(null, a+b);
// //     } else {
// //         callback(new Error('a and b should be numbers'));
// //     }
// // };
// //
// // sum(2, 3, (err, result) => {
// //     if (err) {                              //  случае если функция возвращает ошибку через коллбек
// //         console.log(err.message);  // тогда коллбек по сути вместо try...catch и в нем обязательно должны быть
// //         return;             // проверка на существование ошибки и обработка ошибки
// //     }
// //     console.log(result);
// // });
// //
// // sum(7, 'A', (err, result) => {
// //     if (err) {
// //         console.log(err.message);
// //         return;
// //     }
// //     console.log(result);
// // });
//
// // обработка несловленных ошибок (неожиданных!) с помощью process.on
// // и дальнейшее закрытие проги для уничтожения утечек с помощью process.exit(1)
//
// // process.on('uncaughtException', err => {  // ловля непойманной ошибки
// //     console.log('on uncaughtException: ' + err.message);  // обработка ошибки
// //     process.exit(1);  // закрытие утечки, синхронное завершение проги со статусом кода
// // });  // код 1 - статус "сбой"
// //
// // const sum = (a, b) => {
// //     if (typeof a === 'number' && typeof b === 'number') {
// //         return a + b;
// //     } else {
// //         throw new Error('a and b should be numbers');  // создаем ошибку
// //     }
// // };
// //
// // console.log(sum(2, 3));
// // console.log(sum(7, 'A'));  // ошибка несловлена - ее ловит process.on
//
// // Обработка ошибок и результатов промисами
//
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
// //
// // /*
// // Самое что замечательное в промисах это всюду чейнинг.
// // then и catch возвращают старые промисы и вызывают и выполняют колбеки
// // reject возвращает старый промис, что был отклонен с указанной причиной
// // resolve возвращает старый промис что был выполнен с переданным значением
// //  */
//
// // Обработка ошибки у асинхронной функции, определенной с помощью
// // async. Оператор await
//
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
//
//
// const sum = (a, b) => new Promise((resolve, reject) => {
//     if (typeof a === 'number' && typeof b === 'number') {
//         resolve(a + b);
//     } else {
//         reject(new Error('a and b should be numbers'));
//     }
// });
//
// sum(4, 6)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error.message);
//
//     });
// // console.log(sum(7, 8));
//
//

console.log('[{"code": "", "name": "", "organization": {"icmid": "", "domain": "LIS.A0131.clients.bregis.ru", "name": ""}]'.length);
console.log('auth: "{"isAuthorized":true,"_persist":{"version":-1,"rehydrated":true}}", _persist: "{"version":-1,"rehydrated":true}"'.length);
console.log('isAuthorized: "true", _persist: "{"version":-1,"rehydrated":true}"'.length);
console.log('{"domain":"clients","icmid":["4b888b04-6b22-496a-acb6-8f43850d3769","5d3679e7-cca5-4fe6-8d7e-4869a2310d77","aee981d8-b227-4e9d-b51e-86b29cc75d51","4c7aa7b7-a6e2-46ba-9fb2-1686a7e19b81","325002f8-235e-43d0-9483-83f7cb6cbc64","d6b9a2e8-14c7-4322-a795-a8609452240f","18e5b0ab-2d8b-4af2-8feb-8707dcb45ca2","1ec774e9-6f08-4714-8239-2479ea3ba4fc","673fa45e-4aca-4b0a-885a-05e6ecd39c5d","50a09606-97b1-414a-b69e-1bbb3062d5ca","371b8ef1-09ab-4b32-9a65-315f48f316b7","ba560be2-5ac2-45c6-ad8c-03fe8ad8fffa","b750a47c-27a6-4f46-9a46-ead00fbb344c","6e65ea81-1454-43e1-84b9-a3f8b05436d6","bd806b1d-b0db-450d-be56-c0ebc1d8d754","803c1f45-2ddb-4fd5-a55b-78c7a1148c0a","5de9d650-8d03-4c00-b5e5-4dc1c5680e25","b1148134-154c-4517-867c-6d217ebe5f9d","46ef298e-5980-417c-a498-051071a0247a","a1312369-5a99-46bf-bffa-a50304cb886b"],"roles":["admin","lab","nurse","apiroutes","integrationterms","manager","termowner","coordinator"],"sessionTime":"180","username":"cadmin"}'.length);

console.log(new Date().toISOString());
