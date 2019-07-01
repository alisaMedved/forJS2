'use strict';

// Фабрики объектов

// function userFactory1(name, group, email) {   // function declaration
//     return {name, group, email};
// }
//
// const userFactory2 = (name, group, email) => {  // Lambda function
//     return {name, group, email};
// };
//
// const userFactory3 = function(name, group, email) {  // anonymous function expression
//     return {name, group, email};
// };
//
// const userFactory4 = (name, group, email) => ( // Arrow function или lambda expression
//     {name, group, email}
// );
//
// const user1 = userFactory1('marcus', 'emperors', 'marcus@spqr.it');
// console.log(user1);
//
// const user2 = userFactory2('marcus', 'emperors', 'marcus@spqr.it');
// console.log(user2);
//
// const user3 = userFactory3('marcus', 'emperors', 'marcus@spqr.it');
// console.log(user3);
// // Explain: why undefined
//
// const user4 = userFactory4('marcus', 'emperors', 'marcus@spqr.it');
// console.log(user4);

// Фабрика прототипов со своим методом toString и с полями-дескрипторами доступа
// сеттеры с проверкой типа и валидацией

// const logable = fields => {  // фабрика прототипов, fields - метаданные
//
//     function Logable(data) {   // возвращаемый фабрикой конструктор, data - данные
//         this.values = data;
//     }
//
//     for (const key in fields) {    // в цикле по ключам метаданных записываем новые поля в values
//
//         Object.defineProperty(Logable.prototype, key, {
//             get() {
//                 return this.values[key];   // при чтении поля get выдает его
//             },
//             set(newval) {                // при записи в поле set перезаписывает его
//               const def = fields[key];   // def - метаданные для данного свойства
//                 const valid = (      // проверка на соответсвие записываемого значения требованиям метаданных
//                     typeof newval === def.type &&  // у === приоритет выше чем у &&
//                     def.validate(newval)
//                 );
//                 if (valid) this.values[key] = newval;
//                 else console.log('Validation failed:', key, newval);
//             },
//         });
//     }
//
// Logable.prototype.toString = function() {
//         let result = this.constructor.name + ': ';
//         for (const key in fields) {               // в цикле по ключам метаданных
//             result += this.values[key] + ' ';    // добавляем к result значения полей
//         }                                            // данных хранящихся в values
//     return result;
// };
//
//     return Logable;
// };
//
// /*
// Интересный момент: мы не создаем новые поля прототипа.
// Мы записываем все поля в одно единственное
// поле прототипа values.
//  */
//
// const Person = logable({                // Person - конструктор с метаданными
//     name: { type: 'string', validate: name => name.length > 0 },
//     born: { type: 'number', validate: born => !(born % 1) },
// });
//
// const p1 = new Person({ name: 'Marcus Aurelius', born: 121 });  // p1 - экземпляр объекта
// console.log(p1.toString());
// p1.born = 1923;
// console.log(p1.born);
// p1.born = 100.5;
// p1.name = 'Victor Glushkov';
// console.log(p1.toString());

// Фабрика классов

// const logable = fields => class Logable {   // фабрика классов, возвращает класс. fields - метаданные
//
//     constructor(data) {   // конструктор класса
//         this.values = data;   // data - данные
//         for (const key in fields) {
//             Object.defineProperty(Logable.prototype, key, {
//                 get() {
//                     console.log('Reading key:', key);
//                     return this.values[key];
//                 },
//                 set(value) {
//                     console.log('Writing key:', key, value);
//                     const def = fields[key];
//                     const valid = (
//                         typeof value === def.type &&
//                         def.validate(value)
//                     );
//                     if (valid) this.values[key] = value;
//                     else console.log('Validation failed:', key, value);
//                 }
//             });
//         }
//     }
//     toString() {
//         let result = this.constructor.name + '\t';
//         for (const key in fields) {
//             result += this.values[key] + '\t';
//         }
//         return result;
//     }
// };
//
// const Person = logable({          // Person - класс
//     name: { type: 'string', validate: name => name.length > 0 },
//     born: { type: 'number', validate: born => !(born % 1) },
// });
//
// /*
// Интересный момент: мы не создаем новые поля класса.
// Мы записываем все поля в одно единственное
// поле класса values.
//  */
//
// const p1 = new Person({ name: 'Marcus Aurelius', born: 121 });  // p1 - экземпляр класса
// console.log(p1.toString());
// p1.born = 1923;
// console.log(p1.born);
// p1.born = 100.5;
// p1.name = 'Victor Glushkov';
// console.log(p1.toString());

// Фабрика функции на замыканиях
//
// const colors = {
//     warning: '\x1b[1;33m',
//     error: '\x1b[0;31m',
//     info: '\x1b[1;37m'
// };
//
// const logger = (level = 'info') => {
//     const color = colors[level];
//     return s => {             // возвращаемый фабрикой экземпляр функции
//         const date = new Date().toISOString();
//         console.log(color + date + '\t' + s);
//     };
// };
//
// const warning = logger('warning'); // возвращаемый фабрикой экземпляр функции
// warning('Hello');                       // экземпляр функции
// const info = logger('info');
// info('Hello error');

// Статические методы класса

// class Person {
//     constructor(name) {
//         this.name = name;
//     }
//     static gor(kilo) {           // static - статический метод, без - динамический
//         return new Person(kilo);
//     }
//     static toBig() {
//         console.log(this.gor.name);  // статический метод можно вызвать из другого
//                                     // статического метода с помощью this
//         console.log(Person.gor.name);  // и через имя класса
//     }
//
//     toString() {
//        let result = this.constructor.gor.toString(); // статический метод НЕЛЬЗЯ вызвать из
//        let res = Person.gor.name;  // динамического словом this, только через конструктор
//         return result + res;         // или через имя класса
//     }
// }
//
// const p1 = new Person();
// console.log(p1.toString());
// Person.toBig();

// Статический метод класса как фабрика экземпляров своего класса

// class Person {
//   constructor(name) {
//       this.name = name;
//   }
//   static factoryMethod(name) {       // Метод является фабрикой экземпляров класса
//       return new Person(name);
//   }
// }
//
// const p1 = new Person('Marcus');
// console.dir({ p1 });
//
// const p2 = Person.factoryMethod('Marcus');  // Вне объекта статические методы класса
// console.dir({ p2 });  // вызываются также как динамические

// Функция-фабрика экземпляров класса

// class Person {
//     constructor(name) {
//         this.name = name;
//     }
// }
//
// const factorify = Category => (...args) => new Category(...args); // фабрика экземпляров класса
//
// const p1 = new Person('Marcus');
// console.dir({ p1 });
//
// const personFactory = factorify(Person);
// const p2 = personFactory('Marcus');
// console.dir({ p2 });

