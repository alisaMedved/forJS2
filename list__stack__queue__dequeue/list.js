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

// Создание двухсвязного списка на двух абстракциях:
// абстракция списка - функция list, абстракция элемента - объект element
// функция list возвращает объект итератора и методов списка
// /*
// Пчм двухсвязный? у obj2 нет ссылки на obj 3, только на obj1.
//  */

// const list = () => {            // абстракция списка - функция list
//     let element;
//     return {                   // функция list возвращает объект методов списка
//         push(data) {           // метод списка push
//             element = {
//                 prev: element, data,  // грядущему мы указываем на предыдущий - пропатчили
//             };                           // -и потому двух. список
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
//                 return {                // последнему мы указываем на предыдущий - пропатчили
//                     done: false,           // -и потому двух. список
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

// Создание односвязного списка на двух абстракциях
// абстракция списка - класс, абстракция элемента - объект

// class List {
//   constructor() {
//       this.last = null;         // если абстракция элемента - объект, то лучше
//   }                                 // чтобы prev = null, а не undefined
//   push(data) {                       // метод класса, функция-фабрика элементов
//       const prev = this.last;
//       const element = {prev, data};
//       this.last = element;
//       return element;
//   }
// }
//
// const obj1 = { name: 'first' };
// const obj2 = { name: 'second' };
// const obj3 = { name: 'third' };
//
// const list = new List();
// list.push(obj1);
// list.push(obj2);
// list.push(obj3);
//
// console.dir(list.last, { depth: 3 });

// Создание двухсвязного списка на прототипах
// абстракция списка - объект (созданный ч/з функцию-конструктор прототипа),
// абстракция элемента - объект (созданный ч/з функцию-конструктор прототипа),
// у списка есть динамические методы
// Стек (последним пришел - первым вышел)

// function LinkedList() {    // функция-конструктор прототипа списка
//     this.first = null;     // первый элемент списка
//     this.last = null;                       // последний элемент списка
//     this.length = 0;       // длина списка
// }
//
// LinkedList.prototype.push = function(data) {  // динамический метод функции списка
//   const node = new Node(this, data);  // создаем элемент вызвав функцию-конструктор
//                                       // абстракция элемента - объект
//   node.prev = this.last;
//   if (this.length === 0) this.first = node;
//   else this.last.next = node;
//   this.last = node;
//   this.length++;
//   return node;
// };
//
// LinkedList.prototype.pop = function() {
//     if (this.length === 0) return null;
//     const node = this.last;
//     this.last = node.prev;
//     node.list = null;              // вот в обнулении ссылки у уже вырванного элемента из списка
//     node.prev = null;              // нет особой нужды - это тупо перестраховка
//     node.next = null;              // чтоб нигде эти ссылки случайно не среагировали
//     this.length--;
//     return node.data;
// };
//
// function Node(list, data) {   // функция-конструктор прототипа элемента списка
//     this.list = list;       // какому списку принадлежит элемент
//     this.data = data;
//     this.prev = null;       // предыдущий элемент
//     this.next = null;        // следующий элемент
// }
//
// const list = new LinkedList();  //абстракция списка - объект (созданный ч/з функцию-конструктор прототипа)
// console.log(list.push({ name: 'first' }));
// list.push({ name: 'second' });
// list.push({ name: 'third' });
//
// console.dir(list.pop());
// console.dir(list.pop());
// console.dir(list.pop());
// console.dir(list.pop());
//
// list.push({ name: 'uno' });
// list.push({ name: 'due' });
// console.dir(list.pop());
// list.push({ name: 'tre' });
// console.dir(list.pop());
// console.dir(list.pop());

// Создание стека на односвязном списке, построенном на классах
// Список на двух абстракциях (последним пришел - первым вышел LIFO)
// абстракция списка - класс,  абстракция элемента - объект

