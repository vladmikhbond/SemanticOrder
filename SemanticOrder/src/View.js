"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFiles = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
const utils_js_1 = require("./utils.js");
;
// Резюме курса (концепты)
//
function conceptSummary(parts) {
    let summary = { count: 0, posCount: 0, posDistance: 0, negCount: 0, negDistance: 0, bodyLength: 0 };
    for (const part of parts.parts) {
        summary.bodyLength += part.body.length;
        summary.count++;
        for (let dep of part.deps) {
            let distance = part.ordNo - dep.ordNo;
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
    let sum = conceptSummary(parts);
    let str = ` ----- ${parts.lectDir} ------
 Concept number:      ${parts.concepts.length}
 Parts number:        ${sum.count}
 Positive count/dist: ${sum.posCount}/${sum.posDistance}
 Negative count/dist: ${sum.negCount}/${sum.negDistance}
 Sum body size:       ${sum.bodyLength}
`;
    return str;
}
// ------------------------------ Gistorgrams ---------------------------------------- 
// Гистограмма востребованности концептов 
// по гор - востребованность (в скольких частях использован), по вер - количество коцептов
//
function conceptUsingGist(parts) {
    let counters = new Array(50).fill(0);
    for (const c of parts.concepts) {
        counters[c.usingCount] += 1;
    }
    return (0, utils_js_1.trimArray)(counters);
}
// Гистограмма зависимости частей
// по гор - зависимость (от скольких частей зависима часть), по вер - количество частей
//
function partDependGist(parts) {
    let counters = new Array(50).fill(0);
    for (const p of parts.parts) {
        counters[p.partDependantCount] += 1;
    }
    return (0, utils_js_1.trimArray)(counters);
}
// Гистограмма плодовитости частей
// по гор - количество концептов, порожденных частью, по вер - количество частей
//
function partDefGist(parts) {
    let counters = new Array(50).fill(0);
    for (const p of parts.parts) {
        counters[p.conceptDefCount] += 1;
    }
    return (0, utils_js_1.trimArray)(counters);
}
Array.prototype.toString = function () {
    return this.join("\n");
};
// --------------------------------------
function conceptsToString(parts) {
    let str = 'Concept\tRegex\tHome\tHomePartLects\tDeps\tDepPartLects\tSumBadDist' + os_1.EOL;
    for (const c of parts.concepts) {
        let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
        let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
        let badDistance = c.badDistance ? c.badDistance.toString() : " ";
        str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
            `${c.dependantParts.length}\t${dependLects}\t${badDistance}${os_1.EOL}`;
    }
    return str;
}
function partsToString(parts) {
    let str = 'OrdNo\tPartId\tLectName\tDefs\tDeps\tCumDefs\tCumDeps' + os_1.EOL;
    let cumDefs = 0, cumDeps = 0;
    for (const p of parts.parts) {
        cumDefs += p.conceptDefCount;
        cumDeps += p.partDependantCount;
        str +=
            `${p.ordNo}\t${p.id}\t${p.lectName}\t` +
                `${p.conceptDefCount}\t${p.partDependantCount}\t${cumDefs}\t${cumDeps}\t${os_1.EOL}`;
    }
    return str;
}
// -----------------------------------------------------------------------------------
function toFiles(parts, fileConcepts, fileParts) {
    const conceptStr = conceptsToString(parts) +
        os_1.EOL + conceptUsingGist.name + os_1.EOL +
        conceptUsingGist(parts).toString();
    const partStr = partsToString(parts) +
        os_1.EOL + partsToString.name + os_1.EOL +
        partDependGist(parts).toString() +
        os_1.EOL + partDefGist.name + os_1.EOL +
        partDefGist(parts).toString();
    (0, fs_1.writeFileSync)(fileConcepts, conceptStr);
    (0, fs_1.writeFileSync)(fileParts, partStr);
    const summaryStr = summaryToString(parts);
    console.log(summaryStr);
}
exports.toFiles = toFiles;
//# sourceMappingURL=View.js.map