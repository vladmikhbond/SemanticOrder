import { Part, Parts } from './src/Parts.js';
import { color } from "./src/utils.js";

const parts = new Parts();

showPartDeps(parts);

console.log('\n', parts.resume);

function showPartDeps(parts: Parts)
{
   let i = 1;
   for (const part of parts._parts)
   {
      let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
      // показ назви частини
      console.log(color.white + (i++) + '. ' + part.id + '  ' +
         '  [' + part.lectName + '] ' +
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