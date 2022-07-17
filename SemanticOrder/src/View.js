"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFiles = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
function conceptsToString(parts) {
    let str = 'Concept\tRegex\tHome\tHomePartLects\tDeps\tDepPartLects\tSumBadDist' + os_1.EOL;
    for (const c of parts.concepts) {
        let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
        let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
        str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
            `${c.dependantParts.length}\t${dependLects}\t${c.badDistance}${os_1.EOL}`;
    }
    return str;
}
function partsToString(parts) {
    let str = 'OrdNo\tPartId\tLectName\tHome\tDeps\tSumBad' + os_1.EOL;
    for (const p of parts.parts) {
        str += `${p.ordNo}\t${p.id}\t${p.lectName}\t${p.markers.length}\t${p.deps.length}\t${p.sumOfInversions}${os_1.EOL}`;
    }
    return str;
}
function summaryToString(parts) {
    let res = parts.summary;
    let str = `
Concept number ${parts.concepts.length}
Parts number ${res.count}
Positive dist ${res.posDistance}
Negative dist ${res.negDistance}
Sum body size ${res.bodyLength}
`;
    return str;
}
function toFiles(parts, fileConcepts, fileParts) {
    const summary = summaryToString(parts);
    const conceptStr = conceptsToString(parts) + summary;
    (0, fs_1.writeFileSync)(fileConcepts, conceptStr);
    const partStr = partsToString(parts);
    (0, fs_1.writeFileSync)(fileParts, partStr);
    console.log(summary);
}
exports.toFiles = toFiles;
//# sourceMappingURL=View.js.map