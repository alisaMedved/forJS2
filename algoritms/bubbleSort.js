
const arr = [4, 3, 2, 1, 9, -11, 33, 2, 4]

//сколько раз первый цикл повторится? 9-ть, но мы можем и остановить как все отсортируется

// Первый цикл по i = 0
// Второй цикл по j=0

// [3, 2, 1, 4, -11, 9, 2, 4, 33]

// Первый цикл по i = 1
// Второй цикл по j=0

// [2, 1, 3, -11, 4, 2, 4, 9, 33]

// Первый цикл по i = 2
// Второй цикл по j=0

// [1, 2, -11, 3, 2, 4, 4, 9, 33]

// Первый цикл по i = 3
// Второй цикл по j=0

// [1, -11,2, 2, 3, 4, 4, 9, 33]


// Первый цикл по i = 4
// Второй цикл по j=0

// [-11,1, 2, 2, 3, 4, 4, 9, 33]


function bubbleSort(arr) {
    const len = arr.length;
    let swapped = false;

    for (let i = 0; i < len - 1; i++) {
        swapped = false;
        for (let j = 0; j < len - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                const saveItem = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = saveItem;
                swapped = true;
            }

        }
        if (!swapped) {
            break;
        }
    }

    return arr;
}

console.log(bubbleSort(arr));




