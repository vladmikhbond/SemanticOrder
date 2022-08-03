
import { readFileSync, readdirSync, writeFileSync  } from 'fs'
import { join } from 'path'

export function bufferFile(relPath: string): string | null {
   try {
      return readFileSync(join(__dirname, relPath)).toString();
   } catch (err) {
      console.error("No file " + relPath);
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

export function trimArray(arr: number[]): number[] {
   let i = arr.length - 1;
   while (arr[i] == 0) i--;
   arr.length = i + 1;
   return arr;
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

