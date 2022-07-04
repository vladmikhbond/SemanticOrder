"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const utils_js_1 = require("./src/utils.js");
const parts = new Parts_js_1.Parts();
parts.bodyFromAllLects();
parts.findDeps();
show(parts);
function show(parts) {
    for (let p of parts._parts) {
        console.log('@2', p.id);
        if (p.deps.length == 0)
            console.log('        -');
        for (let d of p.deps) {
            let letColor = d.len < 0 ? utils_js_1.color.red : utils_js_1.color.green;
            console.log('        ' + utils_js_1.color.white + d.partId + ' ' +
                utils_js_1.color.yellow + d.marker + ' ' +
                letColor + d.len + utils_js_1.color.white);
        }
    }
}
//# sourceMappingURL=app.js.map