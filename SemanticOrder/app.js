"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const View_js_1 = require("./src/View.js");
const parts = new Parts_js_1.Parts();
(0, View_js_1.showPartDeps)(parts);
console.log('\n', parts.resume);
//# sourceMappingURL=app.js.map