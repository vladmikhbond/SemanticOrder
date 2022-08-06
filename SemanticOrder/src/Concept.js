"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concept = void 0;
// Поняття і частини, де воно визначається
//
class Concept {
    constructor(markerStr, homePart) {
        this.marker = markerStr;
        this.homeParts = [homePart];
        let ms = markerStr.split(';');
        let v = ms.map(m => Concept.marker2regex(m)).join('|');
        this.regexp = new RegExp(v, "gm");
        // fill later
        this.dependantParts = [];
        this.badDistance = 0;
    }
    addDependantPart(part) {
        this.dependantParts.push(part);
        let dist = part.ordNo - this.homeParts[0].ordNo;
        if (dist < 0) {
            this.badDistance -= dist;
        }
    }
    get usingCount() {
        return this.dependantParts.length;
    }
    // Виробляє регекс
    //
    static marker2regex(marker) {
        const META = ".-*/|\\'\"{}$^()[]?";
        const NON_ALPHA = "\\ $.=[_!/|+-*?";
        const SMALL = "цукенгшщзхїфівапролджєячсмитбю";
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
            .replace(/\+/g, "[" + SMALL + "]{0,3}") //        '+' -> '\w{0,3}'
            .replace(/\s/g, "\\s+") //      space -> '\s+'
            .replace(/ANYCHARS/g, ".+") // 'ANYCHARS' -> '.+'
            .replace(/PLUS/g, "\\+") //     'PLUS' -> '\+'
            .replace('VERBAR2', '\\|\\|') //  'VERBAR2' -> '\|\|'
            .replace('VERBAR', '\\|') //   'VERBAR' -> '\|'
            .replace('SEMICOLON', ';'); //'SEMICOLON' -> ';'
        // stage 3 - add word bounds
        const c0 = marker[0];
        let marker3 = NON_ALPHA.includes(c0) ? marker2 : `\\W${marker2}\\W`;
        if (SMALL.includes(c0)) {
            let cC = '[' + c0 + '|' + c0.toUpperCase() + ']';
            marker3 = marker3.replace(c0, cC);
        }
        return marker3;
    }
}
exports.Concept = Concept;
// TEST ===============================
// console.log(Concept.marker2regex("111+ 222+").toString());       // /\W111\w{0,3}\s+222\w{0,3}\W/gm
//# sourceMappingURL=Concept.js.map