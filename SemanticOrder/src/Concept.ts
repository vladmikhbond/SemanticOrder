
import { Part } from "./part.js";


// Поняття і частини, де воно визначається
//
export class Concept {
   marker: string;
   regexp: RegExp;
   homeParts: Part[];
   dependantParts: Part[];

   constructor(marker: string, part: Part) {
      this.marker = marker;
      this.homeParts = [part];
      this.regexp = marker2regex(marker);
      this.dependantParts = [];
   }

}

// Виробляє регекс
//
function marker2regex(marker: string): RegExp {
   const META = "-*/|\\.'\"{}$^()[]";
   const NON_ALPHA = "\\ $.=[_";

   // stage 1 - insert '\' before META symbols
   let markerArray: string[] = [];
   for (let c of marker) {
      if (META.includes(c)) markerArray.push('\\');
      markerArray.push(c);
   };
   marker = markerArray.join('');

   // stage 2 - replacement in marker
   marker = marker
      .replace(/\+/g, "\\w{0,3}")      //        '+' -> '\w{0,3}'
      .replace(/\s/g, "\\s+")          //      space -> '\s+'
      .replace(/ANYCHARS/g, ".+")      // 'ANYCHARS' -> '.+'
      .replace(/PLUS/g, "\\+")         //     'PLUS' -> '\+'
      .replace('VERBAR2', '\\|\\|')    //  'VERBAR2' -> '\|\|'
      .replace('VERBAR', '\\|');       //   'VERBAR' -> '\|'

   // stage 3 - add word bounds
   if (!NON_ALPHA.includes(marker[0]))  
      marker = '\\W' + marker + '\\W'; 

   return new RegExp(marker, "gm");
}


// TEST ===============================

// console.log(marker2regex("111+ 222+").toString());       