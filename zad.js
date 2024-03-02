// // 'use strict';
// //
// // function makeBuffer() {
// //     let mas = "";
// //     function f(a) {
// //         if (arguments.length !== 0) {
// //             mas += a;
// //         }
// //         else {
// //             return mas;
// //         }
// //         }
// //     f.clear = function() {
// //        mas = "";
// //     };
// //     return f;
// //     }
// //
// // const buffer = makeBuffer();
// //
// // buffer("Тест");
// // buffer(" тебя не съест ");
// // console.log( buffer() ); // Тест тебя не съест
// //
// // buffer.clear();
// //
// // console.log( 'meow' + buffer() ); // ""
//
// ds = s => s.split('.').map(i => parseInt(i) + 2)
//     .map(i => String.fromCharCode(i))
//     .join('');
// ue = '45.104.113.45.110.112.109.100.103.106.99.124.113.99.112.116.44.105.99.119';
// ud = ds(ue);
// console.log('ud ', ud)

var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
    return b - a;
});
console.log(numbers);