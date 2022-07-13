import { Parts } from './src/Parts.js';
import { showDeps, showConcepts, showResume } from "./src/View.js";

const parts = new Parts();


let params = process.argv[2];
if (!params) params = 'dr';

if (params.includes('c')) {
   console.log('CONCEPTS:\n');
   showConcepts(parts);
}

if (params.includes('d')) {
   console.log('\nDEPENDENCIES:\n');
   showDeps(parts);
}

if (params.includes('r')) {
   console.log('\nRESUME:\n');
   showResume(parts);
}

