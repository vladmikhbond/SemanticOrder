import { Parts } from './src/Parts.js';
import { show } from "./src/View.js";

const parts = new Parts();

show(parts, process.argv[2]);


