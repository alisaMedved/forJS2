// // Различия for of и for in
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
    console.log(i); // выведет 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
    if (iterable.hasOwnProperty(i)) {
        console.log(i); // выведет 0, 1, 2, "foo"
    }
}

for (let i of iterable) {
    console.log(i); // выведет 3, 5, 7
}

/**
 * 1) for in перечисляет в ПРОИЗВОЛЬНОМ порядке
 * for of - в ПОРЯДКЕ ДОБАВЛЕНИЯ
 * 2) for in перечисляет КЛЮЧИ
 * for of - ЗНАЧЕНИЯ
 * 3) for in перечисляет все СВОЙСТВА объявленные
 * for of перечисляет ТОЛЬКО те свойства, которые определены в способе его перебора, т.е. не свойства объекта, а значения массива
 * Это означает также что for of применим только для итерируемых структур данных, а for in применим как для итерируемых
 * так и не для итерируемых структур данных
 */
const Arr =
console.log(Arr);

