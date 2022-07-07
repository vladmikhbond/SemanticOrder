"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const utils_js_1 = require("./src/utils.js");
const parts = new Parts_js_1.Parts();
showPartDeps(parts);
function showPartDeps(parts) {
    for (const part of parts._parts) {
        // назва частини
        console.log(utils_js_1.color.white + '@2 ' + part.id + '  ' + utils_js_1.color.magenta + part.lectName);
        if (part.deps.length == 0)
            console.log('        -');
        for (let d of part.deps) {
            let letColor = d.len < 0 ? utils_js_1.color.red : utils_js_1.color.green;
            // залежності частини
            console.log('        ' +
                utils_js_1.color.white + d.partId + ' ' +
                utils_js_1.color.yellow + d.marker + ' ' +
                letColor + d.len + utils_js_1.color.white);
        }
    }
}
//# sourceMappingURL=app.js.map