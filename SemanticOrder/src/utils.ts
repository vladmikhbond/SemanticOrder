
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


// TEST ===============================

//let ss = bufferDir('../data/lections/');
