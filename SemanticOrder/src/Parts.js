"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parts = exports.Part = void 0;
const utils_js_1 = require("./utils.js");
var os = require('os');
const markersFile = '../data/markers.txt';
class Part {
    constructor(id, markers) {
        this.id = id;
        this.markrers = markers;
    }
}
exports.Part = Part;
class Parts {
    // Load markers from 'markers.txt'
    //
    constructor() {
        let text = (0, utils_js_1.default)(markersFile);
        const regex = /^---(.*)/gm;
        // 1-st run: make temporary objects  
        let ts = this.doTemps(text, regex);
        // 2-nd run: create parts with markers only
        this._parts = [];
        for (let i = 0; i < ts.length - 1; i++) {
            let line = text.slice(ts[i].start, ts[i + 1].index).trim();
            let markers = line.split(os.EOL);
            this._parts.push(new Part(ts[i].name, markers));
        }
    }
    doTemps(text, regex) {
        let ts = [];
        let match;
        do {
            match = regex.exec(text);
            if (match) {
                ts.push({
                    index: match.index,
                    name: match[1],
                    start: match.index + match[0].length
                });
            }
            else {
                ts.push({
                    index: text === null || text === void 0 ? void 0 : text.length,
                    name: "",
                    start: -1
                });
            }
        } while (match);
        return ts;
    }
    // Load part bodies from a lecture file
    // "@2 id"
    bodyFromLect(lectFile) {
        let text = (0, utils_js_1.default)(lectFile);
        const regex = /^@2\s*(.*)/gm;
        // 1-st run: make temporary objects  
        let ts = this.doTemps(text, regex);
        for (let i = 0; i < ts.length - 1; i++) {
            let part = this._parts.find(p => p.id == ts[i].name);
            if (part) {
                let line = text.slice(ts[i].start, ts[i + 1].index).trim();
                part.body = line;
            }
        }
    }
}
exports.Parts = Parts;
//# sourceMappingURL=Parts.js.map