/** В этом файле будут описаны интересные моменты с object
 *
 */

/**
 * Объект или Экземпляр / Object or Instance - структура данных, содержащая состояние и методы,
 * связанные с этим состоянием.
 *
 * Объект может быть создан как литерал {} или экземпляр класса new ClassName()
 * или как экземпляр прототипа new PrototypeConstructor() или возвращен из фабрики.
 *
 * В JS ключами объекта могут быть только строки или символы.
 */

// Пример №1 Склеивание объектов - одинаковые ключи теряются
const obj1 = {
    'Marcus Aurelius': '121-04-26',
    'Commodus Antoninus': '161-08-31',
    'Victor Glushkov': '1923-08-24',
};

const obj2 = {
    'Victor Glushkov': '24',
    'Ibn Arabi': '1165-11-16',
    'Mao Zedong': '1893-12-26',
    'Rene Descartes': '1596-03-31',
};

const objConcat1 = Object.assign({}, obj1, obj2);
const objConcat2 = { ...obj1, ...obj2 };

console.dir({ objConcat1, objConcat2 });

/**
 * Дескрипторы свойств, присутствующие в объектах, бывают двух основных типов:
 * дескрипторы данных и дескрипторы доступа.
 * Дескриптор данных — это свойство, имеющее значение, которое
 * может быть (а может и не быть) записываемым.
 * Дескриптор доступа — это свойство, описываемое парой функций — геттером и сеттером.
 * Дескриптор может быть только чем-то одним из этих двух типов; он не может быть одновременно обоими.
 *
 * Enumerable / Not enumerable - перечисляемые и неперичсляемые свойства.
 * ключ descriptor(а) Enumerable определяет является ли свойство видимым
 * при перечислениях (т.е при иттерациях, в циклах).
 * Значение по умолчанию: false
 *
 * Неперечисляемое свойство нельзя перечислить в цикле for in
 * не видно его и в Object.keys().
 *
 * Определить является ли свойство перечисляемым или нет можно с помощью
 * obj.propertyIsEnumerable(prop)
 *
 * configurable / not configurable. ключ descriptor(а) configurable определяет,
 * доступно ли свойство для переконфигурирования. Доступен для переконфигурирования
 * это озночает что свойство можно перезаписать (с помощью переприсвоения) и удалить (с помощью оператора delete).
 * Значение по умолчанию: false
 *
 * writable / not writable. ключ descriptor(а) данных writable определяет можно ли свойство перезаписать.
 * По умолчанию false
 *
 * Вот хоть значения у этих ключ descriptor(а) по умолчанию false. Но когда мы создаем объект
 * «обычным способом» (т.е new Object и Object initializer), эти три флага устанавливаются в значение true.
 *
 * value - значение поля, ключ descriptor(а) данных. По умолчанию undefined.
 *
 * Унаследованные / Собственные свойства. Унаследованные свойства - это свойство не самого объекта, а
 * одного из его прототипов.
 *
 * Определить является ли свойство собственным можно с помомощью obj.hasOwnProperty(prop)
 */

// Пример №2 defineProperties, defineProperty
// Небольшой ньюанс: если configurable: false и writable: true -
// свойство можно перезаписать переприсвоением, но нельзя удалить с помощью delete
Object.defineProperties({}, {
    property1: {
        value: true,
        writable: true,
        configurable: false
    },
    property2: {
        value: "Hello",
        writable: false,
    },
});

// Пример №3 Логично что неперичисляемые и унаследованные свойства не копируются
    // с помощью spread и assign.

const obj = Object.create({ foo: 1 }, { // foo является унаследованным свойством.
    bar: {
        value: 2  // bar является неперечисляемым свойством.
    },
    baz: {
        value: 3,
        enumerable: true  // baz является собственным перечисляемым свойством.
    }
});

const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }

console.log({v: 8, ...obj});

// Пример №4 Символьный тип данных как ключи объекта

const SYM = Symbol('filename');

const hash1 = {
    key: 'value',
    /* этот ключ затрется так как они оба ссылки и ссылаются на одну и ту же переменную */
    [SYM]: '458',
    [SYM]: 'hhh',

    /* т.к. экземпляры функции Symbol
     уникальны и неизменяемы, поля не затираются из-за "одинаковости"
    (ведь экземпляры функции Symbol не могут быть одинаковы) */
    [Symbol('filename')]: 8999,
    [Symbol('filename')]: 'GGGG', 
};

console.dir({hash1});

// Также ключи-символы не итерируются в for in

for (let key in hash1) {
    console.log(`${key}: `, hash1[key])
    // output: key:  value
}

// Пример №5 по ключам символьного типа данных нельзя итерироваться даже если поставлен дескриптор enumerable в true

const sim = Symbol('nord');

const obj3 = {
    key1: 'lll',
    key2: 'kkkk',
    [Symbol('nord')]: 'nord1',
    [Symbol('nord')]: 'nord2',
};
Object.defineProperty(obj3, 'rttyy',
    {
        value: 90,
        enumerable: true,
        configurable: true,
        writable: true
    });

Object.defineProperty(obj3, Symbol('rttyyertr'),
    {
        value: 90,
        configurable: true,
        writable: true,
        enumerable: true
    });

for (const key in obj3) {
    let value = obj3[key];
    console.log(key + ':' + value);
}

const mas = Object.keys(obj3);
for (const key of mas) {
    let value = obj3[key];
    console.log(key + ':' + value);
}

// Пример № 6 Запись объекта в файл

const fs = require('fs');
// невероятно - но это движок v8 -  мы оттуда метод для сериализации вытащим
const v8 = require('v8');

const SYM1 = Symbol('note');

