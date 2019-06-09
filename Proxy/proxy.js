'use strict';

// Кладем объект в Proxy
// const data = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };
//
// const person = new Proxy(data, {});
//
// console.dir({ 'person.born': person.born });
// console.dir({ 'person.year': person.year });
//
// for (const key in person) {
//     console.dir({
//         key,
//         value: person[key],
//     });
// }

// Эмуляция свойств объекта с помощью get и set

// const obj = {
//     get x() {
//         return 100;
//     },
//     set x(v) {
//         console.log('set', v);
//     }
// };
//
// obj.x = 5; // мы пишем в свойство x - вызывается set x
// console.log(obj.x); // мы читаем свойство x - вызывается get x
// /* Это одно свойство x, что имеет свой геттер и сеттер
// А вернее геттер и сеттер эмулируют будто в obj есть свойство x */

// Эмуляция свойств объекта с помощью Proxy

// const data = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };
//
// const person = new Proxy(data, {
//     get(obj, key) {                      // если мы читаем свойство person[key] - вызывается get
//         console.log('get', key);
//         return obj[key];
//     },
//     set(obj, key, val) {              // если мы пишем в свойство person[key] - вызывается set
//         console.log('set', key, val);
//         obj[key] = val;
//         return true;
//     }
// });
//
// console.dir({ 'person.born': person.born });
// console.dir({ 'person.year': person.year });
//
// for (const key in person) {
//     console.dir({ key: person[key] });
// }
//
// person.name = 'Marcus';
// console.log('person.name ' + person.name);
// console.log('data.name ' + data.name);
/*
При сочетании proxy с get и set легче добраться до неименнованых полей объекта.
К тому же этот вариант более удобен при работе с борльшим количеством полей (
и одинаковых по структуре) чем обычные get и set.
 */

// Втроенный перехватчик Proxy - has

// const data = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };  // цель
//
// const person = new Proxy(data, {  // обработчик
//     has(obj, key) {                    // втроенный перехватчик для операции in
//         console.log('check', key);
//         return (key in obj || key === 'age');
//     },
//     get(obj, key) {       // перехватчик операции считывания поля
//         console.log('get', key);
//         if (key === 'age') {
//             return (
//                 new Date().getFullYear() -
//                 new Date(obj.born + '').getFullYear()
//             );
//         }
//        return obj[key];
//     }
// });
//
// /*
// Интересный момент - мы не записываем свойство age в data или person
// но при этом указываем что оно есть, и выдаем его значение.
//  */
//
// console.log('Try \'age\' in person');
// if ('age' in person) {  // для операции in существует встроенный обработчик Proxy - has
//     console.log('Try person.age');
//     if (person.age) {  // вызываем перехватчик get
//         console.log('Try person[\'age\']');
//         if (person['age']) {
//             console.log({
//                 born: person.born,
//                 age: person.age
//             });
//         }
//     }
// }

// Втроенный перехватчик Proxy - deleteProperty

// const data = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };
// const person = new Proxy(data, {
//     deleteProperty(obj, key) {     // удаляет свойство из прокси. В случае успешного
//         console.log('delete', key);  // удаления возвращает true
//         // delete obj[key];     // мы можем видоизменять удаление элементов и прочие операции
//         return true;                // c прокси благодаря втроенным перехватчикам Proxy
//     }
// });
//
// console.log(person);
// delete person.name;
// console.log(person);

// Переопределение свойства Object.keys с помощью
// встроеного перехватчика Proxy - ownKeys
//
// const data = { name: 'Marcus Aurelius', city: 'Rome', _born: 121 };
//
// const person = new Proxy(data, {
//     ownKeys(obj) {
//         return Object.keys(obj).filter(name => !name.startsWith('_'));
//     }
// });
//
// console.dir(Object.keys(person));

// Оборачивание функции Proxy с помощью
// встроеного перехватчика Proxy - apply

// const max = (a, b) => (a > b ? a : b);
//
// const amax = new Proxy(max, {
//     apply(target, context, args) {
//         console.log('apply', target.name, args);
//         return args.reduce(target);
//         // return args.reduce((a, b) => (a < b ? a : b));
//     }
// });
//
// console.log(max(7, 3, 12, 5, 0, 4, 8, 5));
// console.log(amax(7, 3, 12, 5, 0, 4, 8, 5));
//
// /*
// Прокси подобно подвиду ФВП - обертке может придавать дополнительное поведение функции,
// а может и полностью изменить
//  */

// Создание проксируемого эмулированного объекта и его отмена
// с помощью Proxy.revocable()

// const data = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };
//
// const { proxy, revoke } = Proxy.revocable(data, {
//     get(obj, key) {                      // если мы читаем свойство person[key] - вызывается get
//         console.log('get', key);
//         return obj[key];
//     },
//     set(obj, key, val) {              // если мы пишем в свойство person[key] - вызывается set
//         console.log('set', key, val);
//         obj[key] = val;
//         return true;
//     },
// });
//
// console.log(proxy.name);
// revoke();
// console.log(proxy.name);  // ошибка - проксированного объекта больше не существует


