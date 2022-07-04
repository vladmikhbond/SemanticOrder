"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part = void 0;
class Part {
    constructor(id, markers) {
        this.deps = [];
        this.id = id;
        this.regexps = markers.map(m => marker2regex(m));
    }
}
exports.Part = Part;
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
// TEST ===============================
//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/
//# sourceMappingURL=Part.js.map