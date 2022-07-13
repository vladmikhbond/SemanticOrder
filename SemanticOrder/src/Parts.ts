import { basename } from 'path'
import { bufferFile, bufferDir } from "./utils.js";
import { Part, Concept } from "./Part.js";

const LECT_DIR = '../data/opr/';
// const LECT_DIR = '../data/test/';

const PART_SEPAR: RegExp = /^@2\s*(.+)\n@@\s*(.+)/gm;

const EMPTY_MARKERS = '-';

export { Part, Parts }

type Temp = {
   index: number,
   name: string,
   markers: string,
   start: number
};

type Resume = {
   count: number,
   posDistance: number,
   negDistance: number,
   bodyLength: number
};

class Parts
{
   parts: Part[];
   concepts: Concept[];

   // Load markers from 'markers.txt'
   //
   constructor()
   {
      this.partsFromAllLects();
      this.fillConcepts();
      this.findDeps();
   }

   // Get part bodies from a lecture dir
   //
   private partsFromAllLects() {
      this.parts = [];
      const fileNames = bufferDir(LECT_DIR)?.sort();
      // bodies
      fileNames?.forEach(fname => this.bodyFromOneLect(LECT_DIR + fname));
      // ordNos
      this.parts.forEach((p, i) => p.ordNo = i)
   }


   // Get part bodiy from a lecture file.
   // Example of a header:
   //    @2 Версії JS 
   //    @@ ECMAScript| ES2015 | ES6 | ES
   //
   private bodyFromOneLect(lectFileName: string) {
      let text: string | null = bufferFile(lectFileName);

      // 1-st run
      let ts: Temp[] = this.doTemps(text!);

      // 2-nd run: fill a part body
      for (let i = 0; i < ts.length - 1; i++) {
         let markers = ts[i].markers.split('|');
         if (ts[i].markers === EMPTY_MARKERS) {
            markers = [];
         }
         let part = new Part(ts[i].name, markers);
         part.lectName = basename(lectFileName, 'txt');
         let line = text!.slice(ts[i].start, ts[i + 1].index).trim();
         part.body = line;
         this.parts.push(part);
      }

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


   private fillConcepts() {
      this.concepts = [];

      for (let part of this.parts) {
         for (let marker of part.markers) {
            let idx = this.concepts.map(c => c.marker).indexOf(marker);
            if (idx == -1) {
               this.concepts.push(new Concept(marker, part));
            } else {
               this.concepts[idx].homeParts.push(part);
            }
         }
      }
   }

   // Find all dependencies
   //
   private findDeps()
   {
      for (let part of this.parts) {
         for (let concept of this.concepts) {
            if (concept.regexp.test(part.body)) {
               let homePart = concept.homeParts[0];
               // залежність: part -> homePart
               let distance = homePart.ordNo - part.ordNo;
               if (distance) {
                  part.deps.push({ partId: homePart.id, distance, marker: concept.marker });
               }
            }
         }
      }

   }

   // Resume of a lecture course
   //
   public get resume() : Resume
   {
      let sum: Resume = { count: 0, posDistance: 0, negDistance: 0, bodyLength: 0 };
      for (const part of this.parts) {
         sum.bodyLength += part.body.length;
         sum.count++;
         for (let dep of part.deps) {
            if (dep.distance > 0) {
               sum.posDistance += dep.distance;
            } else {
               sum.negDistance += -dep.distance;
            }
         }
      }
      return sum;
   } 
}

