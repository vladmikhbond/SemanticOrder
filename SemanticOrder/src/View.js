"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showResume = exports.showConcepts = exports.showDeps = void 0;
const utils_js_1 = require("./utils.js");
function showDeps(parts) {
    function show(parts) {
        let lectName = '';
        for (const part of parts) {
            // print lecture name
            if (part.lectName !== lectName) {
                lectName = part.lectName;
                console.log(utils_js_1.color.cian + '\n -------' + lectName + ' -------');
            }
            //let sumInvers = part.sumOfInversions ? `  (${part.sumOfInversions})` : '';
            // print part id
            console.log(utils_js_1.color.white + part.ordNo + '.' + part.id); // + '  ' + color.red + sumInvers);
            console.log(' ' + utils_js_1.color.yellow, part.markers.join(' | '));
            if (part.deps.length == 0)
                console.log(utils_js_1.color.green + '        - no deps');
            // print dependencies
            for (let dep of part.deps) {
                let distanceColor = dep.distance > 0 ? utils_js_1.color.red : utils_js_1.color.green;
                let depOrdNo = dep.distance + part.ordNo;
                console.log('        ' +
                    utils_js_1.color.white + depOrdNo + '.' + dep.partId + ' ' +
                    utils_js_1.color.yellow + dep.marker + ' ' +
                    distanceColor + dep.distance + utils_js_1.color.white);
            }
        }
    }
    let _parts = parts.parts;
    show(_parts);
    const badParts = _parts.filter(p => p.sumOfInversions > 0);
    if (badParts.length == 0) {
        console.log("\nNO BAD PARTS");
    }
    else {
        console.log("\n---------------- INVERSE DEPENDENCIES ONLY ------------------\n");
        show(badParts);
    }
}
exports.showDeps = showDeps;
function showConcepts(parts) {
    console.log("---------------------- CONCEPTS ------------------------\n");
    for (const concept of parts.concepts) {
        const markerColor = concept.homeParts.length > 1 ? utils_js_1.color.red : utils_js_1.color.yellow;
        console.log(markerColor + concept.marker + utils_js_1.color.white, concept.homeParts.map(p => `${p.ordNo}.${p.id}  in  ${p.lectName.slice(0, 10)}...`));
    }
}
exports.showConcepts = showConcepts;
function showResume(parts) {
    let res = parts.resume;
    console.log('Concept number', parts.concepts.length);
    console.log('Parts number  ', res.count);
    console.log('Positive dist ', res.posDistance);
    console.log('Negative dist ', res.negDistance);
    console.log('Sum body size ', res.bodyLength);
    console.log();
}
exports.showResume = showResume;
//# sourceMappingURL=View.js.map