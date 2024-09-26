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



//
// let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(elm => ({value: elm}))
// let size = 3; //размер подмассива
// let subarray = []; //массив в который будет выведен результат.
// const rowNumber = Math.ceil(array.length/size) // количество эл-тов в строке
// for (let i = 0; i < rowNumber; i++){
//     subarray[i] = array.slice((i*size), (i*size) + size).map((elm, index) => {
//         elm.orderInSlider = index * rowNumber + i
//         return elm
//     });
// }
// console.log(subarray);

// const r = [
//     {
//         "id": "6616b49565cfbe83452b22ca",
//         "alt": "jungle",
//         "filename": "12188_0.jpg",
//         "mimeType": "image/jpeg",
//         "filesize": 205787,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:47:33.127Z",
//         "updatedAt": "2024-04-10T15:47:33.127Z",
//         "url": "/media/12188_0.jpg"
//     },
//     {
//         "id": "6616b48665cfbe83452b22bb",
//         "alt": "plink",
//         "filename": "12106_0.png",
//         "mimeType": "image/png",
//         "filesize": 145041,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:47:18.731Z",
//         "updatedAt": "2024-04-10T15:47:18.731Z",
//         "url": "/media/12106_0.png"
//     },
//     {
//         "id": "6616b47865cfbe83452b22ac",
//         "alt": "thimble",
//         "filename": "12105_0.png",
//         "mimeType": "image/png",
//         "filesize": 242032,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:47:04.909Z",
//         "updatedAt": "2024-04-10T15:47:04.909Z",
//         "url": "/media/12105_0.png"
//     },
//     {
//         "id": "6616b46a65cfbe83452b229d",
//         "alt": "ra",
//         "filename": "12081_1.png",
//         "mimeType": "image/png",
//         "filesize": 308575,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:46:50.683Z",
//         "updatedAt": "2024-04-10T15:46:50.683Z",
//         "url": "/media/12081_1.png"
//     },
//     {
//         "id": "6616b45f65cfbe83452b228e",
//         "alt": "gold ra",
//         "filename": "12081_0.png",
//         "mimeType": "image/png",
//         "filesize": 278483,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:46:39.322Z",
//         "updatedAt": "2024-04-10T15:46:39.322Z",
//         "url": "/media/12081_0.png"
//     },
//     {
//         "id": "6616b45365cfbe83452b227f",
//         "alt": "black jack",
//         "filename": "8100_1.png",
//         "mimeType": "image/png",
//         "filesize": 247327,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:46:27.692Z",
//         "updatedAt": "2024-04-10T15:46:27.692Z",
//         "url": "/media/8100_1.png"
//     },
//     {
//         "id": "6616b44465cfbe83452b2270",
//         "alt": "keno",
//         "filename": "8098_1.png",
//         "mimeType": "image/png",
//         "filesize": 247213,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:46:12.684Z",
//         "updatedAt": "2024-04-10T15:46:12.684Z",
//         "url": "/media/8098_1.png"
//     },
//     {
//         "id": "6616b43965cfbe83452b225f",
//         "alt": "penalty",
//         "filename": "6492_1.png",
//         "mimeType": "image/png",
//         "filesize": 262434,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:46:01.469Z",
//         "updatedAt": "2024-04-10T15:46:01.469Z",
//         "url": "/media/6492_1.png"
//     },
//     {
//         "id": "6616b42c65cfbe83452b2250",
//         "alt": "rocket",
//         "filename": "5935_1.png",
//         "mimeType": "image/png",
//         "filesize": 234411,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:45:48.139Z",
//         "updatedAt": "2024-04-10T15:45:48.139Z",
//         "url": "/media/5935_1.png"
//     },
//     {
//         "id": "6616b41d65cfbe83452b2241",
//         "alt": "dragon",
//         "filename": "5339_1.png",
//         "mimeType": "image/png",
//         "filesize": 316460,
//         "width": 380,
//         "height": 380,
//         "createdAt": "2024-04-10T15:45:33.794Z",
//         "updatedAt": "2024-04-10T15:45:33.794Z",
//         "url": "/media/5339_1.png"
//     }
// ]
//
// const tr = r.map((elm) => (elm.id))
// console.log(tr);
//
// const arrayForCycle = new Array(3).fill(6).map((elm, ind) => ind)
//
// console.log('arrayForCycle ', arrayForCycle)
// const games = [1, 2, 3]
// games.splice(1, 0, '56')
// console.log('games ', games)
//
//
// const tre = "Desktop & Mobile".replace(/\W/gi, ' ').toLowerCase().split(/\s+/)
// console.log(tre);
//
// const newDate = new Date("06\/28\/2022".replace(/\\/gi, ''))
// const fgt=  newDate.toISOString();
// console.log(fgt);

const theme = new Set(['egypt', 'new_year', 'christmas', 'halloween']);
console.log(theme[1]);