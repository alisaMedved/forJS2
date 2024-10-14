
let countShell = 0
let notSorted = [3, 2,5, 1, 44, 13, 55, 1, 0, 48, 54, 3, 99, 47, 13, 101];
function shellSort(arr) {
    for (let step = Math.floor(arr.length / 2); step > 0; step = Math.floor(step / 2)) {
        for (let pass = step; pass < arr.length; pass++) {
            for (let replacement = pass - step;
                 replacement >= 0 && arr[replacement] > arr[replacement + step];
                 replacement -= step) {
                let savedValue = arr[replacement];
                arr[replacement] = arr[replacement + step];
                arr[replacement + step] = savedValue;
                countShell++
            }
        }
    }
    return arr;
}
console.log(shellSort(notSorted));