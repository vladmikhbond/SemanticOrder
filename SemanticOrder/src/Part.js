"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part = void 0;
// Частина лекц курсу
//
class Part {
    constructor(id, markers) {
        this.deps = [];
        this.id = id;
        this.markers = markers;
        this.regexps = markers.map(m => marker2regex(m));
    }
    get depsInversIndex() {
        let sum = 0;
        this.deps.filter(d => d.distance > 0)
            .forEach(d => sum += d.distance);
        return sum;
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
    const META = "*\\.'\"-{}$^()";
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
    return new RegExp(marker);
}
// TEST ===============================
//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/
//# sourceMappingURL=Part.js.map