/* .. ваш код для filter, inBetween, inArray */
const arr = [1, 2, 3, 4, 5, 6, 7];

function filter(mas, funk()) {


    let a = funk.toString();
    console.log(a);
    function inBetween(a, b) {
        const nov = [];
        for (const i in mas) {
            const elm = mas[i];
            if (elm <= b && elm >= a) {
                nov.push(elm)
            }
        }
        return nov;
    };

    function inArray(srav) {
        const nov2 = [];
        for (const i in mas) {
            const elm = mas[i];
            if (srav.includes(elm)) {
                nov2.push(elm)
            }
        }
        return nov2;
    };
}



// console.log(filter(arr, function(a) {
//     return a % 2 == 0
// })); // 2,4,6

console.log( filter(arr, inBetween(3, 6)) ); // 3,4,5,6

// console.log( filter(arr, inArray([1, 2, 10])) ); // 1,2


