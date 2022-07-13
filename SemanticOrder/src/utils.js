"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marker2regex = exports.color = exports.bufferDir = exports.bufferFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function bufferFile(relPath) {
    try {
        return (0, fs_1.readFileSync)((0, path_1.join)(__dirname, relPath)).toString();
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
exports.bufferFile = bufferFile;
function bufferDir(relPath) {
    try {
        return (0, fs_1.readdirSync)((0, path_1.join)(__dirname, relPath));
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
exports.bufferDir = bufferDir;
exports.color = {
    white: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cian: '\x1b[36m',
};
// Виробляємо регекс 
// Символам *\.'"-{}$^  передує бекслеш.
// Заміни:
//   space ->   \s+
//   +     ->   \w{0,3}
// Якщо маркер - слово, оточуємо його межами слова  \b
function marker2regex(marker) {
    const META = "+-*\/\\.'\"{}$^()[]";
    const NON_ALPHA = "\\ $.=[_";
    let arr = [];
    for (let c of marker) {
        if (META.includes(c))
            arr.push('\\');
        arr.push(c);
    }
    ;
    marker = arr.join('');
    marker = marker
        .replace(/\+/gm, "\\w\{0\,3\}") // 	    + -> \w{0,3}
        .replace(/\s/gm, "\\s+"); //   space -> \s+
    if (!NON_ALPHA.includes(marker[0]))
        marker = '\\b' + marker + '\\b';
    return new RegExp(marker);
}
exports.marker2regex = marker2regex;
// TEST ===============================
//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/
//let ss = bufferDir('../data/lections/');
//# sourceMappingURL=utils.js.map