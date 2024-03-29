const x = 0;

const obj = {
  x: 10,
  foo: function() {
    return this.x;
  }
}

obj.foo();
//приведём вызов этого метод объекта в зону выражения
//сработают ли скобки?
(obj.foo)(); //не сработают, данный вызов эквивалентен предыдущему, GetValue не отрабатывает

//присваивание сработает?
(obj.foo = obj.foo)(); // с обоих сторон от оператора присваивания срабатывает GetValue, поэтому результатом будет тип Fuction, а не ReferenceType, следовательно вернёт 0 из глобального объекта(вспоминай правило определения this)

// операторы || или иные операторы сравнения, тернарный оператор и т.д.?
(obj.foo || obj.foo)();//вернёт 0 по тем же причинам, что и предыдущий пример

//инициализатор массива
[obj.foo][0]();//вернёт 0 по тем же причинам, что и предыдущий пример
//и т.д.

/**
Это происходит из-за того, что в зоне выражения у нас всегда срабатывает GetValue. GetValue возвращает тип Function и слева от скобок активации получается не ReferenceType. Вспомним наше правило определения this: Если слева от скобок любой другой тип, то в this проставляется глобальный объект или undefined(на самом деле проставляется null, но т.к. null не имеет определённого значения с точки зрения ecmascript, то он приводится к глобальному объекту, ссылка на который может быть равна undefined в зависимости от strict mode).

Зоной выражения считаются: присваивание(=), операторы || или иные логические операторы, тернарный оператор, инициализатор массива, перечисление через запятую.
**/