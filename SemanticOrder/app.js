"use strict";
/**
 * Створити Parts з файлу markers.txt
 * [Додати падіжні форми маркерів]
 * Заповнити поле body з файлів лекцій
 * Заповнити поле deps завдяки аналізу
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Parts_js_1 = require("./src/Parts.js");
const parts = new Parts_js_1.Parts();
parts.bodyFromAllLects();
console.log(parts);
//# sourceMappingURL=app.js.map