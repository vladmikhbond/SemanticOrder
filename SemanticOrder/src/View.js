"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.conceptsToFile = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
const utils_js_1 = require("./utils.js");
function conceptsToFile(parts, fname) {
    let str = 'concept\tregex\thome\thome-lect\tdep~dep-lect\tbadDist' + os_1.EOL;
    for (const c of parts.concepts) {
        let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 15)})`).join(', ');
        let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 15)})`).join(', ');
        str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
            `${c.dependantParts.length}\t${dependLects}\t${c.badDistance}${os_1.EOL}`;
    }
    (0, fs_1.writeFileSync)(fname, str);
}
exports.conceptsToFile = conceptsToFile;
/**
 *
 * b - bad deps
 * d - deps
 * s - summary
 */
function show(parts, params = 'cr') {
    if (params.includes('d')) {
        console.log('\nDEPENDENCIES:\n');
        showDeps(parts);
    }
    if (params.includes('b')) {
        console.log('\nBAD DEPS:\n');
        showBadDeps(parts);
    }
    if (params.includes('r')) {
        console.log('\nSUMMARY:\n');
        showSummary(parts);
    }
}
exports.show = show;
function showDeps(parts) {
    partsWithDeps(parts.parts);
}
function showBadDeps(parts) {
    const badParts = parts.parts.filter(p => p.sumOfInversions > 0);
    if (badParts.length == 0) {
        console.log("\nNo bad deps.");
    }
    else {
        partsWithDeps(badParts);
    }
}
function partsWithDeps(parts) {
    let lectName = '';
    for (const part of parts) {
        // print lecture name
        if (part.lectName !== lectName) {
            lectName = part.lectName;
            console.log(utils_js_1.color.cian + '\n -------' + lectName + ' -------');
        }
        // print part id
        let partMarkers = part.markers.join(' | ');
        console.log(utils_js_1.color.white + part.ordNo + '.' + part.id + '   ' + utils_js_1.color.yellow, partMarkers);
        if (part.deps.length == 0)
            console.log(utils_js_1.color.green + '        - no deps');
        // print dependencies
        for (let dep of part.deps) {
            let distanceColor = dep.distance > 0 ? utils_js_1.color.red : utils_js_1.color.green;
            let depOrdNo = dep.distance + part.ordNo;
            console.log(`        ${utils_js_1.color.white}${depOrdNo}.${dep.partId} ` +
                utils_js_1.color.yellow + dep.marker + ' ' +
                distanceColor + dep.distance + utils_js_1.color.white);
        }
    }
}
function showSummary(parts) {
    let res = parts.resume;
    console.log('Concept number', parts.concepts.length);
    console.log('Parts number  ', res.count);
    console.log('Positive dist ', res.posDistance);
    console.log('Negative dist ', res.negDistance);
    console.log('Sum body size ', res.bodyLength);
    console.log();
}
//# sourceMappingURL=View.js.map