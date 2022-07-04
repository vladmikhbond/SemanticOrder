
import { bufferFile, bufferDir } from "./utils.js";
import { Part, Dep } from "./Part.js";
import { EOL } from "os";


const markersFile = '../data/markers.txt';
const lectDir = '../data/lections/';

export { Part, Parts }


type Temps = { index: number, name: string, start: number }[];

class Parts {
   _parts: Part[];


   // Load markers from 'markers.txt'
   //
   constructor()
   {
      let text: string | null = bufferFile(markersFile);
      const regex: RegExp = /^---(.*)/gm;
      let ts: Temps = this.doTemps(text!, regex);
      
      // 2-nd run: create parts with markers only
      this._parts = [];
      for (let i = 0; i < ts.length - 1; i++) {
          let line = text!.slice(ts[i].start, ts[i + 1].index).trim();
          let markers = line.split(EOL);
          
          this._parts.push(new Part(ts[i].name, markers));
      }
   }

   // 1-st run: make temporary objects 
   //
   doTemps(text: string, regex: RegExp): Temps {
      let ts: Temps = [];
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
      return ts;
   }


   // Get part bodies from a lecture file.
   // sample: "@2 id"
   bodyFromOneLect(lectFile: string)
   {
      let text: string | null = bufferFile(lectFile);
      const regex: RegExp = /^@2\s*(.*)/gm;
      let ts: Temps = this.doTemps(text!, regex);

      // 2-nd run: fill a part body
      for (let i = 0; i < ts.length - 1; i++) {
         let part = this._parts.find(p => p.id == ts[i].name);
         if (part) {
            let line = text!.slice(ts[i].start, ts[i + 1].index).trim();
            part.body = line;
         }
      }

   }

   // Get part bodies from a lecture dir
   //
   bodyFromAllLects() {
      const fileNames = bufferDir(lectDir);
      fileNames?.forEach(fname => this.bodyFromOneLect(lectDir + fname));
   }

   // 
   findDeps() {
      for (let i1 = 0; i1 < this._parts.length; i1++) {
         const part1 = this._parts[i1]; 
         for (let i2 = 0; i2 < this._parts.length; i2++) {
            if (i1 == i2) continue;
            const part2 = this._parts[i2];
            for (let regexp of part1.regexps) {
               if (regexp.test(part2.body)) {
                  // deps: part2 -> part1
                  part2.deps.push({ partId: part1.id, len: i2 - i1, regexp });
               }
            }
         }

      }
   }


}