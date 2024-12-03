// const arr = [1, 6, 9, 3, 20, 9, 11, -11, 33, 5, 7];
//
// // function quickSort(notSortedArr) {
// //     if (notSortedArr.length < 2) {
// //         return notSortedArr;
// //     }
// //     const pivotIndex = Math.floor(notSortedArr.length / 2);
// //     const pivot = notSortedArr[pivotIndex];
// //     const grater = [];
// //     const less = [];
// //     for (let i = 0; i < notSortedArr.length; i++) {
// //         if (i === pivotIndex) {
// //             continue;
// //         }
// //         if (notSortedArr[i] >= pivot) {
// //             grater.push(notSortedArr[i]);
// //         } else {
// //             less.push(notSortedArr[i]);
// //         }
// //     }
// //     return [...quickSort(less), pivot, ...quickSort(grater)];
// //}
//
// // console.log(quickSort(arr));
//
//
// function binarySearch(arrSorted, searchElm) {
//     let left = -1;
//     let right = arrSorted.length;
//     while (right - left > 1) {
//         const middle = Math.floor((left + right) / 2);
//         if (searchElm === arrSorted[middle]) {
//             return middle;
//         }
//         else if (searchElm > arrSorted[middle]) {
//             left = middle;
//         } else {
//             right = middle;
//         }
//     }
//     return false;
// }
//
// const arrSorted = [
//     -11, 1, 3,  5,  6,
//     7, 9, 9, 11, 20,
//     33
// ]
//
// console.log(binarySearch(arrSorted, 8));
// console.log(binarySearch(arrSorted, 11));
// console.log(binarySearch(arrSorted, 7));
//
// function quickSort(arr) {
//     return quickSortHelper(arr, 0, arr.length - 1);
// }
//
// function quickSortHelper (arr, leftIndex, rightIndex) {
//     if (arr.length < 2) {
//         return arr;
//     }
//     const index = partition(arr, leftIndex, rightIndex)
//     if (leftIndex < index - 1) {
//         quickSortHelper(arr, leftIndex, index - 1)
//     }
//     if (index < rightIndex) {
//         quickSortHelper(arr, index, rightIndex)
//     }
//
//     return arr;
// }
//
// function partition(arr, leftIndex, rightIndex) {
//     const pivot = arr[Math.floor((leftIndex + rightIndex)/2)];
//
//     while (leftIndex <= rightIndex) {
//         while (arr[leftIndex] < pivot) {
//             leftIndex ++
//         }
//
//         while (arr[rightIndex] > pivot) {
//             rightIndex --
//         }
//
//         if (leftIndex <= rightIndex) {
//             swap(arr, leftIndex, rightIndex);
//             leftIndex ++
//             rightIndex --
//         }
//     }
//     return leftIndex;
// }
//
// function swap(arr, i, j) {
//     const temporaryConst = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temporaryConst
//     return arr;
// }
//
// console.log(quickSort(arr));


const obj = {a: 1, b: 2, c: {a: 1, b: [56, 78]}}

// const copy = Object.assign({}, obj);
 const copy = JSON.parse(JSON.stringify(obj))