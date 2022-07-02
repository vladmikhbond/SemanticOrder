"use strict";
//var fs = require('fs');
//var join = require('path').join;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function bufferFile(relPath) {
    try {
        return (0, fs_1.readFileSync)((0, path_1.join)(__dirname, relPath)).toString();
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
}
exports.default = bufferFile;
//# sourceMappingURL=utils.js.map