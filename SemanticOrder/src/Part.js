"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concept = exports.Part = void 0;
const utils_js_1 = require("./utils.js");
// Частина лекційного курсу
//
class Part {
    constructor(id, markers) {
        this.deps = [];
        this.id = id;
        this.markers = markers;
    }
    get sumOfInversions() {
        let sum = 0;
        this.deps.filter(d => d.distance > 0)
            .forEach(d => sum += d.distance);
        return sum;
    }
}
exports.Part = Part;
// Поняття і частини, де воно визначається
//
class Concept {
    constructor(marker, part) {
        this.marker = marker;
        this.homeParts = [part];
        this.regexp = (0, utils_js_1.marker2regex)(marker);
    }
}
exports.Concept = Concept;
//# sourceMappingURL=Part.js.map