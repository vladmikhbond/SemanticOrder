import { writeFileSync } from 'fs';
import { EOL } from 'os';
import { Parts, Part } from './Parts.js';
import { color } from "./utils.js";

function conceptsToString(parts: Parts): string
{
   let str = 'Concept\tRegex\tHome\tHomePartLects\tDeps\tDepPartLects\tSumBadDist' + EOL;
   for (const c of parts.concepts) {
      let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');
      let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 4)})`).join('; ');

      str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
         `${c.dependantParts.length}\t${dependLects}\t${c.badDistance}${EOL}`;
   }
   return str;
}

function partsToString(parts: Parts): string {
   let str = 'OrdNo\tPartId\tLectName\tHome\tDeps\tSumBad' + EOL;
   for (const p of parts.parts) {
      str += `${p.ordNo}\t${p.id}\t${p.lectName}\t${p.markers.length}\t${p.deps.length}\t${p.sumOfInversions}${EOL}`;
   }
   return str;
}

function summaryToString(parts: Parts): string {
   let res = parts.summary;
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
   const summary = summaryToString(parts);
   const conceptStr = conceptsToString(parts) + summary;
   writeFileSync(fileConcepts, conceptStr);
   const partStr = partsToString(parts);
   writeFileSync(fileParts, partStr);

   console.log(summary);
}

