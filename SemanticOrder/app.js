"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const utils_js_1 = require("./src/utils.js");
const parts = new Parts_js_1.Parts();
showPartDeps(parts);
function showPartDeps(parts) {
    let i = 1;
    for (const part of parts._parts) {
        let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
        // назва частини
        console.log(utils_js_1.color.white + (i++) + '. ' + part.id + '  '
            + utils_js_1.color.magenta + part.lectName
            + utils_js_1.color.red + inversIndex);
        if (part.deps.length == 0)
            console.log(utils_js_1.color.green + '        - no deps');
        for (let d of part.deps) {
            let distanceColor = d.distance > 0 ? utils_js_1.color.red : utils_js_1.color.green;
            // залежності частини
            console.log('        ' +
                utils_js_1.color.white + d.partId + ' ' +
                utils_js_1.color.yellow + d.marker + ' ' +
                distanceColor + d.distance + utils_js_1.color.white);
        }
    }
}
//# sourceMappingURL=app.js.map