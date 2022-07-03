/**
 * Створити Parts з файлу markers.txt
 * [Додати падіжні форми маркерів]
 * Заповнити поле body з файлів лекцій
 * Заповнити поле deps завдяки аналізу
 */



import { Part, Parts } from './src/Parts.js';


const parts = new Parts();
parts.bodyFromAllLects()
console.log(parts);


