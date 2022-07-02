
import bufferFile from "./utils.js";
var os = require('os');

const markersFile = '../data/markers.txt';



export { Part, Parts }

class Part {
   id: string;
   markrers: string[];
   body: string;
   deps: Part[];
   _lectName: string;  

   constructor(id, markers)
   {
      this.id = id;
      this.markrers = markers;
   }
}

type Temps = { index: number, name: string, start: number }[];

class Parts {
  
   _parts: Part[];


   // Load markers from 'markers.txt'
   //
   constructor()
   {
      let text: string | null = bufferFile(markersFile);
      const regex: RegExp = /^---(.*)/gm;

      // 1-st run: make temporary objects  
      let ts: Temps = this.doTemps(text!, regex);
      
      // 2-nd run: create parts with markers only
      this._parts = [];
      for (let i = 0; i < ts.length - 1; i++) {
          let line = text!.slice(ts[i].start, ts[i + 1].index).trim();
          let markers = line.split(os.EOL);
          this._parts.push(new Part(ts[i].name, markers));
      }
   }

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

      // 1-st run: make temporary objects  
      let ts: Temps = this.doTemps(text!, regex);
      for (let i = 0; i < ts.length - 1; i++) {
         let part = this._parts.find(p => p.id == ts[i].name);
         if (part) {
            let line = text!.slice(ts[i].start, ts[i + 1].index).trim();
            part.body = line;
         }
      }

   }
}