'use strict';

var users = [{
    name: "Вася",
    surname: 'Иванов',
    age: 20
}, {
    name: "Петя",
    surname: 'Чапаев',
    age: 25
}, {
    name: "Маша",
    surname: 'Медведева',
    age: 18
}];

users.sort(byField('name'));
users.forEach(function(user) {
    console.log( user.name );
}); // Вася, Маша, Петя

users.sort(byField('age'));
users.forEach(function(user) {
    console.log( user.name );
}); // Маша, Вася, Петя


function byField(field) {
    let st = String(field);
     return function(a, b) {
         return a[st] > b[st] ? 1: -1;
        };
    }


