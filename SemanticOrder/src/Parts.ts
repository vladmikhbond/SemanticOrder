import { basename } from 'path'
import { bufferFile, bufferDir } from "./utils.js";
import { Part} from "./Part.js";
import { Concept } from "./Concept.js";
import { EOL } from "os";

const PART_SEPAR: RegExp = /^@2\s*(.+)\n@@\s*(.+)/gm;   // (\r)\n

const EMPTY_MARKERS = '-';

export { Part, Parts }

interface Temp {
   index: number,
   name: string,
   markersLine: string,
   start: number
};

interface Resume {
   count: number,
   posCount: number,
   posDistance: number,
   negCount: number,
   negDistance: number,
   bodyLength: number
};

class Parts
{
   parts: Part[];
   concepts: Concept[];
   lectDir: string;
   

   // Load markers from 'markers.txt'
   //
   constructor(lectDir: string)
   {
      this.lectDir = lectDir;
      this.partsFromAllLects();
      this.fillConcepts();
      this.findDeps();
   }

   createPrologPart(): Part[]
   {
      let fname = this.lectDir + "_prolog.txt";

      let text: string | null = bufferFile(fname);
      // no prolog file
      if (!text)
         return [];

      let markers = text!.split(EOL);
      markers = markers
         .map(m => m.trim().slice(0, -1))
         .filter(m => m != '');

      let part = new Part("Prolog", markers);
      part.lectName = "_prolog";
      part.ordNo = 0;
      return [part];
   }

   // Get part bodies from a lecture dir
   //
   private partsFromAllLects()
   {
      this.parts = this.createPrologPart();
      
      const fileNames = bufferDir(this.lectDir)?.sort();
      // bodies
      fileNames?.forEach(fname => this.partsFromOneLect(this.lectDir + fname));
      // ordNos
      this.parts.forEach((p, i) => p.ordNo = i)
   }


   // Get part bodiy from a lecture file.
   // Example of a header:
   //    @2 Версії JS 
   //    @@ ECMAScript|ES2015|ES6|ES
   //
   private partsFromOneLect(lectFileName: string) {
      let text: string | null = bufferFile(lectFileName);

      // 1-st run
      let ts: Temp[] = this.doTemps(text!);

      // 2-nd run: fill a part body
      for (let i = 0; i < ts.length - 1; i++) {
         let markers = ts[i].markersLine.split('|').filter(m => m.length > 0);
         if (ts[i].markersLine === EMPTY_MARKERS) {
            markers = [];
         }
         let part = new Part(ts[i].name, markers);
         part.lectName = basename(lectFileName, 'txt');
         let line = text!.slice(ts[i].start, ts[i + 1].index).trim();

         // cut off ignored part
         let match = (/^@2/gm).exec(line);
         if (match) {
            line = line.slice(0, match.index);
         }

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
               markersLine: match[2],
               start: match.index + match[0].length
            });
         } else {
            ts.push({
               index: text?.length!,
               name: "",
               markersLine: "",
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
                  concept.addDependantPart(part);
               }
            }
         }
      }

   }

   // Resume of a lecture course
   //
   public get summary() : Resume
   {
      let sum: Resume = { count: 0, posCount: 0, posDistance: 0, negCount: 0, negDistance: 0, bodyLength: 0 };
      for (const part of this.parts) {
         sum.bodyLength += part.body.length;
         sum.count++;
         for (let dep of part.deps) {
            if (dep.distance > 0) {
               sum.posCount++;
               sum.posDistance += dep.distance;
            } else {
               sum.negCount++;
               sum.negDistance += -dep.distance;
            }
         }
      }
      return sum;
   } 
}

