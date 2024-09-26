
// Пример №1
const mas1 = [1, 2, 8];
let arr = new Array(58);
const nov = [...mas1, ...arr];
console.log(nov + '  ' + typeof nov);
console.log(arr.length);


// Пример №2 Склеивание массивов - одинаковые элементы не теряются

const mas1ForConcat = [12, 58, 69];
const mas2ForConcat =[69, 200];
const nov1 = mas1ForConcat.concat(mas2ForConcat);
const nov2 = [...mas1ForConcat, ...mas2ForConcat];
console.dir( {nov1, nov2});

// Пример №3 Массив пустых элементов (прям пустота дырки, это не undefined) сделанный через new Array не итерируется в цикле for in

// "литерал массива" (array literal) или "инициализатор массива" - более предпочтительна согласно mdn
const oneWay = ['45', 67, 89, Symbol('rgt'), {a: 'vr'},, function men () {return 4;}];
console.log('oneWay ', oneWay)

// вот тут забавно - каждый эл-т является пустым значением (не undefined!, undefined он ыписывается
// от того что node попытался до него дотянутся а не смог индетифицировать дырку) и циклом for in по этому массиву невозможно пройти
// при этом он является итерируемым и циклом for of пройти можно. И как видим на примере oneWay - причина отсутсвии итерации for in не
// в дырках

const anotherWay = new Array(9);
const iterator1 = anotherWay[Symbol.iterator]();

for (const value of iterator1) {
    console.log('iterator1 ', value);
}
// for of цикл по значениям
for (const value of anotherWay) {
    console.log('for of ', value);
}
// for in цикл по ключам то бишь индексам - вообще не заводится
for (const value in anotherWay) {
    console.log('for in ', value);
}

// вот теперь фиксим это с помощью fill
anotherWay.fill(5);

for (const value in anotherWay) {
    console.log('for in ', value);
}

const iterator2 = oneWay[Symbol.iterator]();

for (const value of iterator2) {
    console.log('iterator1 ', value);
}
// for of цикл по значениям
for (const value of oneWay) {
    console.log('for of ', value);
}
// for in цикл по ключам то бишь индексам - вообще не заводится
for (const value in oneWay) {
    console.log('for in ', value);
}

// Пример №4 forEach не создает новый массив в отличие от map!

const numbers = [7, 10, 1, 5, 2];
console.log(numbers);
numbers.forEach((f, i, arr) => {
    f = f * 2
});
console.log(numbers);

// Пример №5 Теперь итераторы массива можно вытаскивать с помощью метода Array.values и Array.entries

const arrayWithIterator = ['45', 67, 89, Symbol('rgt'), {a: 'vr'},, function men () {return 4;}];

const iteratorOfArray1 = arrayWithIterator[Symbol.iterator]();

for (const value of iteratorOfArray1) {
    console.log('iteratorOfArray1 ', value);
}

const iteratorOfArray2 = arrayWithIterator.values();

for (const value of iteratorOfArray2) {
    console.log('iteratorOfArray2 ', value);
}

console.log('iteratorOfArray1 === iteratorOfArray2 ', iteratorOfArray1 === iteratorOfArray2) // false

// итератор массива с парами [индекс, значение] - Array.entries

const iteratorOfArray3 = arrayWithIterator.entries();

for (const value of iteratorOfArray3) {
    console.log('iteratorOfArray3 ', value);
}

// Пример №6 Array.fromAsync vs Promise.all
// ЭТОТ ПРИМЕР ЗАВОДИ В CHROME - в node Array.fromAsync пока нет
/**
 * Вообще из чего-то получить массив можно несколькими способами
 * spread in [], new Array, Array.from, Array.fromAsync, Array.of
 */

/**
 * Array.fromAsync() последовательно ожидает каждое значение, полученное из объекта.
 * Promise.all() ожидает все значения одновременно.
 */
// function* makeIterableOfPromises() {
//     for (let i = 0; i < 5; i++) {
//         yield new Promise((resolve) => setTimeout(resolve,100, 5));
//     }
// }
//
(async () => {
    console.time("Array.fromAsync() time");
    const arrayOfResolvedValues1 = await Array.fromAsync(makeIterableOfPromises());
    console.timeEnd("Array.fromAsync() time");
    // Array.fromAsync() time: 503.610ms

    console.log('arrayOfResolvedValues1 ', arrayOfResolvedValues1)

    console.time("Promise.all() time");
    const arrayOfResolvedValues2 = await Promise.all(makeIterableOfPromises());
    console.timeEnd("Promise.all() time");
    // Promise.all() time: 101.728ms

    console.log('arrayOfResolvedValues2 ', arrayOfResolvedValues2)
})();

// Пример №7 Новые немутирующие методы toSorted toSpliced toReversed

