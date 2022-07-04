"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const parts = new Parts_js_1.Parts();
parts.bodyFromAllLects();
parts.findDeps();
//console.log(parts._parts.map(p => [p.markers, p.regexps]));
console.log(parts);
//console.log("---------------------------");
//console.log(parts._parts.map(p => [p.id, p.deps]));
console.log("---------------------------");
for (let p of parts._parts) {
    console.log(p.id);
    for (let d of p.deps) {
        //console.log(`      ${d.partId}  ${d.regexp}  ${d.len}`);
        console.log('        ', d.partId, d.regexp, d.len);
    }
}
//# sourceMappingURL=app.js.map