const hask2 = {
    key: 'value',
    key2: 'value2',
    ['key' + 3]: 'value3',
    [SYM1]: 'collections/note.js',
    [Symbol('note2')]: 'note2.js',
};

const save = collection => fs.writeFile(
    collection[SYM1], v8.serialize(collection), () => {}
);

/* До ключей символьного типа данных можно достучатся,
но нельзя записать в файл */

save(hask2);
console.log(hask2);

// Пример № 6 Заморозка объекта
const objForFreze1 = {
    field1: 'otre',
    field2: 789,
    field455: {
        a: 7890,
        b: 7878990,
    }
}
Object.freeze(objForFreze1);
console.log(JSON.stringify(objForFreze1));

// При заморозке нельзя добавлять новые свойства, удалять свойства, изменять уже  имеющиеся свойства
objForFreze1.a = 67;
objForFreze1.field1 = 'rtghjk';
delete(objForFreze1.field1);

console.log(JSON.stringify(objForFreze1));

// Заморозка неглубокая и потому во вложенных объектах можно удалять, изменять и добавлять свойства

objForFreze1.field455.a = 67;
objForFreze1.field455.c = 'rtghjk';
delete(objForFreze1.field455.b);
console.log(JSON.stringify(objForFreze1));
console.log(Object.isFrozen(objForFreze1.field455));
console.log(Object.isFrozen(objForFreze1));

// 2) Метод freeze замораживает сам объект и возвращает замороженный объект.
// Оба объекта эквивалентны, а также возвращаемый объект будет заморожен.
// Необязательно сохранять возвращаемый объект при заморозке оригинала.
const objForFreze2 = {
    field1: 'otre',
    field2: 789,
    field455: {
        a: 7890,
        b: 7878990,
    }
}
const o = Object.freeze(objForFreze2);
//
console.log('o === objForFreze2 ', o === objForFreze2); // true
console.log('o.field455.a === objForFreze2.field455.a ', o.field455.a === objForFreze2.field455.a); // true
console.log('Object.isFrozen(objForFreze2) ', Object.isFrozen(objForFreze2));
console.log('Object.isFrozen(o) ', Object.isFrozen(o));
//
// // 3) метод freeze не замораживает эмуляцию геттеров и сетеров
let bValue = 45;
const objForFreze3 = {
    field1: 'otre',
    field2: 789,
    field455: {
        a: 7890,
        b: 7878990,
    },
    get x() {
        return bValue;
    },
    set x(newValue) {
        bValue = newValue;
    }
}

objForFreze3.x = 789;
console.log('objForFreze3.x ', objForFreze3.x);

Object.freeze(objForFreze3);

console.log('objForFreze3.x ', objForFreze3.x);
objForFreze3.x = 900;
console.log('objForFreze3.x ', objForFreze3.x);

// Выбросит TypeError
// Object.defineProperty(objForFreze3, 'x',
//     {
//         value: 122,
//         enumerable: true,
//         configurable: true,
//     });
// console.log('objForFreze3.x ', objForFreze3.x);
console.log(JSON.stringify(objForFreze3));

//4) Object.freeze работает и для примитивов
let num = 5;
console.log('num ', num)
num = 6
console.log('num ', num)
Object.freeze(num);
console.log('num ', num)
num = 7
console.log('num ', num)

// Пример №7 Object.seal

const objForSeal = {
    prop: function () {},
    foo: "bar",
};

console.log('objForSeal ', objForSeal)

// Новые свойства могу быть добавлены, существующие свойства могут быть изменены или удалены.
objForSeal.foo = "baz";
objForSeal.lumpy = "woof";
delete objForSeal.prop;

console.log('objForSeal ', objForSeal)

// Seal запечатывает сам объект и возвращает запечатываемый объект. Оба объекта равны
// И нету смысла заводить новую переменную при запечатывании
const objReturnedSeal = Object.seal(objForSeal);

console.log('objReturnedSeal === objForSeal ', objReturnedSeal === objForSeal);
console.log('Object.isSealed(objForSeal) ', Object.isSealed(objForSeal));
console.log('Object.isSealed(objReturnedSeal) ', Object.isSealed(objReturnedSeal));

// Изменение значений свойств на запечатанном объекте всё ещё работает.
objForSeal.foo = "quux";

console.log('objForSeal ', objForSeal)

// // Но вы не можете преобразовать свойства данных в свойства доступа и наоборот.
// Object.defineProperty(objForSeal, "foo", {
//     get: function () {
//         return "g";
//     },
// }); // выбросит TypeError

// Теперь любые изменения, кроме изменения значений свойств, не будут работать.
objForSeal.quaxxor = "дружелюбная утка"; // молча не добавит свойство
delete objForSeal.foo; // молча не удалит свойство

console.log('objForSeal ', objForSeal)

// Попытка добавить что-то через Object.defineProperty также выбросит исключение.
// Object.defineProperty(objForSeal, "ohai", { value: 17 }); // выбросит TypeError

// а вот defineProperty смог изменить значение - это потому что поле остается все еще перенастраиваемым
Object.defineProperty(objForSeal, "foo", { value: "eit" }); // изменяем значение существующего свойства

console.log('objForSeal ', objForSeal)

// для примитивов seal тоже работает
let numForSeal = 5;
console.log('numForSeal ', numForSeal)
numForSeal = 6
console.log('numForSeal ', numForSeal)
Object.seal(numForSeal);
console.log('numForSeal ', numForSeal)
numForSeal = 45
console.log('numForSeal ', numForSeal)

const ott = {
    set current(str) {
        this.log = str;
    },
    get current() {
        return this.log;
    },
    log: 6,
};

Object.freeze(ott);

console.log(ott.current);
console.log(ott.log);

ott.current = 8;
console.log(ott.current);


