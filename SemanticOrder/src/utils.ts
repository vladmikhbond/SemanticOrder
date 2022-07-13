
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

export function bufferFile(relPath: string): string | null {
   try {
      return readFileSync(join(__dirname, relPath)).toString();
   } catch (err) {
      console.error(err);
      return null;
   }
}

export function bufferDir(relPath: string): string[] | null {
   try {
      return readdirSync(join(__dirname, relPath));
   } catch (err) {
      console.error(err);
      return null;
   }
}

export const color = {
   white: '\x1b[0m',
   red: '\x1b[31m',
   green: '\x1b[32m',
   yellow: '\x1b[33m',
   blue: '\x1b[34m',
   magenta: '\x1b[35m',
   cian: '\x1b[36m',
}

// Виробляємо регекс 
// Символам *\.'"-{}$^  передує бекслеш.
// Заміни:
//   space ->   \s+
//   +     ->   \w{0,3}
// Якщо маркер - слово, оточуємо його межами слова  \b
export function marker2regex(marker: string): RegExp {
   const META = "+-*\/\\.'\"{}$^()[]";
   const NON_ALPHA = "\\ $.=[_";

   let arr: string[] = [];
   for (let c of marker) {
      if (META.includes(c)) arr.push('\\');
      arr.push(c);
   };
   marker = arr.join('');

   marker = marker
      .replace(/\+/gm, "\\w\{0\,3\}")   // 	    + -> \w{0,3}
      .replace(/\s/gm, "\\s+");         //   space -> \s+

   if (!NON_ALPHA.includes(marker[0]))
      marker = '\\b' + marker + '\\b';

   return new RegExp(marker);
}

// TEST ===============================

//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/


//let ss = bufferDir('../data/lections/');
