"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parts = exports.Part = void 0;
const path_1 = require("path");
const utils_js_1 = require("./utils.js");
const Part_js_1 = require("./Part.js");
Object.defineProperty(exports, "Part", { enumerable: true, get: function () { return Part_js_1.Part; } });
const Concept_js_1 = require("./Concept.js");
const PART_SEPAR = /^@2\s*(.+)\r\n@@\s*(.+)/gm; // \r\n
const EMPTY_MARKERS = '-';
;
;
class Parts {
    // Load markers from 'markers.txt'
    //
    constructor(lectDir) {
        this.lectDir = lectDir;
        this.partsFromAllLects();
        this.fillConcepts();
        this.findDeps();
    }
    // Get part bodies from a lecture dir
    //
    partsFromAllLects() {
        var _a;
        this.parts = [];
        const fileNames = (_a = (0, utils_js_1.bufferDir)(this.lectDir)) === null || _a === void 0 ? void 0 : _a.sort();
        // bodies
        fileNames === null || fileNames === void 0 ? void 0 : fileNames.forEach(fname => this.bodyFromOneLect(this.lectDir + fname));
        // ordNos
        this.parts.forEach((p, i) => p.ordNo = i);
    }
    // Get part bodiy from a lecture file.
    // Example of a header:
    //    @2 Версії JS 
    //    @@ ECMAScript|ES2015|ES6|ES
    //
    bodyFromOneLect(lectFileName) {
        let text = (0, utils_js_1.bufferFile)(lectFileName);
        // 1-st run
        let ts = this.doTemps(text);
        // 2-nd run: fill a part body
        for (let i = 0; i < ts.length - 1; i++) {
            let markers = ts[i].markersLine.split('|').filter(m => m.length > 0);
            if (ts[i].markersLine === EMPTY_MARKERS) {
                markers = [];
            }
            let part = new Part_js_1.Part(ts[i].name, markers);
            part.lectName = (0, path_1.basename)(lectFileName, 'txt');
            let line = text.slice(ts[i].start, ts[i + 1].index).trim();
            // cut off ignored part
            let match = (/^@2/gm).exec(line);
            if (match) {
                line = line.slice(0, match.index);
            }
            part.body = line;
            this.parts.push(part);
        }
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
                    markersLine: match[2],
                    start: match.index + match[0].length
                });
            }
            else {
                ts.push({
                    index: text === null || text === void 0 ? void 0 : text.length,
                    name: "",
                    markersLine: "",
                    start: -1
                });
            }
        } while (match);
        return ts;
    }
    fillConcepts() {
        this.concepts = [];
        for (let part of this.parts) {
            for (let marker of part.markers) {
                let idx = this.concepts.map(c => c.marker).indexOf(marker);
                if (idx == -1) {
                    this.concepts.push(new Concept_js_1.Concept(marker, part));
                }
                else {
                    this.concepts[idx].homeParts.push(part);
                }
            }
        }
    }
    // Find all dependencies
    //
    findDeps() {
        for (let part of this.parts) {
            for (let concept of this.concepts) {
                if (concept.regexp.test(part.body)) {
                    let homePart = concept.homeParts[0];
                    // залежність: part -> homePart
                    let distance = homePart.ordNo - part.ordNo;
                    if (distance) {
                        part.deps.push({ partId: homePart.id, distance, marker: concept.marker });
                        concept.addDependantPart(part);
                    }
                }
            }
        }
    }
    // Resume of a lecture course
    //
    get resume() {
        let sum = { count: 0, posDistance: 0, negDistance: 0, bodyLength: 0 };
        for (const part of this.parts) {
            sum.bodyLength += part.body.length;
            sum.count++;
            for (let dep of part.deps) {
                if (dep.distance > 0) {
                    sum.posDistance += dep.distance;
                }
                else {
                    sum.negDistance += -dep.distance;
                }
            }
        }
        return sum;
    }
}
exports.Parts = Parts;
//# sourceMappingURL=Parts.js.map