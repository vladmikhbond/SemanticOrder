"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Course_js_1 = require("./src/Course.js");
const View_js_1 = require("./src/View.js");
const course = new Course_js_1.Course('../data/oop/');
(0, View_js_1.toFiles)(course, 'excel_concepts.txt', 'excel_parts.txt');
//# sourceMappingURL=app.js.map