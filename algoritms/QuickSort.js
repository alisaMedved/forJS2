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
// способ без мутации данных - он не экономичен по памяти, но быстрее
// const list = [3, 2, 1, 5, 3, 11, 0];
//
// function quickSort(arr) {
//     console.log('arr ', arr)
//     if (arr.length < 2) {
//         return arr;
//     }
//     const pivot = arr[0];
//     const less = [];
//     const greater = [];
//     for (let i = 1; i < arr.length; i++) {
//         console.log('pivot ', pivot);
//         console.log('arr[i] ', arr[i]);
//         console.log('i ', i);
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
//
// // при pivot = arr[0] сложность O(n^2)
//
// // Делаем pivot по серединке и превращаем сложность в O(logN*N);
// //
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
//
// console.log(quickSort(list));

// Теперь делаем quick sort с перестановками

const list = [3, 2, 1, 5, 3, 11, 0];

function quickSort(arr) {
 return quickSortHelper(arr, 0, arr.length - 1);
}

function quickSortHelper (arr, leftIndex, rightIndex) {
    if (arr.length < 2) {
        return arr;
    }
    const index = partition(arr, leftIndex, rightIndex)
    if (leftIndex < index - 1) {
        quickSortHelper(arr, leftIndex, index - 1)
    }
    if (index < rightIndex) {
        quickSortHelper(arr, index, rightIndex)
    }

    return arr;
}

function partition(arr, leftIndex, rightIndex) {
    const pivot = arr[Math.floor((leftIndex + rightIndex)/2)];

    while (leftIndex <= rightIndex) {
        while (arr[leftIndex] < pivot) {
            leftIndex ++
        }

        while (arr[rightIndex] > pivot) {
            rightIndex --
        }

        if (leftIndex <= rightIndex) {
            swap(arr, leftIndex, rightIndex);
            leftIndex ++
            rightIndex --
        }
    }
    return leftIndex;
}

function swap(arr, i, j) {
    const temporaryConst = arr[i];
    arr[i] = arr[j];
    arr[j] = temporaryConst
    return arr;
}

console.log(quickSort(list));

