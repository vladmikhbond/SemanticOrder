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
function marker2regex(marker) {
    const META = "+-*/|\\.'\"{}$^()[]";
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
    let regex = marker
        .replace(/\+/gm, "\\w\{0\,3\}") //        '+' -> '\w{0,3}'
        .replace(/\s/gm, "\\s+") //      space -> '\s+'
        .replace(/ANYCHARS/gm, "\\s+"); // 'ANYCHARS' -> '.+'
    if (!NON_ALPHA.includes(regex[0]))
        regex = '\\b' + regex + '\\b';
    return new RegExp(regex);
}
// TEST ===============================
//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/
//# sourceMappingURL=Concept.js.map