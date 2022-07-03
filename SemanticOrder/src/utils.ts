
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

// Виробляємо регекс 
// Символам *\.'"-{}$^  передує бекслеш.
// Заміни:
//   space ->   \s+
//   +     ->   \w{0,3}
//

export function marker2regex(marker: string): RegExp {
   const META = "*\\.'\"-{}$^";
   let arr : string[] = [];
   for (let c of marker) {
      if (META.includes(c)) arr.push('\\'); 
      arr.push(c);
   };
   marker = arr.join('');

   marker = marker
      .replace(/\s/gm, "\\s")
      .replace(/\+/gm, "\\w\{0\,3\}");

   let regexp = new RegExp(marker);
   return regexp;
}

// TEST ===============================

//let ss = bufferDir('../data/lections/');

console.log(marker2regex("111\\111"));         //  /111\\111/
console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
console.log(marker2regex("111+ 222+"));  //  /111\*111\'111\-111/
