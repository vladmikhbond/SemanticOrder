// import { EOL } from "os";

import { basename } from 'path'
import { bufferFile, bufferDir, marker2regex } from "./utils.js";
import { Part, Concept } from "./Part.js";

const LECT_DIR = '../data/js/';
const PART_SEPAR: RegExp = /@2\s*(.+)\s*@@\s*(.+)/g;

export { Part, Parts }

type Temp = {
   index: number,
   name: string,
   markers: string,
   start: number
};

class Parts {
   parts: Part[];
   allConcepts: Concept[];

   // Load markers from 'markers.txt'
   //
   constructor()
   {
      this.parts = [];
      this.partsFromAllLects();
      this.fillAllConcepts();
      this.findDeps();
   }

   // 1-st run: make temporary objects: {index, name, start}[]
   //
   private doTemps(text: string): Temp[] {

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
         this.parts.push(part);
      }

   }

   // Get part bodies from a lecture dir
   //
   private partsFromAllLects()
   {
      const fileNames = bufferDir(LECT_DIR)?.sort();
      fileNames?.forEach(fname => this.bodyFromOneLect(LECT_DIR + fname));
      // ordNo's
      this.parts.forEach((p, i) => p.ordNo = i)
   }

   private fillAllConcepts() {
      this.allConcepts = [];

      for (let part of this.parts) {
         for (let marker of part.markers) {
            let idx = this.allConcepts.map(c => c.marker).indexOf(marker);
            if (idx == -1) {
               this.allConcepts.push(new Concept(marker, part));
            } else {
               this.allConcepts[idx].homeParts.push(part);
            }
         }
      }
   }

   // Find all dependencies
   //
   private findDeps()
   {
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

   
   public get resume() : Resume
   {
      let sum: Resume = { count: 0, posDist: 0, negDist: 0, bodyLength: 0 };
      for (const part of this.parts) {
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