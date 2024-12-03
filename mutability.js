/** Спасибо Python, теперь нам приходится писать эти примеры в JS **/

// Пример 1 - изменяем переменную, которой присвоили ссылку на переменную
let mas = [1, 3, 7]
let mas1 = mas;
console.log('mas ', mas)
console.log('mas1 ', mas1)

mas1[0] = 88;

console.log('mas ', mas)
console.log('mas1 ', mas1)

// Пример 2 - изменяем массив исходный
let mas2 = [1, 3, 7]
let mas3 = mas2;

console.log('mas2 ', mas2)
console.log('mas3 ', mas3)

mas2[0] = 88;

console.log('mas2 ', mas2)
console.log('mas3 ', mas3)

/**
 * Ссылочные типы данных ссылаются не на значения, а на ссылки.
 *  И потому при изменении одной переменной, меняются обе переменные: и та что исходного массива
 *  и та которой присвоили ссылку на исходный массив.
 *
 *  Потому что на самом деле - они обе содержат ссылку на массив, и ни одна из них не содержит сам массив
 */

/** Способы это обойти - создать глубокую копию, а не просто ссылку **/

// Пример 1 - изменяем переменную, которой присвоили ссылку на переменную
let masForDeep = [1, 3, 7]
let masForDeep1 = [...masForDeep];
console.log('masForDeep ', masForDeep)
console.log('masForDeep1 ', masForDeep1)

masForDeep1[0] = 88;

console.log('masForDeep ', masForDeep)
console.log('masForDeep1 ', masForDeep1)

// Пример 2 - изменяем массив исходный
let masForDeep2 = [1, 3, 7]
let masForDeep3 = [...masForDeep2];

console.log('masForDeep2 ', masForDeep2)
console.log('masForDeep3 ', masForDeep3)

masForDeep2[0] = 88;

console.log('masForDeep2 ', masForDeep2)
console.log('masForDeep3 ', masForDeep3)

/** Еще способ это обойти - это сделать новую инициализацию нового массива - например с помощью конструктора new Array **/

// Способы это обойти - создать глубокую копию, а не просто ссылку

// Пример 1 - изменяем переменную, которой присвоили ссылку на переменную
let masNewInit = [1, 3, 7]
let masNewInit1 = new Array(...masNewInit);
console.log('masNewInit ', masNewInit)
console.log('masNewInit1 ', masNewInit1)

masNewInit1[0] = 88;

console.log('masNewInit ', masNewInit)
console.log('masNewInit1 ', masNewInit1)

// Пример 2 - изменяем массив исходный
let masNewInit2 = [1, 3, 7]
let masNewInit3 = new Array(...masNewInit2);

console.log('masNewInit2 ', masNewInit2)
console.log('masNewInit3 ', masNewInit3)

masNewInit2[0] = 88;

console.log('masNewInit2 ', masNewInit2)
console.log('masNewInit3 ', masNewInit3)

/** Создаем по сути глубокую копию через JSON - но тут на самом деле срабатывает то как раз механизм инициализации **/

// Пример 1 - изменяем переменную, которой присвоили ссылку на переменную
let masJson = [1, 3, 7]
let masJson1 = JSON.parse(JSON.stringify(masJson));
console.log('masJson ', masJson)
console.log('masJson1 ', masJson1)

masJson1[0] = 88;

console.log('masJson ', masJson)
console.log('masJson1 ', masJson1)

// Пример 2 - изменяем массив исходный
let masJson2 = [1, 3, 7]
let masJson3 = JSON.parse(JSON.stringify(masJson2));

console.log('masJson2 ', masJson2)
console.log('masJson3 ', masJson3)

masJson2[0] = 88;

console.log('masJson2 ', masJson2)
console.log('masJson3 ', masJson3)

/** Случай с вложенными структурами данных, и когда мы не делаем deep copy на всех уровнях вложенности. **/

// Пример 1 - изменяем переменную, которой присвоили ссылку на переменную
let masSemiDeep = [[56, 900], 3, 7,]
let masSemiDeep1 = [...masSemiDeep];
console.log('masSemiDeep ', masSemiDeep)
console.log('masSemiDeep1 ', masSemiDeep1)

masSemiDeep1[0][0] = 88;

console.log('masSemiDeep ', masSemiDeep)
console.log('masSemiDeep1 ', masSemiDeep1)

// Пример 2 - изменяем массив исходный
let masSemiDeep2 = [[56, 900], 3, 7,]
let masSemiDeep3 = [...masSemiDeep2];

console.log('masSemiDeep2 ', masSemiDeep2)
console.log('masSemiDeep3 ', masSemiDeep3)

masSemiDeep2[0][0] = 88;

console.log('masSemiDeep2 ', masSemiDeep2)
console.log('masSemiDeep3 ', masSemiDeep3)


