import { Parts } from './src/Parts.js';
import { toFiles } from "./src/View.js";


const parts = new Parts('../data/opr/');

toFiles(parts, 'excel_concepts.txt', 'excel_parts.txt');

console.log(parts.conceptUsingGist);
console.log(parts.partDependGist);
