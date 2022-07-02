//var fs = require('fs');
var join = require('path').join;

import { readFileSync } from 'fs'
//import { join } from 'path'

export default function bufferFile(relPath: string): string | null {
    try {
        return readFileSync(join(__dirname, relPath)).toString(); 
    } catch (err) {
        console.log(err.message)
        return null;
    }
}
