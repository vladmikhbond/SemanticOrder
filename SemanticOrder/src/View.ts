import { Parts } from './Parts.js';
import { color } from "./utils.js";

export function showPartDeps(parts: Parts)
{
   for (const part of parts.parts) {
      let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
      // показ назви частини
      console.log(color.white + part.ordNo + '. ' + part.id + '  ' +
         '  in lect ' + part.lectName + '\n' +
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

