"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = exports.bufferDir = exports.bufferFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function bufferFile(relPath) {
    try {
        return (0, fs_1.readFileSync)((0, path_1.join)(__dirname, relPath)).toString();
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
exports.bufferFile = bufferFile;
function bufferDir(relPath) {
    try {
        return (0, fs_1.readdirSync)((0, path_1.join)(__dirname, relPath));
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
exports.bufferDir = bufferDir;
exports.color = {
    white: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cian: '\x1b[36m ',
};
// TEST ===============================
//let ss = bufferDir('../data/lections/');
//# sourceMappingURL=utils.js.map