"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showConcepts = exports.showDeps = void 0;
const utils_js_1 = require("./utils.js");
function showDeps(parts) {
    console.log("---------------------- DEPENDENCIES ------------------------\n");
    for (const part of parts.parts) {
        let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
        // показ назви частини
        console.log(utils_js_1.color.white + part.ordNo + '. ' + part.id + '  ' +
            '  in ' + part.lectName + '\n' +
            utils_js_1.color.yellow + part.markers + '  ' +
            utils_js_1.color.red + inversIndex);
        if (part.deps.length == 0)
            console.log(utils_js_1.color.green + '        - no deps');
        for (let dep of part.deps) {
            let distanceColor = dep.distance > 0 ? utils_js_1.color.red : utils_js_1.color.green;
            // показ залежності 
            console.log('        ' +
                utils_js_1.color.white + dep.partId + ' ' +
                utils_js_1.color.yellow + dep.marker + ' ' +
                distanceColor + dep.distance + utils_js_1.color.white);
        }
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