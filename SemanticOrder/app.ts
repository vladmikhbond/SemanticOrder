import { Parts } from './src/Parts.js';
import { color } from "./src/utils.js";

const parts = new Parts();
parts.bodyFromAllLects();
parts.findDeps();
show(parts);



function show(parts) {
   for (let p of parts._parts) {
      console.log('@2', p.id);
      if (p.deps.length == 0) console.log('        -');
      for (let d of p.deps) {
         let letColor: string = d.len < 0 ? color.red : color.green;
         console.log('        ' + color.white + d.partId + ' ' +
            color.yellow + d.marker + ' ' +
            letColor + d.len + color.white);
      }
   }
}