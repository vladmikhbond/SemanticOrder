﻿import { writeFileSync } from 'fs';
import { EOL } from 'os';
import { Parts } from './Parts.js';
import { trimArray } from "./utils.js";

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
         if (dep.distance > 0) {
            summary.posCount++;
            summary.posDistance += dep.distance;
         } else {
            summary.negCount++;
            summary.negDistance += -dep.distance;
         }
      }
   }
   return summary;
}

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
   let str = 'OrdNo\tPartId\tLectName\tDefs\tDeps\tCumDefs\tCumDeps\tSumBad' + EOL;
   let cumDefs = 0, cumDeps = 0;
   for (const p of parts.parts) {
      cumDefs += p.conceptDefCount;
      cumDeps += p.partDependantCount;
      str +=
         `${p.ordNo}\t${p.id}\t${p.lectName}\t` +
      `${p.conceptDefCount}\t${p.partDependantCount}\t${cumDefs}\t${cumDeps}\t` +
         `${p.sumOfInversions}${EOL}`;
   }
   return str;
}

function summaryToString(parts: Parts): string {
   let res = conceptSummary(parts);
   let str = `
 Concept number:      ${parts.concepts.length}
 Parts number:        ${res.count}
 Positive count/dist: ${res.posCount}/${res.posDistance}
 Negative count/dist: ${res.negCount}/${res.negDistance}
 Sum body size:       ${res.bodyLength}
`;
   return str;
} 

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

