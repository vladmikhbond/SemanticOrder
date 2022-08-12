"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFiles = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
;
// Резюме курса 
//
function couseSummary(parts) {
    let summary = { posCount: 0, posDistance: 0, negCount: 0, negDistance: 0, bodyLength: 0 };
    for (const part of parts.parts) {
        summary.bodyLength += part.body.length;
        for (let dep of part.deps) {
            let distance = dep.ordNo - part.ordNo;
            if (distance > 0) {
                summary.posCount++;
                summary.posDistance += distance;
            }
            else {
                summary.negCount++;
                summary.negDistance += -distance;
            }
        }
    }
    return summary;
}
function summaryToString(parts) {
    let sum = couseSummary(parts);
    // Концепты пролога не считаются
    let [concepts, part] = parts.parts[0].id === "Prolog" ? [parts.parts[0].conceptDefCount, 1] : [0, 0];
    let conceptNum = parts.concepts.length - concepts;
    let partsNum = parts.parts.length - part;
    let str = ` ----- ${parts.lectDir} ------
 Concept number:      ${conceptNum}
 Parts number:        ${partsNum}
 Concepts / Parts:    ${conceptNum / partsNum}
 Positive count/dist: ${sum.posCount}/${sum.posDistance}
 Negative count/dist: ${sum.negCount}/${sum.negDistance}
 Sum body size:       ${sum.bodyLength}
`;
    str += os_1.EOL + inversions(parts);
    return str;
}
function inversions(parts) {
    let str = '';
    for (const c of parts.concepts) {
        if (c.badDistance) {
            str += `${align(c.marker, 20)} :  ${align(c.homeParts[0].face, 40)} <--- ${align(c.dependantParts[0].face, 40)}${os_1.EOL}`;
        }
    }
    return str;
    function align(s, n) {
        return (s + "                                       ").slice(0, n);
    }
}
// ------------------------------ Gistorgrams ----------------------------------------
//// Гистограмма востребованности концептов
//// по гор - востребованность (в скольких частях использован), по вер - количество коцептов
////
//function conceptUsingGist(parts: Parts): Number[] {
//   let counters: number[] = new Array(50).fill(0);
//   for (const c of parts.concepts) {
//      counters[c.usingCount] += 1;
//   }
//   return trimArray(counters);
//}
//// Гистограмма зависимости частей
//// по гор - зависимость (от скольких частей зависима часть), по вер - количество частей
////
//function partDependGist(parts: Parts): Number[] {
//   let counters: number[] = new Array(50).fill(0);
//   for (const p of parts.parts) {
//      counters[p.partDependantCount] += 1;
//   }
//   return trimArray(counters);
//}
//// Гистограмма плодовитости частей
//// по гор - количество концептов, порожденных частью, по вер - количество частей
////
//function partDefGist(parts: Parts): Number[] {
//   let counters: number[] = new Array(50).fill(0);
//   for (const p of parts.parts) {
//      counters[p.conceptDefCount] += 1;
//   }
//   return trimArray(counters);
//}
//Array.prototype.toString = function (): string {
//   return this.join("\n");
//}
// -------------------------------------- Excell -------------------------------
function conceptsToString(parts) {
    let str = 'Concept\tRegex\tDefed\tDefedInParts\tUsed\tUsedInParts\tdistance1\tSumBadDist' + os_1.EOL;
    for (const c of parts.concepts) {
        let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
        let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
        let dist_1 = c.dependantParts[0] ? c.dependantParts[0].ordNo - c.homeParts[0].ordNo : 0;
        let badDistance = c.badDistance ? c.badDistance.toString() : " ";
        str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
            `${c.dependantParts.length}\t${dependLects}\t${dist_1}\t${badDistance}${os_1.EOL}`;
    }
    return str;
}
function partsToString(parts) {
    let str = 'OrdNo\tPartId\tLectName\tDefed\tUsed' + os_1.EOL;
    for (const p of parts.parts) {
        str +=
            `${p.ordNo}\t${p.id}\t${p.lectName}\t` +
                `${p.conceptDefCount}\t${p.partDependantCount}\t${os_1.EOL}`;
    }
    return str;
}
// -----------------------------------------------------------------------------------
function toFiles(parts, fileConcepts, fileParts) {
    const conceptStr = conceptsToString(parts);
    const partStr = partsToString(parts);
    (0, fs_1.writeFileSync)(fileConcepts, conceptStr);
    (0, fs_1.writeFileSync)(fileParts, partStr);
    const summaryStr = summaryToString(parts);
    console.log(summaryStr);
}
exports.toFiles = toFiles;
//# sourceMappingURL=View.js.map