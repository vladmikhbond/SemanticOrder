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
    get conceptDefCount() {
        return this.markers.length;
    }
    get partDependantCount() {
        return this.deps.length;
    }
    get face() {
        return `${this.lectName} (${this.ordNo}.${this.id})`;
    }
}
exports.Part = Part;
//# sourceMappingURL=Part.js.map