'use strict';

/* Создание списка с помощью прототипа элемента
(пара определений:
Функция-конструктор - это функция, создающая прототип экземпляра
Прототип и функция-конструктор являются абстракциями)
 */

// function Node(prev, data) { // Функция-конструктор Node создающая прототип элемента списка
//     this.prev = prev; // ссылка на предыдущий элемент
//     this.data = data;  // данные элемента
// }
//
// const n1 = new Node(null, {name: 'first'});
// const n2 = new Node(n1, { name: 'second' });
// const n3 = new Node(n2, { name: 'third' });
// // const n4 = new Node(n3, { name: 'four' });
// // const n5 = new Node(n4, { name: 'five' });
//
//
// console.dir(n1);
// console.log('следующий \n');
// console.dir(n2);
// console.log('следующий \n');
// console.dir(n3);
// // console.log('следующий \n');
// // console.dir(n4);
// // console.log('следующий \n');
// // console.dir(n5);
//
// /*
// Интересный момент когда выписывается значение поля next то идет прямая итерация
//  */

// Создание односвязного списка на функции-фабрике

// const node = (prev, data) => ({ prev, data });  // функция-фабрика - она абстракция
//                                                 // элемента списка
// const n1 = node(null, { name: 'first' });
// const n2 = node(n1, { name: 'second' });
// const n3 = node(n2, { name: 'third' });
//
// console.dir(n1);
// console.dir(n2);
// console.dir(n3);
//
// /*
// Примечание: 1) Создание односвязного списка на функции-фабрике
// vs
// 2) Создание списка с помощью прототипа элемента
// Выполнятся то они примерно за одно время
// Но вариант на прототипах сразу же начнет выполнятся с высокой скоростью,
// а вариант с функцией-фабрикой будет в начале набирать скорость.
//  */

// Создание односвязного списка с помощью рекурсивного замыкания и примеси Object.key

// const node = data => {          // 1) data = obj1                                   // 2.3) data = obj2
//     const element = data => {                                                       // 2) data = obj2                                          3) data = obj3
//         const next = node(data);                                                    // 2.2) node(obj2)
//     next.prev = element;                                                            // 2.5) next.prev = функция element c полем data = obj1
//         return next;                                                                // 2.1)
//     };
//     element.data = data;       // 1.1) element.data = { name: 'first' }             // 2.4) element.data = { name: 'second' }
//     return element;            // 1.2) вернули функцию element c полем data = obj1  // 2.6) вернули функцию element c полями data = obj2
//                                                                                     //     и prev = функция element c полем data = obj1
// };

// const obj1 = { name: 'first' };
// const obj2 = { name: 'second' };
// const obj3 = { name: 'third' };
//
// const list = node(obj1)(obj2)(obj3);

// console.dir(list, { depth: 3 });

// Создание односвязного списка с помощью рекурсивного замыкания и примеси методом assign

// const node = (data, element) => (
//     element = Object.assign(data => Object.assign(node(data), {prev: element}),
//         {data}
//     )
// );
//
// const obj1 = { name: 'first' };
// const obj2 = { name: 'second' };
// const obj3 = { name: 'third' };
//
// const list = node(obj1)(obj2)(obj3);
//
// console.dir(list, { depth: 3 });

// Создание односвязного списка на двух абстракциях:
// абстракция списка - функция list, абстракция элемента - объект element
// функция list возвращает объект итератора и методов списка

// const list = () => {            // абстракция списка - функция list
//     let element;
//     return {                   // функция list возвращает объект методов списка
//         push(data) {           // метод списка push
//             element = {
//                 prev: element, data,
//             };
//             return element;
//         },
//         last: () => element,           // метод списка last
//         [Symbol.iterator]: () => ({    // итератор списка
//             current: element,
//             next() {
//                 const element = this.current;
//                 if (!element) return {
//                     done: true,
//                     value: null           // вообще метод итератора next должен возвращать undefined,
//                                             // но тут элементы списка - объекты (ссылочный тип)
//                 };
//                 this.current = element.prev;   // сдвигаем итератор назад на элемент,
//                                         // ну или вглубь к сожалению тут никак иначе из-за вложенности
//                 return {
//                     done: false,
//                     value: element.data   // обеспечили красивый вывод в console
//                 };
//             }
//         })
//     };
// };
//
// // Usage
//
// const obj1 = { name: 'first' };
// const obj2 = { name: 'second' };
// const obj3 = { name: 'third' };
//
// const l1 = list();
// l1.push(obj1);
// l1.push(obj2);
// l1.push(obj3);
//
// console.dir(l1.last(), {depth: 3});
//
// console.dir([...l1]);
//
// for (const element of l1) {
//     console.log(element);
// }











