
import { Part, Parts } from './src/Parts.js';

const parts = new Parts();
parts.bodyFromAllLects();
parts.findDeps();

//console.log(parts._parts.map(p => [p.markers, p.regexps]));
console.log(parts);
//console.log("---------------------------");

//console.log(parts._parts.map(p => [p.id, p.deps]));

console.log("---------------------------");

for (let p of parts._parts) {
   console.log(p.id);
   for (let d of p.deps) {
      console.log('        ', d.partId, d.regexp, d.len);
   }
}
