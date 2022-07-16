"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const View_js_1 = require("./src/View.js");
const parts = new Parts_js_1.Parts('../data/opr/');
//show(parts, process.argv[2]);
(0, View_js_1.show)(parts, 'r');
(0, View_js_1.conceptsToFile)(parts, '111.txt');
//# sourceMappingURL=app.js.map