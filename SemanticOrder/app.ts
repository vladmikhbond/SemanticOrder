import { Parts } from './src/Parts.js';
import { showDeps, showConcepts } from "./src/View.js";

const parts = new Parts();

showConcepts(parts.concepts);
showDeps(parts);
console.log('\n', parts.resume);

