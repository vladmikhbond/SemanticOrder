﻿import { Parts } from './src/Parts.js';
import { toFiles } from "./src/View.js";


const parts = new Parts('../data/js/');

toFiles(parts, 'excel_concepts.txt', 'excel_parts.txt');


