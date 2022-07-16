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
//
function marker2regex(marker) {
    const META = "-*/|\\.'\"{}$^()[]";
    const NON_ALPHA = "\\ $.=[_";
    const LL = "цукенгшщзхїфівапролджєячсмитбю";
    // stage 1 - insert '\' before META symbols
    let markerArray = [];
    for (let c of marker) {
        if (META.includes(c))
            markerArray.push('\\');
        markerArray.push(c);
    }
    ;
    let marker1 = markerArray.join('');
    // stage 2 - replacement in marker
    let marker2 = marker1
        .replace(/\+/g, "\\w{0,3}") //        '+' -> '\w{0,3}'
        .replace(/\s/g, "\\s+") //      space -> '\s+'
        .replace(/ANYCHARS/g, ".+") // 'ANYCHARS' -> '.+'
        .replace(/PLUS/g, "\\+") //     'PLUS' -> '\+'
        .replace('VERBAR2', '\\|\\|') //  'VERBAR2' -> '\|\|'
        .replace('VERBAR', '\\|'); //   'VERBAR' -> '\|'
    // stage 3 - add word bounds
    const c0 = marker[0];
    let marker3 = NON_ALPHA.includes(c0) ? marker2 : `\\W${marker2}\\W`;
    if (LL.includes(c0)) {
        let cC = '[' + c0 + '|' + c0.toUpperCase() + ']';
        marker3 = marker3.replace(c0, cC);
    }
    return new RegExp(marker3, "gm");
}
// TEST ===============================
// console.log(marker2regex("111+ 222+").toString());       
//# sourceMappingURL=Concept.js.map