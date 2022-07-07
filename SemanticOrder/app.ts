import { Part, Parts } from './src/Parts.js';
import { color } from "./src/utils.js";

const parts = new Parts();

showPartDeps(parts);


function showPartDeps(parts: Parts)
{
   let i = 1;
   for (const part of parts._parts)
   {
      let inversIndex = part.depsInversIndex ? part.depsInversIndex.toString() : '';
      // назва частини
      console.log(color.white + (i++) + '. ' + part.id + '  '
         + color.magenta + part.lectName
         + color.red + inversIndex);

      if (part.deps.length == 0)
         console.log(color.green + '        - no deps');

      for (let d of part.deps) {
         let distanceColor: string = d.distance > 0 ? color.red : color.green;
         // залежності частини
         console.log('        ' +
            color.white + d.partId + ' ' +
            color.yellow + d.marker + ' ' +
            distanceColor + d.distance + color.white);
      }
   }
}