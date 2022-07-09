"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const utils_js_1 = require("./src/utils.js");
const parts = new Parts_js_1.Parts();
showPartDeps(parts);
console.log('\n', parts.resume);
function showPartDeps(parts) {
    let i = 1;
    for (const part of parts._parts) {
        let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
        // показ назви частини
        console.log(utils_js_1.color.white + (i++) + '. ' + part.id + '  ' +
            '  [' + part.lectName + '] ' +
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
//# sourceMappingURL=app.js.map