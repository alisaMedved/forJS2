'use strict';

// Не забудь ; когда выносишь объявление переменной за цикл
// let i = 0;
// for (; i < 3; i++) {
//     console.log(i);
// }

// Цикл с предусловием
//
// let a = 0;
// while (a < 10) {
//     console.log(a++);
// }
//
// // Цикл с постусловием
//
// let i = 0;
// do {
//     console.log(i++)
// } while (i < 10);
//
// // for in object
//
// const hash = {
//     first: 7,
//     second: 10,
//     third: 1,
//     fourth: 5,
// };
//
// for (const key in hash) {
//     console.log(key + ' : ' + hash[key]);
// }

// for-in-array

// const numbers = [7, 10, 1, 5, 2];
// numbers.field2 = 'Value2';
// numbers[-10] = 'Value3';
// numbers.field1 = 'Value1';
// numbers[5] = 20;
//
// for (const i in numbers) {
//     const value = numbers[i];
//     console.log(i, typeof i, value);
// }

// for-of-array

// const numbers = [7, 10, 1, 5, 2];
// numbers.field2 = 'Value2';
// numbers[-10] = 'Value3';
// numbers.field1 = 'Value1';
// numbers[5] = 20;
//
// for (const value of numbers) {
//     console.log(value, typeof value);
// }

// Switch and break

// const a ='m';
// switch (a) {
//     case 'banan':
//         console.log('banan');
//         break;
//     case 'apple':
//         console.log('apple');
//         break;
//     case 'mango':
//         console.log('mango');
//         break;
//     // default:
//     //     console.log('default');
// }
//
// console.log('meow');

// break прерывает циклы
//
// let a = 0;
// while (a < 10) {
//     console.log(a++);
//     if (a === 5) break;
// }

// break прерывает выполнение блока оператора
// и затем сразу переходит на выполнение следующего блока оператора

// label1: {
//     console.log(1);
//     label2: {
//         console.log(2);
//         break label1;    // имена обязательны! иначе ошибка
//         console.log(3);
//     }
//     console.log(4);
// }
// console.log(5);

