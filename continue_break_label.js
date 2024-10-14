
// оператор continue


    // В цикле while переводит выполнение кода на следующую итерацию
    let feg = 9;
    while (feg > 1) {
        feg = feg -1;
        if (feg === 3) {
            continue;
        }
        console.log('feg = ', feg);
    }

// В цикле for переводит выполнение кода на выражение обновления

    for (let i=0; i < 11; i++) {

        if (i === 6) {
            continue;
        }
        console.log('i = ', i);
    }

    // оператор continue вместе с меткой label

/**
 * Метки используются вместе с операторами break и continue. Они выступают в роли идентификатора инструкции, на который можно сослаться.
 */
// let str = 0;
// loop1: for (let i = 0; i < 5; i++) {
//     if (i === 1) {
//         continue loop1;
//     }
//     str = str + i;
// }

loop1: for (let i = 0; i < 5; i++) {
    loop2: for (let j = 0; j < 5; j++) {
        loop3: for (let k = 0; k < 5; k++) {
            /** сравни действие continue и break ! **/
            // if (k === 3) {
            //     continue loop1;
            // }
            if (k === 3) {
                break loop1;
            }
            console.log('loop3 ', k);
        }
        console.log('loop2 ', j);

    }
   console.log('loop1 ', i);
}


/** оператор continue c label или без него нельзя использовать
 * - на верхнем куровне скрипта
 * - на верхнем уровне функции
 * - на верхнем уровне цикла
 * - на верхнем уровне статического блока инициализации {}
 * - на верхнем уровне методов объекта/класса и т д
 */

// block_1: {
//     console.log('1');
//     ( function() {
//         break block_1; // SyntaxError: Undefined label 'block_1'
//     })();
// }