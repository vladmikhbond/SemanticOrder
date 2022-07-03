"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parts = exports.Part = void 0;
const utils_js_1 = require("./utils.js");
const os = require('os');
const markersFile = '../data/markers.txt';
const lectDir = '../data/lections/';
class Part {
    constructor(id, markers) {
        this.deps = [];
        this.id = id;
        this.markers = markers;
        this.regexps = markers.map(m => (0, utils_js_1.marker2regex)(m));
    }
}
exports.Part = Part;
class Parts {
    // Load markers from 'markers.txt'
    //
    constructor() {
        let text = (0, utils_js_1.bufferFile)(markersFile);
        const regex = /^---(.*)/gm;
        let ts = this.doTemps(text, regex);
        // 2-nd run: create parts with markers only
        this._parts = [];
        for (let i = 0; i < ts.length - 1; i++) {
            let line = text.slice(ts[i].start, ts[i + 1].index).trim();
            let markers = line.split(os.EOL);
            this._parts.push(new Part(ts[i].name, markers));
        }
    }
    // 1-st run: make temporary objects 
    //
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
    // Get part bodies from a lecture file.
    // sample: "@2 id"
    bodyFromOneLect(lectFile) {
        let text = (0, utils_js_1.bufferFile)(lectFile);
        const regex = /^@2\s*(.*)/gm;
        let ts = this.doTemps(text, regex);
        // 2-nd run: fill a part body
        for (let i = 0; i < ts.length - 1; i++) {
            let part = this._parts.find(p => p.id == ts[i].name);
            if (part) {
                let line = text.slice(ts[i].start, ts[i + 1].index).trim();
                part.body = line;
            }
        }
    }
    // Get part bodies from a lecture dir
    //
    bodyFromAllLects() {
        const fileNames = (0, utils_js_1.bufferDir)(lectDir);
        fileNames === null || fileNames === void 0 ? void 0 : fileNames.forEach(fname => this.bodyFromOneLect(lectDir + fname));
    }
    // 
    findDeps() {
        for (let i = 0; i < this._parts.length; i++) {
            const p1 = this._parts[i];
            for (let j = 0; j < this._parts.length; j++) {
                if (i == j)
                    continue;
                const p2 = this._parts[j];
                for (let regexp of p1.regexps) {
                    if (regexp.test(p2.body)) {
                        // is deps: p2 -> p1
                        p2.deps.push(p1);
                    }
                }
            }
        }
    }
}
exports.Parts = Parts;
//# sourceMappingURL=Parts.js.map