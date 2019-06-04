'use strict';

// Set и его методы

// const cities = new Set();
// cities.add('Beijing');
//
// ['Kiev', 'London', 'Baghdad'].forEach(city => cities.add(city));
//
// cities.delete('Baghdad');
//
// console.dir({cities});
//
// if (cities.has('Kiev')) {
//     console.log('cities contains Kiev');
// }
//
// console.dir({ keys: cities.keys() }); // эти 3 метода возвращают итераторы
// console.dir({ values: cities.values() });
// console.log( cities.entries() );
//
// cities.clear();
// console.dir({cities});

// Set не может содержать одинаковых значений

// const distinct = dataset => {
//     const keys = new Set();
//     return dataset.filter(record => {
//         const cols = Object.keys(record).sort();  // одинаковый порядок ключей для каждого объекта
//         const key = cols.map(field => record[field]).join('\x00'); // каждый объект прев-ся в строку его значений
//         const has = keys.has(key);
// if (!has) keys.add(key);
// return !has;
//     });
// };
//
// const flights = [
//     { from: 'Kiev', to: 'Rome' },
//     { from: 'Kiev', to: 'Warsaw' },
//     { from: 'Dublin', to: 'Riga' },
//     { from: 'Riga', to: 'Dublin' },
//     { from: 'Kiev', to: 'Rome' },
//     { from: 'Cairo', to: 'Paris' },
// ];
//
// console.dir({ flights });
//
// const directions = distinct(flights);
// console.dir({ directions });
//
// const nset = new Set(flights);
// console.log(nset);  /* Set не может содержать одинаковых значений
// но если эти ссылочные объекты JS - значения ссылаются на разные объекты,
// то они не являются одинаковыми и оба в сете остаются. */

// Делаем сеты и их операции на массивах (сами ручками велосипед создаем)

// const union = (s1, s2) => {   // объединение
//     const ds = s1.slice(0);
//     for (let i = 0; i< s2.length; i++) {
//         const item = s2[i];
//         if (!ds.includes(item)) ds.push(item);
//     }
//     return ds;
// };
//
// const intersection = (s1, s2) => {  // пересечение
//     const ds =[];
//     for (let i = 0; i < s1.length; i++) {
//         const item = s1[i];
//         if (s2.includes(item)) ds.push(item);
//     }
//     return ds;
// };
//
// const difference = (s1, s2) => {  // разница
//     const ds =[];
//     for (let i = 0; i < s1.length; i++) {
//         const item = s1[i];
//         if (!s2.includes(item)) ds.push(item);
//     }
//     return ds;
// };
//
// const complement = (s1, s2) => difference(s2, s1);  // обратная разница
//
// const cities1 = ['Beijing', 'Kiev'];
// const cities2 = ['Kiev', 'London', 'Baghdad'];
//
// const operations = [union, intersection, difference, complement];
//
// const results = operations.map(operation => ({
//    [operation.name]: operation(cities1, cities2)
// }));
//
// console.dir({ cities1, cities2 });
// console.dir(results);

// Сеты и их операции

// const union = (s1, s2) => new Set([...s1, ...s2]) // перевод сета в массив
// // аргументов с помощью spread оператора. Объединение
//
// const intersection = (s1, s2) => new Set(
//     [...s1].filter(v => s2.has(v))
// ); // пересечение
//
// const difference = (s1, s2) => new Set([...s1].filter(v => !s2.has(v))
// ); // разница
//
// const complement = (s1, s2) => difference(s2, s1);
//
// const cities1 = new Set(['Beijing', 'Kiev']);
// const cities2 = new Set (['Kiev', 'London', 'Baghdad']);
// const operations = [union, intersection, difference, complement];
//
// const results = operations.map(operation => ({
//     [operation.name]: operation(cities1, cities2)
// }));
//
// console.dir({ cities1, cities2 });
// console.dir(results);

//WeakSet
// const cities = new Set([
//     { name: 'Beijing' },
//     { name: 'Kiev' },
//     { name: 'London' },
//     { name: 'Baghdad' },
//     [45, 588, 69],
//     // Symbol('fire!') // В WeakSet значениями могут быть только объекты JS,
//     // но не примитивные типы данных
// ]);
//
// const list = new WeakSet();
// for (const city of cities) {
//     console.log('Add city', city, 'to WeakSet');
//     list.add(city);
// }
//
// console.dir({ cities, list });
//
// const iterator = cities.values();
// const beijing = iterator.next().value;
// console.log('select', beijing);
//
// console.log(iterator.next());
//
// const london = iterator.next().value;
// console.log('select', london);
//
// cities.delete(london);
// console.log('remove', london, 'from Set');
//
// list.delete(beijing);
// console.log('remove', beijing, 'from WeakSet');
//
// for (const city of cities) {
//     console.log('City', city, 'in WeakSet', list.has(city));
// }



// Использование spread оператора

// Для литералов объекта (новое в ECMAScript 2018)

// const obj = {
//     1: 'jjj',
//     2: '55',
//     3: 'uuuu',
// };
// const obj1 = {
//     hj: 56,
//     jku: 598,
//     kiqw: 600,
// };
// const clone = {...obj, ...obj1};
// console.log(obj);
// console.log(obj1);
// console.log(clone);

// перевод сетов в массив и для функции тоже

// const mas = [122, 12, 85, 69, 500, 'jkiu'];
// const set1 = new Set(mas);
// const masnov = [...set1];
// console.log(set1);
// console.log(masnov);
//
// const func = (...par) => {
//     console.log(...par);
// };
// func(...set1);

// перевод строк в массив и для функции тоже

// const str = "ADFG HJYU KLOPP"
// const func = (...par) => {
//     for (let i in par) {
//         console.log(par[i]);
//     }
// };
// func(...str);








