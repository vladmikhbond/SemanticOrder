/**
 * ???????? Parts ? ????? markers.txt
 * [???????? ??????? ????? ????????]
 * ????????? ???? body ? ?????? ??????
 * ????????? ???? deps ??????????? ???????
 */

import bufferFile from "./utils.js";
var os = require('os');

const markersFile = '../data/markers.txt';



export { Part, Parts }

class Part {
    id: string;
    markrers: string[];
    body: string;
    deps: Part[];

    constructor(id, markers)
    {
        this.id = id;
        this.markrers = markers;
    }
}

class Parts {
  
   _parts: Part[];

   constructor()
   {
      let text: string | null = bufferFile(markersFile);
      const regex = /^---(.*)/gm;
        
      let ts: { index: number, name: string, start: number }[] = [];
      let match: RegExpExecArray | null;
      do {
          match = regex.exec(text!);
          if (match) {
              ts.push({                 
                  index: match.index,
                  name: match[1],
                  start: match.index + match[0].length
              });
          } else {
              ts.push({
                  index: text?.length!,
                  name: "",
                  start: -1
              });
          }
      } while (match);


      this._parts = [];
      for (let i = 0; i < ts.length - 1; i++) {
          let line = text!.slice(ts[i].start, ts[i + 1].index).trim();
          let markers = line.split(os.EOL);
          this._parts.push(new Part(ts[i].name, markers));
      }
      
 
   }

}