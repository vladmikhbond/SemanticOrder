
import { Part, Parts } from './src/Parts.js';

const parts = new Parts();
parts.bodyFromAllLects();
parts.findDeps();

//console.log(parts._parts.map(p => [p.markers, p.regexps]));
console.log(parts);
console.log("---------------------------");

console.log(parts._parts.map(p => [p.id, p.deps.map(d => d.id)]));


