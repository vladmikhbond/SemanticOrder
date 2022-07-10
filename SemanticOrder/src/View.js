"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPartDeps = void 0;
const utils_js_1 = require("./utils.js");
function showPartDeps(parts) {
    for (const part of parts.parts) {
        let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
        // показ назви частини
        console.log(utils_js_1.color.white + part.ordNo + '. ' + part.id + '  ' +
            '  in lect ' + part.lectName + '\n' +
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
exports.showPartDeps = showPartDeps;
//# sourceMappingURL=View.js.map