import { Parts } from './src/Parts.js';
import { showDeps, showConcepts } from "./src/View.js";

const parts = new Parts();

showConcepts(parts.concepts);
showDeps(parts.parts);

console.log('\n\nRESUME: ', parts.resume);

