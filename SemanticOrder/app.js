"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const parts = new Parts_js_1.Parts();
parts.bodyFromAllLects();
parts.findDeps();
//console.log(parts._parts.map(p => [p.markers, p.regexps]));
console.log(parts);
console.log("---------------------------");
console.log(parts._parts.map(p => [p.id, p.deps.map(d => d.id)]));
//# sourceMappingURL=app.js.map