"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parts = exports.Part = void 0;
const utils_js_1 = require("./utils.js");
const Part_js_1 = require("./Part.js");
Object.defineProperty(exports, "Part", { enumerable: true, get: function () { return Part_js_1.Part; } });
const os_1 = require("os");
const markersFile = '../data/markers.txt';
const lectDir = '../data/lections/';
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
            let markers = line.split(os_1.EOL);
            this._parts.push(new Part_js_1.Part(ts[i].name, markers));
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
        for (let i1 = 0; i1 < this._parts.length; i1++) {
            const part1 = this._parts[i1];
            for (let i2 = 0; i2 < this._parts.length; i2++) {
                if (i1 == i2)
                    continue;
                const part2 = this._parts[i2];
                for (let i = 0; i < part1.regexps.length; i++) {
                    const regexp = part1.regexps[i];
                    if (regexp.test(part2.body)) {
                        // deps: part2 -> part1
                        part2.deps.push({ partId: part1.id, len: i2 - i1, marker: part1.markers[i] });
                    }
                }
            }
        }
    }
}
exports.Parts = Parts;
//# sourceMappingURL=Parts.js.map