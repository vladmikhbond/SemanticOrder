import { Parts } from './Parts.js';
import { Concept } from './Part.js';
import { color } from "./utils.js";

export function showDeps(parts: Parts)
{
   console.log("---------------------- DEPENDENCIES ------------------------\n")
   for (const part of parts.parts) {
      let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
      // показ назви частини
      console.log(color.white + part.ordNo + '. ' + part.id + '  ' +
         '  in ' + part.lectName + '\n' +
         color.yellow + part.markers + '  ' +
         color.red + inversIndex);

      if (part.deps.length == 0)
         console.log(color.green + '        - no deps');
      for (let dep of part.deps) {
         let distanceColor: string = dep.distance > 0 ? color.red : color.green;
         // показ залежності 
         console.log('        ' +
            color.white + dep.partId + ' ' +
            color.yellow + dep.marker + ' ' +
            distanceColor + dep.distance + color.white);
      }
   }
}

export function showConcepts(concepts: Concept[])
{
   console.log("---------------------- CONCEPTS ------------------------\n")
   for (const concept of concepts) {
      const markerColor = concept.homeParts.length > 1 ? color.red : color.yellow; 
      console.log(markerColor + concept.marker + color.white,
         concept.homeParts.map(p => `${p.ordNo}.${p.id}  in  ${p.lectName.slice(0, 10)}...`));
   }

}