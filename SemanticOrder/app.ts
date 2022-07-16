import { Parts } from './src/Parts.js';
import { show, conceptsToFile } from "./src/View.js";


const parts = new Parts('../data/opr/');

//show(parts, process.argv[2]);
show(parts, 'r');
conceptsToFile(parts, '111.txt');


