"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var fs = require('fs');
var join = require('path').join;
const fs_1 = require("fs");
//import { join } from 'path'
function bufferFile(relPath) {
    try {
        return (0, fs_1.readFileSync)(join(__dirname, relPath)).toString();
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
}
exports.default = bufferFile;
//# sourceMappingURL=utils.js.map