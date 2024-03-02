// /* .. ваш код для filter, inBetween, inArray */
// const arr = [1, 2, 3, 4, 5, 6, 7];
//
// function filter(mas, funk()) {
//
//
//     let a = funk.toString();
//     console.log(a);
//     function inBetween(a, b) {
//         const nov = [];
//         for (const i in mas) {
//             const elm = mas[i];
//             if (elm <= b && elm >= a) {
//                 nov.push(elm)
//             }
//         }
//         return nov;
//     };
//
//     function inArray(srav) {
//         const nov2 = [];
//         for (const i in mas) {
//             const elm = mas[i];
//             if (srav.includes(elm)) {
//                 nov2.push(elm)
//             }
//         }
//         return nov2;
//     };
// }
//
//
//
// // console.log(filter(arr, function(a) {
// //     return a % 2 == 0
// // })); // 2,4,6
//
// console.log( filter(arr, inBetween(3, 6)) ); // 3,4,5,6
//
// // console.log( filter(arr, inArray([1, 2, 10])) ); // 1,2
//
//

// const g = {
//     d: 'hhjhj',
//     f() {
//        return 5;
//     }
// }
// console.log(
//     Object.entries(g).map(([key, value]) => {
//   if (typeof value !== 'function') {
//     return `${key}: ${value}`
//   } else {
//     return 'null'
//   }
// }).join(', '))

// const str = '-1410.48px';
// const obr = str.slice(0,-2);
// const num = Number(obr);
//
// console.log('str ', str);
// console.log('obr ', obr);
// console.log('num ', num);
// console.log('num abs ', Math.round(Math.abs(num)));




let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(elm => ({value: elm}))
let size = 3; //размер подмассива
let subarray = []; //массив в который будет выведен результат.
const rowNumber = Math.ceil(array.length/size) // количество эл-тов в строке
for (let i = 0; i < rowNumber; i++){
    subarray[i] = array.slice((i*size), (i*size) + size).map((elm, index) => {
        elm.orderInSlider = index * rowNumber + i
        return elm
    });
}
console.log(subarray);










