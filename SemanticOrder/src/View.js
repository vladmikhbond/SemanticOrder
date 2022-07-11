"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showConcepts = exports.showDeps = void 0;
const utils_js_1 = require("./utils.js");
function showDeps(parts) {
    function show(parts) {
        let lectName = '';
        for (const part of parts) {
            // print lecture name
            if (part.lectName !== lectName) {
                lectName = part.lectName;
                console.log(utils_js_1.color.cian + '\nЛекція: ' + lectName);
            }
            let sumInvers = part.sumOfInversions ? `  (${part.sumOfInversions})` : '';
            // print part id
            console.log(utils_js_1.color.white + part.ordNo + '.' + part.id + '  ' + utils_js_1.color.red + sumInvers);
            console.log(utils_js_1.color.yellow, part.markers.join(' | '));
            if (part.deps.length == 0)
                console.log(utils_js_1.color.green + '        - no deps');
            // print dependencies
            for (let dep of part.deps) {
                let distanceColor = dep.distance > 0 ? utils_js_1.color.red : utils_js_1.color.green;
                console.log('        ' +
                    utils_js_1.color.white + dep.partId + ' ' +
                    utils_js_1.color.yellow + dep.marker + ' ' +
                    distanceColor + dep.distance + utils_js_1.color.white);
            }
        }
    }
    console.log("\n---------------------- DEPENDENCIES ------------------------\n");
    show(parts);
    const badParts = parts.filter(p => p.sumOfInversions > 0);
    if (badParts.length == 0) {
        console.log("\nNO BAD PARTS");
    }
    else {
        console.log("\n---------------- INVERSE DEPENDENCIES ONLY ------------------\n");
        show(badParts);
    }
}
exports.showDeps = showDeps;
function showConcepts(concepts) {
    console.log("---------------------- CONCEPTS ------------------------\n");
    for (const concept of concepts) {
        const markerColor = concept.homeParts.length > 1 ? utils_js_1.color.red : utils_js_1.color.yellow;
        console.log(markerColor + concept.marker + utils_js_1.color.white, concept.homeParts.map(p => `${p.ordNo}.${p.id}  in  ${p.lectName.slice(0, 10)}...`));
    }
}
exports.showConcepts = showConcepts;
//# sourceMappingURL=View.js.map