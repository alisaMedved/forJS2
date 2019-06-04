'use strict';

// Создаем мапу вручную

// class Dictionary {
//     constructor() {
//         this.map = Object.create(null);
//     }
//     set(key, value) {
//         this.map[key] = value;
//         return this;
//     }
//     get(key) {
//         return this.map[key];
//     }
//     has(key) {
//         // return (key in this.map) ? true : false;
//         return !!this.map[key];
//     }
//     delete(key) {
//         delete this.map[key];
//     }
//     get size() {
//         return Object.keys(this.map).length;
//     }
//     keys() {
//         return Object.keys(this.map);
//     }
//
//     clear() {                            // удалить все элементы мапы
//         this.map = Object.create(null)
//     }
//     static from(hash) {   //создать новую хешмапу с полями объекта hash
//         const instance = new Dictionary();
//         for (const key in hash) {
//             instance.set(key, hash[key]);
//         }
//         return instance;
//     } /* это статический метод from класса Dictionary - ключевое
//        слово для создания статических методов static */
// }
//
// const cities = {
//     Shanghai: 24256800,
//     Beijing: 21516000,
//     Delhi: 16787941,
//     Lagos: 16060303,
// };
//
// const cityPopulation1 = Dictionary.from(cities);
// console.dir( {cityPopulation1} );
//
// const cityPopulation2 = new Dictionary();
// cityPopulation2.set('Shanghai', 24256800);
// cityPopulation2.set('Beijing',  21516000);
// cityPopulation2.set('Delhi',    16787941);
// cityPopulation2.set('Lagos',    16060303);
// console.dir({ cityPopulation2 });
//
// cityPopulation2.delete('Shanghai');
// console.dir({cityPopulation2});
//
// if (cityPopulation2.has('Beijing')) {
//     console.log('Beijing:', cityPopulation2.get('Beijing'));
// }
//
// if (!cityPopulation2.has('Shanghai')) {
//     console.log('no data for Shanghai');
// }
//
// console.log('size:', cityPopulation2.size);
// console.log('keys:', cityPopulation2.keys());

// Создаем встроенный экземпляр мапы (а по правильному вообще Map)

// const cityPopulation = new Map();
//
// cityPopulation.set('Shanghai', 24256800);
// cityPopulation.set('Beijing',  21516000);
// cityPopulation.set('Delhi',    16787941);
// cityPopulation.set('Lagos',    16060303);

// cityPopulation.delete('Shanghai');
//
// if (cityPopulation.has('Beijing')) {
//     console.log('Beijing:', cityPopulation.get('Beijing'));
// }
//
// if (!cityPopulation.has('Shanghai')) {
//     console.log('no data for Shanghai');
// }

// console.log('size:', cityPopulation.size);
// console.log('keys:', [...cityPopulation.keys()]);

// console.log('\nValues');
// console.log(cityPopulation.values()); //экземпляр итератора по значениям
//
// console.log('\nEntries');
// console.log(cityPopulation.entries()); // Экземпляр итератора по парам ключ-значение

// Итерация по мапе

// const cityPopulation = new Map();
//
// cityPopulation.set('Shanghai', 24256800);
// cityPopulation.set('Beijing',  21516000);
// cityPopulation.set('Delhi',    16787941);
// cityPopulation.set('Lagos',    16060303);
//
// for (const city of cityPopulation) {
//     console.log(city);
// }
//
// for (const [name, population] of cityPopulation) {   //  деструктивное присвоение
//     console.log(`Population of ${name} is ${population}`)
// }

// Индексация

// const fs = require('fs');
//
// const getDataset = file => {
//     const lines = fs.readFileSync(file, 'utf8').split('\n'); // преобразование \
//     // в массив строк
//     lines.shift();
//     lines.pop();
//     return lines.map(line => line.split(','));
// };
//
// const buildIndex = (ds, col) => { // ds - массив строк (lines),
//                                     // col - номер слова в строке
//    const index = new Map();
//    for (const record of ds) {
//        index.set(record[col], record); // ключ - слово строки, значение - строка
//    }
//    return index;
// };
//
// const dataset = getDataset('cities.csv');
// console.log(dataset); // массив массивов
//
// const byName = buildIndex(dataset, 0);
// console.log(byName);
//
// const byPopulation = buildIndex(dataset, 1);
// console.log(byPopulation);
//
// const delhi = byName.get('Delhi');
// console.log(delhi);
//
// const record = byPopulation.get('21516000');
// console.log(record);

// Weakmap

// const cities = {
//     beijing: {name: 'Beijing'},
//     kiev: { name: 'Kiev' },
//     london: { name: 'London' },
//     baghdad: { name: 'Baghdad' },
// };
//
// const capitalOf = new WeakMap();
// capitalOf.set(cities.beijing, 'People\'s Republic of China');
// capitalOf.set(cities.kiev, 'Ukraine');
// capitalOf.set(cities.london, 'United Kingdom');
// capitalOf.set(cities.baghdad, 'Iraq');
//
// const n = cities.london;
//
// delete cities.london;      // Ключ Лондона удалили из объекта cities
//
// console.dir({ cities, capitalOf }); /* т.к. ссылки на ключи - объекты jS слабые
//   - нет метода что возвращает список (массив) ключей, нет метода что может
//   итерироваться по weak map, не выводится в консоль содержимое weak map. */
//
// console.dir(capitalOf.get(cities.london));  /* Мы удалили ключ Лондона только
// из объекта ключей cities, но не из weakMap. Однако, ключ удалился и из weakMap т.к.
// в weakMap ссылки на ключи - объекты jS хранятся слабо,
// и они смогут предотвратить сборку мусора, только в том случае,
//    если будут другие ссылки на эти ключи - объекты jS. */
//
// console.dir(capitalOf.get(n)); /* если мы где-то сохраняем ссылку на объект JS,
// то тогда из weak map пара ключ-значение не удалится */





// const cities = {
//     beijing: {name: 'Beijing'},
//     kiev: { name: 'Kiev' },
//     london: { name: 'London' },
//     baghdad: { name: 'Baghdad' },
// };
//
// const capitalOf = new Map();
// capitalOf.set(cities.beijing, 'People\'s Republic of China');
// capitalOf.set(cities.kiev, 'Ukraine');
// capitalOf.set(cities.london, 'United Kingdom');
// capitalOf.set(cities.baghdad, 'Iraq');
//
// delete cities.london;      // Ключ Лондона удалили из объекта cities
//
// console.dir({ cities, capitalOf }); /* т.к. ссылки на ключи - объекты jS слабые
//   - нет метода что возвращает список (массив) ключей, нет метода что может
//   итерироваться по weak map, не выводится в консоль содержимое weak map. */
//
// console.dir(capitalOf.get(cities.london));  /* Мы удалили ключ Лондона только
// из объекта ключей cities, но не из weakMap. Однако, ключ удалился и из weakMap т.к.
// в weakMap ссылки на ключи - объекты jS хранятся слабо,
// и они смогут предотвратить сборку мусора, только в том случае,
//    если будут другие ссылки на эти ключи - объекты jS. */
//
// console.dir(capitalOf.{ name: 'Beijing' });
// // console.dir(capitalOf.get(n)); /* если мы где-то сохраняем ссылку на объект JS,
// // то тогда из weak map пара ключ-значение не удалится */








