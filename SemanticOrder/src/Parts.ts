import { EOL } from "os";

import { basename } from 'path'
import { bufferFile, bufferDir } from "./utils.js";
import { Part, Dep } from "./Part.js";

const LECT_DIR = '../data/js/';


export { Part, Parts }

type Temp = {
   index: number,
   name: string,
   markers: string,
   start: number
};

class Parts {
   _parts: Part[];


   // Load markers from 'markers.txt'
   //
   constructor()
   {
      this._parts = [];
      this.partsFromAllLects();
      this.findDeps();
   }

   // 1-st run: make temporary objects: {index, name, start}[]
   //
   private doTemps(text: string): Temp[] {

      const PART_SEPAR: RegExp = /@2\s*(.+)\s*@@(.+)/g;

      let ts: Temp[] = [];
      let match: RegExpExecArray | null;
      do {
         match = PART_SEPAR.exec(text!);
         if (match) {
            ts.push({
               index: match.index,
               name: match[1],
               markers: match[2],
               start: match.index + match[0].length
            });
         } else {
            ts.push({
               index: text?.length!,
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
   private bodyFromOneLect(lectFile: string)
   {
      let text: string | null = bufferFile(lectFile);
      let ts: Temp[] = this.doTemps(text!);

      // 2-nd run: fill a part body
      for (let i = 0; i < ts.length - 1; i++) {
         let markers = ts[i].markers.split('|');
         let part = new Part(ts[i].name, markers)    // this._parts.find(p => p.id == ts[i].name);
  
         part.lectName = basename(lectFile, 'txt');
         let line = text!.slice(ts[i].start, ts[i + 1].index).trim();
         part.body = line;
         this._parts.push(part);
      }

   }

   // Get part bodies from a lecture dir
   //
   private partsFromAllLects()
   {
      const fileNames = bufferDir(LECT_DIR);
      fileNames?.forEach(fname => this.bodyFromOneLect(LECT_DIR + fname));
   }

   // Find all dependencies
   //
   private findDeps() {
      for (let i1 = 0; i1 < this._parts.length; i1++) {
         const part1 = this._parts[i1]; 
         for (let i2 = 0; i2 < this._parts.length; i2++) {
            if (i1 == i2) continue;
            const part2 = this._parts[i2];
            for (let i = 0; i < part1.regexps.length; i++) { 
               const regexp = part1.regexps[i];
               if (regexp.test(part2.body))
               {
                  // deps: part2 -> part1
                  part2.deps.push({ partId: part1.id, distance: i1 - i2, marker: part1.markers[i] });
               }
            }
         }
      }
   }

   
   public get resume() : Resume
   {
      let sum: Resume = { count: 0, posDist: 0, negDist: 0, bodyLength: 0 };
      for (const part of this._parts) {
         sum.bodyLength += part.body.length;
         sum.count++;
         for (let dep of part.deps) {
            if (dep.distance > 0) {
               sum.posDist += dep.distance;
            } else {
               sum.negDist += -dep.distance;
            }
         }
      }
      return sum;
   } 
}

type Resume = { count: number, posDist: number, negDist: number, bodyLength: number };