import { Parts } from './src/Parts.js';
import { showPartDeps } from "./src/View.js";

const parts = new Parts();

showPartDeps(parts);

console.log('\n', parts.resume);

