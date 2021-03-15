// 'use strict';
//
// // Создание проекции
//
// // const partial = (fn, ...args) => (...rest) => fn(...args.concat(rest)); // функция частичного применения. Она лишь частично применяется к объекту ведь нам нужны не все поля объекта а лишь часть
// // // rest - это объект-элемент массива объектов persons
// // // fn - функция проекции projection
// // // args - нужные нам поля
// //
// const projection = (fields, obj) => Object.keys(obj)
//     .filter(field => fields.includes(field))
//     .reduce((hash, key) => (hash[key] = obj[key], hash), {});
// // В arrow function нет return что просто последним идет то и возвращается - hash
// // initialValue - {} - первый аргумент в первый вызов - то бишь hash
// // При очередном поступлении ключа в reduce вновь hash приходит в аргументы,
// // добавляет себе поля и вновь возвращается в виде рез-та колбека.
// // Это не рекурсия - reduce массива построен на цикле
// //
// // const persons = [
// //     { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
// //     { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
// //     { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
// //     { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
// //     { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
// // ];
// //
// // const p1 = partial(projection, ['name', 'born']);
// // const p2 = partial(projection, ['name']);
// //
// // const data = persons.map(p1).map(p2);
// // console.dir(data);
//
// // Создание более абстрактной проекции через двойной reduce
//
// // const partial = (fn, ...args) => (...rest) => fn(...args.concat(rest));
// //
// // const projection = (meta, obj) => Object.keys(meta)
// //     .reduce((hash, key) => (hash[key] = meta[key]
// //         .reduce((val, fn, i) => (i ? fn(val) : obj[fn]), null), hash), {});
// //     /*
// //     meta объект md, obj - объект массива persons
// //     Берем массив ключей объекта md и применяем к каждому ключу внешний reduce
// //     Внешний reduce добавляет к hash поля md:
// //     ключ поля hash - ключ md
// //     значение поля hash - массив значения md, который прогнали через внутренний reduce
// //     При первом прогоне внутреннего reduce
// //     val - null, fn - элемент массива значения поля md, i - его индекс 0
// //     При втором прогоне - если он будет
// //     в val вернется obj[fn], fn - элемент массива значения поля md, i - его индекс 1
// //     В конечном итоге из внутреннего reduce вернется в значение поля hash
// //     либо результат fn(val) либо результат obj[fn]
// //      */
// //
// // const persons = [
// //     { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
// //     { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
// //     { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
// //     { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
// //     { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
// // ];
// //
// // const md = {
// //     name: ['name'],
// //     place: ['city', s => '<' + s.toUpperCase() + '>'],
// //     age: ['born', year => (
// //         new Date().getFullYear() - new Date(year + '').getFullYear()
// //     )]
// // };
// //
// // const p1 = partial(projection, md);
// // const data = persons.map(p1);
// // console.dir(data);
//
// //Создание более абстрактной проекции через замыкание
//
// // const projection = meta => {
// //     const keys = Object.keys(meta);
// //     return obj => keys.reduce((hash, key)=> (
// //         hash[key] = meta[key]
// //             .reduce((val, fn, i) => (i ? fn(val) : obj[fn]), null),
// //     hash), {})
// // };
// //
// // const persons = [
// //     { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
// //     { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
// //     { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
// //     { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
// //     { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
// // ];
// //
// // const md = {
// //     name: ['name'],
// //     place: ['city', s => '<' + s.toUpperCase() + '>'],
// //     age: ['born', year => (
// //         new Date().getFullYear() - new Date(year + '').getFullYear()
// //     )]
// // };
// //
// // const p1 = projection(md);
// // const data = persons.map(p1);
// // console.dir(data);
// //
// // /*
// // Чтобы при каждом поступлении объекта из массива объектов person в функцию p1
// // не вызывать заново объект md (метаданные) мы его будем хранить (закешируем)
// // в замыкании.
// //  */
//
// //Создание более абстрактной проекции через замыкание
// // замена reduce на цикл forEach
//
// // const projection = meta => {
// //     const keys = Object.keys(meta);
// //     return obj => {
// //         const hash = {};
// //         keys.forEach(key => {
// //             const def = meta[key];
// //             const [field, fn] = def; // ограничение по количеству функции условились что если что будем композировать
// //             const val = obj[field];
// //             hash[key] = fn ? fn(val) : val;
// //         });
// //         return hash;
// //     };
// // };
// //
// // const persons = [
// //     { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
// //     { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
// //     { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
// //     { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
// //     { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
// // ];
// //
// // const md = {
// //     name: ['name'],
// //     place: ['city', s => '<' + s.toUpperCase() + '>'],
// //     age: ['born', year => (
// //         new Date().getFullYear() - new Date(year + '').getFullYear()
// //     )]
// // };
// //
// // const p1 = projection(md);
// // const data = persons.map(p1);
// // console.dir(data);
// //
// // /*
// // Вообще для оптимизации forEach лучше заменить на итерирование for-in о ключам
// // или for-of по полям
// //  */
//
// //Создание более абстрактной проекции через линзу
//
// // const view = (lens, obj) => lens.get(obj);
// //
// // const lens = (source, destination = source) => ({        //линза
// //                                                         // source = name = 'city'
// //      get: obj => obj[source],  // get ключ => значение
// //     set: (val, obj) => ({...obj, [destination]: val })
// //     });
// //
// // const id = x => x;
// //
// // const field = (name, map = id) => obj => map(view(lens(name), obj)); // const field = upper(obj['city'];
// // // hash['place'] = field('city', upper)(obj)
// // // id - это заглушка на случай если в map не передадут колбек (так выйдет с полем name)
// //
// // const projection = meta => {
// //     const keys = Object.keys(meta); // массив ключей md 'name', 'place', 'age'
// //     return obj => {
// //         const hash = {};
// //         keys.forEach(key => {
// //             const field = meta[key];  // const field = field('city', upper)
// //             hash[key] = field(obj); // hash['place'] = field('city', upper)(obj)
// //         });
// //         return hash;
// //     };
// // };
// //
// // // Dataset
// //
// // const persons = [
// //     { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
// //     { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
// //     { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
// //     { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
// //     { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
// // ];
// //
// // // Метаданные
// //
// // const age = year =>
// //     new Date().getFullYear() -
// //     new Date(year + '').getFullYear();
// //
// // const upper = s => s.toUpperCase();
// //
// // const md = {
// //     name: field('name'),
// //     place: field('city', upper),
// //     age: field('born', age)
// // };
// //
// // // Usage
// //
// // const p1 = projection(md);
// // const data = persons.map(p1);
// // console.dir(data);
//
// // Создание двойной проекции для датасета с двойной вложенностью
// // Создание двойной проекции императивным путем - соединение двух проекции методом
//
// // const projection = meta => {
// //     const keys = Object.keys(meta);
// //     const mapper = obj => {
// //         const hash = {};
// //         for (const key of keys) {
// //             const def = meta[key];  // def =  meta['places']
// //             const [name, fn] = def; // name = 'places'
// //                                     // fn = val => val.map(p2)
// //             let val = obj[name];
// //             if (val) {
// //                 if (fn) val = fn(val);
// //                 hash[key] = val;
// //             }
// //         }
// //         return hash;
// //     };
// //     mapper.join = (key, projection) => { // mapper.join('places', p2)
// //         keys.push(key);  // const keys = Object.keys(md1);
// //                             // - ['name', 'place', 'born', 'age' + 'places']
// //
// //         meta[key] = [key, val => val.map(projection)]; // meta['places'] "=" [name, fn]
// //         return mapper;
// //     };
// //     return mapper;
// // };
// //
// // const persons = [
// //     { name: 'Marcus Aurelius', city: 'Rome', born: 121, places: [
// //             { name: 'Shanghai', population: 24256800, country: 'China' },
// //             { name: 'Beijing', population: 21516000, country: 'China' },
// //             { name: 'Delhi', population: 16787941, country: 'India' }
// //         ] },
// //     { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923, places: [
// //             { name: 'Lagos', population: 16060303, country: 'Nigeria' },
// //             { name: 'Delhi', population: 16787941, country: 'India' },
// //             { name: 'Tianjin', population: 15200000, country: 'China' }
// //         ] },
// //     { name: 'Ibn Arabi', city: 'Murcia', born: 1165, places: [
// //             { name: 'Beijing' }
// //         ] },
// //     { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
// //     { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596, places: [
// //             { name: 'Karachi', population: 14910352, country: 'Pakistan' },
// //             { name: 'Istanbul', population: 14160467, country: 'Turkey' },
// //             { name: 'Tianjin', population: 15200000, country: 'China' }
// //         ] },
// // ];
// //
// // // Metadata
// //
// // const md1 = {
// //     name: ['name'],
// //     place: ['city', s => `<${s.toUpperCase()}>`],
// //     born: ['born'],
// //     age: ['born', year => (
// //         new Date().getFullYear() -
// //         new Date(year + '').getFullYear()
// //     )]
// // };
// //
// // const md2 = {
// //     address: ['name', s => s.toUpperCase()],
// //     population: ['population']
// // };
// //
// // const p1 = projection(md1);
// // const p2 = projection(md2);
// // const p3 = p1.join('places', p2);  // mapper.join('places', p2)
// // const data = persons.map(p3);
// // console.dir(data, { depth: 10 });
//
// //Создание двойной проекции для датасета с двойной вложенностью
// // Создание двойной проекции декларативным путем -
// // создать метаданные с двойной вложенностью
//
// // const projection = meta => {
// //     const keys = Object.keys(meta);
// //     const mapper = obj => {
// //         const hash = {};
// //         for (const key of keys) {
// //             const def = meta[key];
// //             const [name, transform] = def;
// //             let val = obj[name];
// //             if (val) {
// //                 if (transform) {
// //                     val = typeof transform === 'function' ?
// //                         transform(val) : val.map(projection(transform));
// //                 }
// //                 hash[key] = val;
// //             }
// //             }
// //         return hash;
// //         };
// //     return mapper;
// // };
// //
// // // Dataset
// //
// // const persons = [
// //     { name: 'Marcus Aurelius', city: 'Rome', born: 121, places: [
// //             { name: 'Shanghai', population: 24256800, country: 'China' },
// //             { name: 'Beijing', population: 21516000, country: 'China' },
// //             { name: 'Delhi', population: 16787941, country: 'India' }
// //         ] },
// //     { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923, places: [
// //             { name: 'Lagos', population: 16060303, country: 'Nigeria' },
// //             { name: 'Delhi', population: 16787941, country: 'India' },
// //             { name: 'Tianjin', population: 15200000, country: 'China' }
// //         ] },
// //     { name: 'Ibn Arabi', city: 'Murcia', born: 1165, places: [
// //             { name: 'Beijing' }
// //         ] },
// //     { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
// //     { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596, places: [
// //             { name: 'Karachi', population: 14910352, country: 'Pakistan' },
// //             { name: 'Istanbul', population: 14160467, country: 'Turkey' },
// //             { name: 'Tianjin', population: 15200000, country: 'China' }
// //         ] },
// // ];
// //
// // // Metadata
// //
// // const md = {
// //     name: ['name'],
// //     place: ['city', s => `<${s.toUpperCase()}>`],
// //     born: ['born'],
// //     age: ['born', year => (
// //         new Date().getFullYear() -
// //         new Date(year + '').getFullYear()
// //     )],
// //     places: ['places', {                       // двойная вложенность метаданных
// //         adres: ['name', s => s.toUpperCase()],
// //         population: ['population']
// //     }]
// // };
// //
// // const p = projection(md);
// // const data = persons.map(p);
// // console.dir(data, { depth: 10 });
//
// //Создание двойной проекции для датасета с двойной вложенностью
// // Создание двойной проекции декларативным путем -
// // создать метаданные с двойной вложенностью  с более кратким синтаксисом
//
// // projection.string = name => d => d[name];
// // projection
// //
// // const md = [
// //     'name',
// //     'place', d => `<${d.city.toUpperCase()}>`,
// //     'born',
// //     'age', d => (
// //         new Date().getFullYear() -
// //         new Date(d.born + '').getFullYear()
// //     ),
// //     'places', [
// //         'address', d => (d.country.toUpperCase() + ', ' + d.name),
// //         'population'
// //     ]
// // ];
// //
// // const p = projection(md);
// // const data = persons.map(p);
// // console.dir(data, { depth: 10 });
//

//
