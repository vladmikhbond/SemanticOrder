import { Parts } from './src/Parts.js';
import { conceptsToFile } from "./src/View.js";


const parts = new Parts('../data/opr/');

conceptsToFile(parts, 'concepts.txt');


