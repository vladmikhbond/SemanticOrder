import { writeFileSync } from 'fs';
import { EOL } from 'os';
import { Parts } from './Parts.js';
import { trimArray } from "./utils.js";


// ------------------------------------ ConceptSummary -------------------------------

interface ConceptSummary {
   count: number,
   posCount: number,
   posDistance: number,
   negCount: number,
   negDistance: number,
   bodyLength: number
};


// Резюме курса (концепты)
//
function conceptSummary(parts: Parts): ConceptSummary
{ 
   let summary: ConceptSummary =
      { count: 0, posCount: 0, posDistance: 0, negCount: 0, negDistance: 0, bodyLength: 0 };

   for (const part of parts.parts) {
      summary.bodyLength += part.body.length;
      summary.count++;
      for (let dep of part.deps) {
         let distance = part.ordNo - dep.ordNo;
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

function summaryToString(parts: Parts): string {
   let sum = conceptSummary(parts);
   let str = ` ----- ${parts.lectDir} ------
 Concept number:      ${parts.concepts.length}
 Parts number:        ${sum.count}
 Positive count/dist: ${sum.posCount}/${sum.posDistance}
 Negative count/dist: ${sum.negCount}/${sum.negDistance}
 Sum body size:       ${sum.bodyLength}
`;
   return str;
}

// ------------------------------ Gistorgrams ---------------------------------------- 

// Гистограмма востребованности концептов 
// по гор - востребованность (в скольких частях использован), по вер - количество коцептов
//
function conceptUsingGist(parts: Parts): Number[] {
   let counters: number[] = new Array(50).fill(0);
   for (const c of parts.concepts) {
      counters[c.usingCount] += 1;
   }
   return trimArray(counters);
}

// Гистограмма зависимости частей
// по гор - зависимость (от скольких частей зависима часть), по вер - количество частей
//
function partDependGist(parts: Parts): Number[] {
   let counters: number[] = new Array(50).fill(0);
   for (const p of parts.parts) {
      counters[p.partDependantCount] += 1;
   }
   return trimArray(counters);
}

// Гистограмма плодовитости частей
// по гор - количество концептов, порожденных частью, по вер - количество частей
//
function partDefGist(parts: Parts): Number[] {
   let counters: number[] = new Array(50).fill(0);
   for (const p of parts.parts) {
      counters[p.conceptDefCount] += 1;
   }
   return trimArray(counters);
}


Array.prototype.toString = function (): string {
   return this.join("\n");   
}

// --------------------------------------

function conceptsToString(parts: Parts): string
{
   let str = 'Concept\tRegex\tHome\tHomePartLects\tDeps\tDepPartLects\tSumBadDist' + EOL;
   for (const c of parts.concepts) {
      let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
      let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
      let badDistance: String = c.badDistance ? c.badDistance.toString() : " ";

      str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
         `${c.dependantParts.length}\t${dependLects}\t${badDistance}${EOL}`;
   }
   return str;
}

function partsToString(parts: Parts): string {
   let str = 'OrdNo\tPartId\tLectName\tDefs\tDeps\tCumDefs\tCumDeps' + EOL;
   let cumDefs = 0, cumDeps = 0;
   for (const p of parts.parts) {
      cumDefs += p.conceptDefCount;
      cumDeps += p.partDependantCount;
      str +=
         `${p.ordNo}\t${p.id}\t${p.lectName}\t` +
         `${p.conceptDefCount}\t${p.partDependantCount}\t${cumDefs}\t${cumDeps}\t${EOL}`;
   }
   return str;
}

// -----------------------------------------------------------------------------------

export function toFiles(parts: Parts, fileConcepts, fileParts): void {

   const conceptStr = conceptsToString(parts) +
      EOL + conceptUsingGist.name + EOL + 
      conceptUsingGist(parts).toString();

   const partStr = partsToString(parts) +
      EOL + partsToString.name + EOL + 
      partDependGist(parts).toString() +
      EOL + partDefGist.name + EOL + 
      partDefGist(parts).toString();

   writeFileSync(fileConcepts, conceptStr);
   writeFileSync(fileParts, partStr);

   const summaryStr = summaryToString(parts);
   console.log(summaryStr);
}

