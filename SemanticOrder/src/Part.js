"use strict";
/**
 * ???????? Parts ? ????? markers.txt
 * [???????? ??????? ????? ????????]
 * ????????? ???? body ? ?????? ??????
 * ????????? ???? deps ??????????? ???????
 */
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
    constructor() {
        let text = (0, utils_js_1.default)(markersFile);
        const regex = /^---(.*)/gm;
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
        this._parts = [];
        for (let i = 0; i < ts.length - 1; i++) {
            let line = text.slice(ts[i].start, ts[i + 1].index).trim();
            let markers = line.split(os.EOL);
            this._parts.push(new Part(ts[i].name, markers));
        }
    }
}
exports.Parts = Parts;
//# sourceMappingURL=Part.js.map