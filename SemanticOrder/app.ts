import { Part, Parts } from './src/Parts.js';
import { color } from "./src/utils.js";

const parts = new Parts();

showPartDeps(parts);


function showPartDeps(parts: Parts)
{
   for (const part of parts._parts)
   {
      // назва частини
      console.log(color.white + '@2 ' + part.id + '  ' + color.magenta + part.lectName);

      if (part.deps.length == 0)
         console.log('        -');

      for (let d of part.deps) {
         let letColor: string = d.len < 0 ? color.red : color.green;
         // залежності частини
         console.log('        ' +
            color.white + d.partId + ' ' +
            color.yellow + d.marker + ' ' +
            letColor + d.len + color.white);
      }
   }
}