// class Stack {           // абстракция списка - класс
//     constructor() {
//         this.last = null;
//     }
//     push(item) {        // метод списка push
//         const prev = this.last;
//         const element = { prev, item };  // абстракция элемента - объект
//         this.last = element;
//     }
//     pop() {            // метод списка pop
//        const element = this.last;
//        if (!element) return null;
//        this.last = element.prev;
//        return element.item;
//     }
// }
//
// const obj1 = { name: 'first' };
// const obj2 = { name: 'second' };
// const obj3 = { name: 'third' };
//
// const list = new Stack();
// list.push(obj1);
// list.push(obj2);
// list.push(obj3);
//
// console.dir(list.pop());
// console.dir(list.pop());
// console.dir(list.pop());
// console.dir(list.pop());

// Создание очереди на двухсвязном списке, построенном на классах
// Список на двух абстракциях (FIFO)
// абстракция списка - класс,  абстракция элемента - объект

// class Queue {          // абстракция списка очереди - класс
//     constructor() {
//         this.first = null;
//         this.last = null;
//     }
//     put(item) {               // метод списка put добавить с конца
//         const last = this.last;
//         const element = {next: null, item};
//         if (last) {
//             last.next = element;   // последнему указали на грядущего // пропатчили - и потому двухсвяз.
//             this.last = element;   // список
//         } else {
//             this.first = element;
//             this.last = element;
//         }
//     }
//     pick() {                 // метод списка pick забрать с начала
//        const element = this.first;
//        if (!element) return null;
//        if (this.last === element) {
//            this.first = null;         // перед тем как забрать последний в очереди элемент надо обнулить
//            this.last = null;         // поля очереди first и last
//        } else {
//            this.first = element.next;  // первому указали на второго  // пропатчили - и потому двухсвяз.
//        }                                // список
//        return element.item;
//     }
// }
//
// const obj1 = { name: 'first' };
// const obj2 = { name: 'second' };
// const obj3 = { name: 'third' };
//
// const queue = new Queue();
// queue.put(obj1);
// queue.put(obj2);
// queue.put(obj3);
//
// console.dir(queue.pick());
// console.dir(queue.pick());
// console.dir(queue.pick());
// console.dir(queue.pick());

// Создание ДЕК - double-ended-queue на двухсвязном списке,
// построенном на классах
// абстракция списка - класс,  абстракция элемента - объект

// class Dequeue {        // абстракция списка - класс
//     constructor() {
//         this.first = null;
//         this.last = null;
//     }
//     push(item) {                  // добавим в конец
//         const last = this.last;
//         const element = { prev: last, next : null, item};
//         if (last) {
//             last.next = this.last;  // пропатчили предыдущий эл-т указали ему ссылку на нынешний
//             this.last = element;
//         } else {
//             this.first = element;
//             this.last = element;
//         }
//     }
//     unshift(item) {                 // добавим в начало
//         const first = this.first;
//         const element = {prev: null, next: first, item};
//         if (first) {
//             first.prev = element;  // пропатчили
//             this.first = element;
//         } else {
//             this.first = element;
//             this.last = element;
//         }
//     }
//     pop() {                   // забираем с конца
//         const element = this.last;
//         if (!element) return null;
//         if (this.first === element) {
//             this.first = null;
//             this.last = null;
//         } else {
//             this.last = element.prev;
//         }
//         return element.item;
//     }
//     shift() {                   // забираем с начала
//         const element = this.first;
//         if (!element) return  null;
//         if (this.last === element) {
//             this.first = null;
//             this.last = null;
//         } else {
//             this.first = element.next;
//         }
//         return element.item;
//     }
// }
//
// const obj1 = { name: 'first' };
// const obj2 = { name: 'second' };
// const obj3 = { name: 'third' };
//
// const list = new Dequeue();
// list.push(obj1);
// list.push(obj2);
// list.unshift(obj3);
//
// console.dir(list.pop());
// console.dir(list.shift());
// console.dir(list.shift());





