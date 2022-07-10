"use strict";
// import { EOL } from "os";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parts = exports.Part = void 0;
const path_1 = require("path");
const utils_js_1 = require("./utils.js");
const Part_js_1 = require("./Part.js");
Object.defineProperty(exports, "Part", { enumerable: true, get: function () { return Part_js_1.Part; } });
const LECT_DIR = '../data/js/';
const PART_SEPAR = /@2\s*(.+)\s*@@\s*(.+)/g;
class Parts {
    // Load markers from 'markers.txt'
    //
    constructor() {
        this.parts = [];
        this.partsFromAllLects();
        this.fillAllConcepts();
        this.findDeps();
    }
    // 1-st run: make temporary objects: {index, name, start}[]
    //
    doTemps(text) {
        let ts = [];
        let match;
        do {
            match = PART_SEPAR.exec(text);
            if (match) {
                ts.push({
                    index: match.index,
                    name: match[1],
                    markers: match[2],
                    start: match.index + match[0].length
                });
            }
            else {
                ts.push({
                    index: text === null || text === void 0 ? void 0 : text.length,
                    name: "",
                    markers: "",
                    start: -1
                });
            }
        } while (match);
        return ts;
    }
    // Get part bodiy from a lecture file.
    // Example of a header:
    //    @2 Версії JS 
    //    @@ ECMAScript| ES2015 | ES6 | ES
    //
    bodyFromOneLect(lectFile) {
        let text = (0, utils_js_1.bufferFile)(lectFile);
        let ts = this.doTemps(text);
        // 2-nd run: fill a part body
        for (let i = 0; i < ts.length - 1; i++) {
            let markers = ts[i].markers.split('|');
            let part = new Part_js_1.Part(ts[i].name, markers); // this._parts.find(p => p.id == ts[i].name);
            part.lectName = (0, path_1.basename)(lectFile, 'txt');
            let line = text.slice(ts[i].start, ts[i + 1].index).trim();
            part.body = line;
            this.parts.push(part);
        }
    }
    // Get part bodies from a lecture dir
    //
    partsFromAllLects() {
        var _a;
        const fileNames = (_a = (0, utils_js_1.bufferDir)(LECT_DIR)) === null || _a === void 0 ? void 0 : _a.sort();
        fileNames === null || fileNames === void 0 ? void 0 : fileNames.forEach(fname => this.bodyFromOneLect(LECT_DIR + fname));
        // ordNo's
        this.parts.forEach((p, i) => p.ordNo = i);
    }
    fillAllConcepts() {
        this.allConcepts = [];
        for (let part of this.parts) {
            for (let marker of part.markers) {
                let idx = this.allConcepts.map(c => c.marker).indexOf(marker);
                if (idx == -1) {
                    this.allConcepts.push(new Part_js_1.Concept(marker, part));
                }
                else {
                    this.allConcepts[idx].homeParts.push(part);
                }
            }
        }
    }
    // Find all dependencies
    //
    findDeps() {
        for (let part2 of this.parts) {
            for (let concept of this.allConcepts) {
                if (concept.regexp.test(part2.body)) {
                    let part1 = concept.homeParts[0];
                    // залежність: part2 -> part1
                    let distance = part1.ordNo - part2.ordNo;
                    if (distance) {
                        part2.deps.push({ partId: part1.id, distance, marker: concept.marker });
                    }
                }
            }
        }
    }
    get resume() {
        let sum = { count: 0, posDist: 0, negDist: 0, bodyLength: 0 };
        for (const part of this.parts) {
            sum.bodyLength += part.body.length;
            sum.count++;
            for (let dep of part.deps) {
                if (dep.distance > 0) {
                    sum.posDist += dep.distance;
                }
                else {
                    sum.negDist += -dep.distance;
                }
            }
        }
        return sum;
    }
}
exports.Parts = Parts;
//# sourceMappingURL=Parts.js.map