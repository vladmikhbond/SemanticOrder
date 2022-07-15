"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concept = void 0;
// Поняття і частини, де воно визначається
//
class Concept {
    constructor(marker, part) {
        this.marker = marker;
        this.homeParts = [part];
        this.regexp = marker2regex(marker);
        this.dependantParts = [];
    }
}
exports.Concept = Concept;
// Виробляє регекс
// Символам *\.'"-{}$^  передує бекслеш.
// Заміни:
//   space ->   \s+
//   +     ->   \w{0,3}
// Якщо маркер - слово, оточуємо його межами слова  \b
//
function marker2regex(marker) {
    const META = "-*/|\\.'\"{}$^()[]";
    const NON_ALPHA = "\\ $.=[_";
    // stage 1 - replacement in marker
    marker = marker
        .replace('verbar2', '||') // 'verbar2' -> '||'
        .replace('verbar', '|'); // 'verbar' -> '|'
    // stage 2 - insert '\' before META symbols
    let markerArray = [];
    for (let c of marker) {
        if (META.includes(c))
            markerArray.push('\\');
        markerArray.push(c);
    }
    ;
    marker = markerArray.join('');
    // stage 3 - replacement in regex
    marker = marker
        .replace(/\+/g, "\\w{0,3}") //        '+' -> '\w{0,3}'
        .replace(/\s/g, "\\s+") //      space -> '\s+'
        .replace(/ANYCHARS/, ".+"); // 'ANYCHARS' -> '.+'
    if (!NON_ALPHA.includes(marker[0]))
        marker = '\\b' + marker + '\\b';
    return new RegExp(marker, "gu");
}
// TEST ===============================
// console.log(marker2regex("111+ 222+").toString());        //   \b111\w{0,3}\s+222\w{0,3}\b
//# sourceMappingURL=Concept.js.map