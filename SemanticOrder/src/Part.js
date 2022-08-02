"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part = void 0;
// Частина лекційного курсу
//
class Part {
    constructor(id, markers) {
        this.body = '';
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
    get conceptDefCount() {
        return this.markers.length;
    }
    get partDependantCount() {
        return this.deps.length;
    }
}
exports.Part = Part;
//# sourceMappingURL=Part.js.map