/** sort меняет исходный массив, toSorted создает новый отсортированный массив
также помним что в вкрсиях до 2019 стабильность сортировки не гарантировалась **/

// Раньше sort возвращал ссылку на исходный уже мутированный массив
    // Теперь toSorted возвращает новый немутированный массив

const arrayForSort = [3, 11, 8, 45, 6, 0];
console.log('arrayForSort ', arrayForSort)

const sortedArray1 = arrayForSort.toSorted((a, b) => {return a - b })
console.log('arrayForSort ', arrayForSort)
console.log('sortedArray1 ', sortedArray1)

const sortedArray2 = arrayForSort.sort((a, b) => {return a - b })
console.log('arrayForSort ', arrayForSort)
console.log('sortedArray2 ', sortedArray2)
console.log('sortedArray2 === arrayForSort ', sortedArray2 === arrayForSort)

// Раньше splice возвращал массив удаленных элементов
// Теперь toSpliced возвращает новый немутированный массив

const arrayForSplice = ["angel", "clown", "drum", "sturgeon"];
console.log('arrayForSplice ', arrayForSplice)

const splicedArray = arrayForSplice.toSpliced(2, 1, "trumpet")
console.log('arrayForSplice ', arrayForSplice)
console.log('splicedArray ', splicedArray)

const removedElements = arrayForSplice.splice(2, 1, "trumpet");
console.log('arrayForSplice ', arrayForSplice)
console.log('removedElements ', removedElements)

// Раньше reverse возвращал ссылку на исходный уже мутированный массив
// Теперь toReversed возвращает новый немутированный массив

const arrayForReverse = ['one', 'two', 'three'];
console.log('arrayForReverse: ', arrayForReverse);

const reversedArray1 = arrayForReverse.toReversed();
console.log('arrayForReverse: ', arrayForReverse);
console.log('reversedArray1: ', reversedArray1);

const reversedArray2 = arrayForReverse.reverse();
console.log('arrayForReverse: ', arrayForReverse);
console.log('reversedArray1: ', reversedArray2);
console.log('arrayForReverse === reversedArray1 ', arrayForReverse === reversedArray2);

// Пример №8 Новые методы поиска в массиве, которые ищут с конца массива
// findLast, findLastIndex, lastOfIndex

const arrayForSearch = [1, 3, 4, 6, 98, 90, 6, 80, 101]

const isEven = (elm) => {return elm % 2 === 0}

const firstSearchedElement = arrayForSearch.find(isEven)
const lastSearchedElement = arrayForSearch.findLast(isEven)
console.log('firstSearchedElement ', firstSearchedElement)
console.log('lastSearchedElement ', lastSearchedElement)

const firstSearchedIndex = arrayForSearch.findIndex(isEven)
const lastSearchedIndex = arrayForSearch.findLastIndex(isEven)
console.log('firstSearchedIndex ', firstSearchedIndex)
console.log('lastSearchedIndex ', lastSearchedIndex)

// у них также есть второй аргумент: с какого индекса начинать поиск
const firstSearchedIndex1 = arrayForSearch.indexOf(6)
const lastSearchedIndex1 = arrayForSearch.lastIndexOf(6)
console.log('firstSearchedIndex1 ', firstSearchedIndex1)
console.log('lastSearchedIndex1 ', lastSearchedIndex1)

// Есть также новый reduce, который ходит справа Array.prototype.reduceRight

// Пример №9 Новый оптимизированный метод flatMap = flat(Infinity) + map

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let arr1 = [1, 2, 3, 4];

arr1.flatMap((x) => [x * 2]);
// [2, 4, 6, 8]

arr1.flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]

// Пример №10 Вызов элемента с данным индексом с помощью [] и Array.at

const array1 = [5, 12, 8, 130, 44];

console.log(array1.at(-2)) // 130
console.log(array1[array1.length - 2]) // 130

// Пример №11 Немутирующее переприсвоение с with

/**
 * У нас уже есть для замены элемента splice и toSpliced, а теперь еще и with
 * Но в with можно только один эл-т менять и для одного эл-та это более короткий синтаксис
 * With стоит рассматривать как немутирующую альтернативу переприсвоению с []
 */

const arrayForChanges = [5, 12, 8, 130, 44];
console.log('arrayForChanges ', arrayForChanges)

const changedArray = arrayForChanges.with(-2, 67)
console.log('arrayForChanges ', arrayForChanges)
console.log('changedArray ', changedArray)

arrayForChanges[arrayForChanges.length - 2] = 67
console.log('arrayForChanges ', arrayForChanges)

// Пример №12 Старый метод о котором мы не знали copyWithin (метод мутирующий)
    const arrayForPaste = [1, 2, 3, 4, 5]
arrayForPaste.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]


