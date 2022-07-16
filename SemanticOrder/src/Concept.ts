﻿
import { Part } from "./part.js";


// Поняття і частини, де воно визначається
//
export class Concept {
   marker: string;
   regexp: RegExp;
   homeParts: Part[];
   dependantParts: Part[];
   badDistance: number;

   constructor(marker: string, homePart: Part) {
      this.marker = marker;
      this.homeParts = [homePart];
      this.regexp = Concept.marker2regex(marker);
      // fill later
      this.dependantParts = [];
      this.badDistance = 0;
   }

   addDependantPart(part: Part) {
      this.dependantParts.push(part);
      let dist = part.ordNo - this.homeParts[0].ordNo;
      if (dist < 0) {
         this.badDistance -= dist;
      }
   }

   // Виробляє регекс
   //
   static marker2regex(marker: string): RegExp {
      const META = "-*/|\\.'\"{}$^()[]";
      const NON_ALPHA = "\\ $.=[_";
      const SMALL = "цукенгшщзхїфівапролджєячсмитбю";

      // stage 1 - insert '\' before META symbols
      let markerArray: string[] = [];
      for (let c of marker) {
         if (META.includes(c)) markerArray.push('\\');
         markerArray.push(c);
      };
      let marker1 = markerArray.join('');

      // stage 2 - replacement in marker
      let marker2 = marker1
         .replace(/\+/g, "\\w{0,3}")      //        '+' -> '\w{0,3}'
         .replace(/\s/g, "\\s+")          //      space -> '\s+'
         .replace(/ANYCHARS/g, ".+")      // 'ANYCHARS' -> '.+'
         .replace(/PLUS/g, "\\+")         //     'PLUS' -> '\+'
         .replace('VERBAR2', '\\|\\|')    //  'VERBAR2' -> '\|\|'
         .replace('VERBAR', '\\|');       //   'VERBAR' -> '\|'

      // stage 3 - add word bounds
      const c0 = marker[0];
      let marker3 = NON_ALPHA.includes(c0) ? marker2 : `\\W${marker2}\\W`;

      if (SMALL.includes(c0)) {
         let cC = '[' + c0 + '|' + c0.toUpperCase() + ']';
         marker3 = marker3.replace(c0, cC);
      }

      return new RegExp(marker3, "gm");
   }

}



// TEST ===============================

// console.log(Concept.marker2regex("111+ 222+").toString());       // /\W111\w{0,3}\s+222\w{0,3}\W/gm