// // Quick sort Быстрая сортировка - Адгоритм сортировки разделяй и властвуй
// // Два пути экономичнее по памяти
// // Второй путь экономичнее по времени
//
// // Это самый быстрый алгоритм сортировки из всех существующих
//
// /**
//  * 1) Выбрать опорный элемент
//  * 2) Разделить массив на два подмассива: больше опорного эл-та, меньше опорного эл-та
//  * 3) Рекурсивно применить сортировку ко двум подмассивам
//  */
//
// const list = [3, 2, 1, 5, 3, 11, 0];
//
// function quickSort(arr) {
//     if (arr.length < 2) {
//         return arr;
//     }
//     const pivot = arr[0];
//     const less = [];
//     const greater = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] <= pivot) {
//             less.push(arr[i])
//         } else {
//             greater.push(arr[i])
//         }
//     }
//     return [...quickSort(less), pivot, ...quickSort(greater)]
// }
// //
// console.log(quickSort(list));

// при pivot = arr[0] сложность O(n^2)

// Делаем pivot по серединке и превращаем сложность в O(logN*N);
//
// const list = [3, 2, 1, 5, 3, 11, 0];
//
// function quickSort(arr) {
//     if (arr.length < 2) {
//         return arr;
//     }
//     const pivotIndex = Math.floor(arr.length / 2);
//     const pivot = arr[pivotIndex];
//     const less = [];
//     const greater = [];
//
//     for (let i = 0; i < arr.length; i++) {
//         if (i === pivotIndex) {
//             continue;
//         }
//         if (arr[i] <= pivot) {
//             less.push(arr[i])
//         } else {
//             greater.push(arr[i])
//         }
//     }
//     return [...quickSort(less), pivot, ...quickSort(greater)]
// }
// //
// console.log(quickSort(list));

// Теперь делаем quick sort с перестановками



