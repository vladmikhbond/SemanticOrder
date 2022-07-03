"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marker2regex = exports.bufferDir = exports.bufferFile = void 0;
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
// Виробляємо регекс 
// Символам *\.'"-{}$^  передує бекслеш.
// Заміни:
//   space ->   \s+
//   +     ->   \w{0,3}
//
function marker2regex(marker) {
    const META = "*\\.'\"-{}$^";
    let arr = [];
    for (let c of marker) {
        if (META.includes(c))
            arr.push('\\');
        arr.push(c);
    }
    ;
    marker = arr.join('');
    marker = marker
        .replace(/\s/gm, "\\s")
        .replace(/\+/gm, "\\w\{0\,3\}");
    let regexp = new RegExp(marker);
    return regexp;
}
exports.marker2regex = marker2regex;
// TEST ===============================
//let ss = bufferDir('../data/lections/');
console.log(marker2regex("111\\111")); //  /111\\111/
console.log(marker2regex("111*111'111-111")); //  /111\*111\'111\-111/
console.log(marker2regex("111+ 222+")); //  /111\*111\'111\-111/
//# sourceMappingURL=utils.js.map