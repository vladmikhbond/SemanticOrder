import { Course } from './src/Course.js';
import { toFiles } from "./src/View.js";


const course = new Course('../data/oop/');

toFiles(course, 'excel_concepts.txt', 'excel_parts.txt');
