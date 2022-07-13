"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const View_js_1 = require("./src/View.js");
const parts = new Parts_js_1.Parts();
let params = process.argv[2];
if (!params)
    params = 'dr';
if (params.includes('c')) {
    console.log('CONCEPTS:');
    (0, View_js_1.showConcepts)(parts);
}
if (params.includes('d')) {
    console.log('\nDEPENDENCIES:');
    (0, View_js_1.showDeps)(parts);
}
if (params.includes('r')) {
    console.log('\nRESUME');
    (0, View_js_1.showResume)(parts);
}
//# sourceMappingURL=app.js.map