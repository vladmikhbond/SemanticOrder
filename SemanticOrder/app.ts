import { Parts } from './src/Parts.js';
import { showDeps, showConcepts, showResume } from "./src/View.js";

const parts = new Parts();

showConcepts(parts);
console.log("\n---------------------- DEPENDENCIES ------------------------\n")
showDeps(parts);
console.log("\n---------------------- RESUME ------------------------\n")
showResume(parts);

