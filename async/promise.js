// const promise1 = Promise.resolve(1);
// const promise2 = Promise.resolve(2);
// const promise3 = Promise.reject('error!');
// const promise4 = Promise.resolve(4);
//
// Promise.all([promise1, promise2, promise3, promise4])
//     .then((value) => {console.log('all resolve ', value)}, (err) => {console.log('all reject ', err)})
// Promise.allSettled([promise1, promise2, promise3, promise4])
//     .then((value) => {console.log('allSettled resolve ', value)})
//     // .catch((err) => {console.log('allSettled reject ', err)})
// Promise.all([promise1, promise2, promise4])
//     .then((value) => {console.log('all resolve ', value)})
//     .catch((err) => {console.log('all reject ', err)})
//
// // allSettled resolve  [
// //     { status: 'fulfilled', value: 1 },
// //         { status: 'fulfilled', value: 2 },
// //         { status: 'rejected', reason: 'error!' },
// //         { status: 'fulfilled', value: 4 }
// //     ]
// // all resolve  [ 1, 2, 4 ]
// // all reject  error!

/**
 * Разница между allSettled и all
 * Оба они относятся к методам параллелизма обещаний.
 * НО:
 * 1) Если в масссиве промисов хоть один промис реджекнется, то all выйдет в catch,
 * и никакие then он не выполнит
 * (правильнее сказать он выполнит onRejected - в then же можно обработчик и для rejected поставить).
 * allSettled пропустит реджекнувшиеся промисы и выведет все, как и реджекнувшиеся
 * так и зарезолвленные. То есть нету смысла писать catch после allSettled, а вот с
 * all лучше бы этого не забывать (ну или второй обработчик писать в then).
 *
 *2) Оба вернут массивы, но у allSettled он с более широким описанием. То есть если
 * у all просто массив значений, которыми зарезолвились промисы. То у allSettled
 * массив объектов с полями status, value, reason.
 *
 * Вывод: Получается all хорош тогда когда для дальнейшего кода, который должен выполнятся после массива
 * промисов, важно и необходимо чтобы зарезолвились все промисы массива. А allSettled
 * хорош тогда когда для дальнейшего кода, который должен выполнятся после массива
 * промисов, не нужно чтобы все промисы зарезолвились, но важно прокинуть дальше результат каждого.
 */

// const promise1 = Promise.resolve(1);
// const promise2 = Promise.reject('error!');

// promise1
//     .finally(() => {
//     console.log('А я без аргументов и пофиг мне reject или resolve')
//     })
//     .then((value) => {
//         console.log(value)
//     })
// promise1
//     .then((value) => {
//         console.log(value)
//     })
//     .then((value) => {
//         console.log(value)
//     })
// promise2
//     .catch((err) => {
//         console.log(err)
//     })
//     .then((value) => {
//         console.log(value)
//     })
// const promise3 = promise2.finally(() => {
//     console.log('А я без аргументов и пофиг мне reject или resolve')
// })
//     .catch((err) => {
//         console.log(err)
//     })
// Promise.allSettled([promise3]).then((val) => {console.log(val)})
/**
 *
 * 1) finally не получает аргументов, так как не существует способа определить,
 * будет ли промис выполнен успешно или с ошибкой.
 * Данный метод необходимо использовать, если не важна причина ошибки или результат успешного выполнения и,
 * следовательно, нет необходимости её/его передавать.
 *
 * 2) В отличие от Promise.resolve(2).then(() => {}, () => {})
 * (результатом которого будет resolved-промис, со значением undefined),
 * результатом Promise.resolve(2).finally(() => {}) будет resolved-промис со значением 2.
 *
 * 3) Аналогично, в отличии от Promise.reject(3).then(() => {}, () => {})
 * (результатом которого будет resolved-промис, со значением undefined),
 * результатом Promise.reject(3).finally(() => {}) будет rejected-промис со значением 3.
 *
 * 4) В отличие от Promise.reject(3).catch(() => {})
 * (результатом которого будет RESOLVED-промис, со значением undefined),
 * результатом Promise.resolve(2).finally(() => {}) будет rejected-промис со значением 3.
 */

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 500, 'one');
// });
//
// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 'two');
// });
//
// Promise.race([promise1, promise2]).then((value) => {
//     console.log(value);
//     // Both resolve, but promise2 is faster
// });
// // Expected output: "two"

/**
 * Новый метод race гонки потрясающе возвращает результат с которым зарезолвился или ошибку
 * ТОЛЬКО самого первого промиса
 */
// const promise1 = Promise.resolve(1)
// const promise2 = Promise.reject(2)
// const promise3 = Promise.reject(3)
// Promise.any([promise2, promise3, promise1])
//     .then((val) => {
//         console.log('resolved ', val)
//     })
//     .catch((err) => {
//         console.log('error ', err)
//     })
//
// Promise.any([promise2, promise3])
//     .then((val) => {
//         console.log('resolved ', val)
//     })
//     .catch((err) => {
//         console.log('error ', err)
//     })

/**
 * Противоположность all - выводит ТОЛЬКО первый зарезолвленный, даже сесли перед ним куча реджекнулись.
 * А если нет зарезолвленных? Тогда все таки попадет в catch и выведет либо Error либо Agregate error
 */