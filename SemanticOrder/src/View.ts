import { writeFileSync } from 'fs';
import { EOL } from 'os';
import { Course } from './Parts.js';
import { trimArray } from "./utils.js";


// ------------------------------------ ConceptSummary -------------------------------

interface ConceptSummary {
   posCount: number,
   posDistance: number,
   negCount: number,
   negDistance: number,
   bodyLength: number
};


// Резюме курса 
//
function couseSummary(course: Course): ConceptSummary
{ 
   let summary: ConceptSummary =
      { posCount: 0, posDistance: 0, negCount: 0, negDistance: 0, bodyLength: 0 };

   for (const part of course.parts) {
      summary.bodyLength += part.body.length;
      for (let dep of part.deps) {
         let distance = dep.ordNo - part.ordNo;
         if (distance > 0) {
            summary.posCount++;
            summary.posDistance += distance;
         } else {
            summary.negCount++;
            summary.negDistance += -distance;
         }
      }
   }
   return summary;
}


function summaryToString(course: Course): string {
   let sum = couseSummary(course);
   // Концепты пролога не считаются
   let [concepts, part] = course.parts[0].id === "Prolog" ? [course.parts[0].conceptDefCount, 1] : [0, 0];
   let conceptNum = course.concepts.length - concepts;
   let partsNum = course.parts.length - part;

   let str = ` ----- ${course.lectDir} ------
 Concept number:      ${conceptNum}
 Parts number:        ${partsNum}
 Concepts / Parts:    ${conceptNum / partsNum}
 Positive count/dist: ${sum.posCount}/${sum.posDistance}
 Negative count/dist: ${sum.negCount}/${sum.negDistance}
 Sum body size:       ${sum.bodyLength}
`;
   str += EOL + inversions(course);
   return str;
}

function inversions(course: Course): string {
   let str = '';
   for (const c of course.concepts) {
      if (c.badDistance) {
         str += `${align(c.marker, 20)} :  ${align(c.homeParts[0].face, 40)} <--- ${align(c.dependantParts[0].face, 40)}${EOL}`;
      }
   }
   return str;

   function align(s, n) {
      return (s + "                                       ").slice(0, n);
   }
}



// ------------------------------ Gistorgrams ----------------------------------------

//// Гистограмма востребованности концептов
//// по гор - востребованность (в скольких частях использован), по вер - количество коцептов
////
//function conceptUsingGist(parts: Parts): Number[] {
//   let counters: number[] = new Array(50).fill(0);
//   for (const c of parts.concepts) {
//      counters[c.usingCount] += 1;
//   }
//   return trimArray(counters);
//}

//// Гистограмма зависимости частей
//// по гор - зависимость (от скольких частей зависима часть), по вер - количество частей
////
//function partDependGist(parts: Parts): Number[] {
//   let counters: number[] = new Array(50).fill(0);
//   for (const p of parts.parts) {
//      counters[p.partDependantCount] += 1;
//   }
//   return trimArray(counters);
//}

//// Гистограмма плодовитости частей
//// по гор - количество концептов, порожденных частью, по вер - количество частей
////
//function partDefGist(parts: Parts): Number[] {
//   let counters: number[] = new Array(50).fill(0);
//   for (const p of parts.parts) {
//      counters[p.conceptDefCount] += 1;
//   }
//   return trimArray(counters);
//}


//Array.prototype.toString = function (): string {
//   return this.join("\n");
//}

// -------------------------------------- Excell -------------------------------

function conceptsToString(parts: Course): string
{
   let str = 'Concept\tRegex\tDefed\tDefedInParts\tUsed\tUsedInParts\tdistance1\tSumBadDist' + EOL;
   for (const c of parts.concepts) {
      let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
      let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
      let dist_1 = c.dependantParts[0] ? c.dependantParts[0].ordNo - c.homeParts[0].ordNo : 0;
      let badDistance: String = c.badDistance ? c.badDistance.toString() : " ";

      str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
         `${c.dependantParts.length}\t${dependLects}\t${dist_1}\t${badDistance}${EOL}`;
   }
   return str;
}

function partsToString(parts: Course): string {
   let str = 'OrdNo\tPartId\tLectName\tDefed\tUsed' + EOL;
   for (const p of parts.parts) {
      str +=
         `${p.ordNo}\t${p.id}\t${p.lectName}\t` +
         `${p.conceptDefCount}\t${p.partDependantCount}\t${EOL}`;
   }
   return str;
}

// -----------------------------------------------------------------------------------

export function toFiles(parts: Course, fileConcepts, fileParts): void {

   const conceptStr = conceptsToString(parts);

   const partStr = partsToString(parts);
      
   writeFileSync(fileConcepts, conceptStr);
   writeFileSync(fileParts, partStr);

   const summaryStr = summaryToString(parts);
   console.log(summaryStr);
}

