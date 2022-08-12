import { Parts } from './src/Parts.js';
import { toFiles } from "./src/View.js";


const parts = new Parts('../data/oop1/');

toFiles(parts, 'excel_concepts.txt', 'excel_parts.txt');
