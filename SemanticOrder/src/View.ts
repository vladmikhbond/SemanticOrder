import { writeFileSync } from 'fs';
import { EOL } from 'os';
import { Parts, Part } from './Parts.js';
import { color } from "./utils.js";

export function conceptsToFile(parts: Parts, fname: string) {
   let str = 'concept\tregex\thome\thome-lect\tdep~dep-lect\tbadDist' + EOL;
   for (const c of parts.concepts) {
      let partLects = c.homeParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 15)})`).join(', ');
      let dependLects = c.dependantParts.map(p => `${p.ordNo}.${p.id} (${p.lectName.slice(0, 15)})`).join(', ');
      str += `${c.marker}\t${c.regexp}\t${c.homeParts.length}\t${partLects}\t` +
         `${c.dependantParts.length}\t${dependLects}\t${c.badDistance}${EOL}`;
   }
   str += summaryToString(parts);

   writeFileSync(fname, str);
}

function summaryToString(parts: Parts) {
   let res = parts.summary;
   let str = `
Concept number ${parts.concepts.length}
Parts number ${res.count}
Positive dist ${res.posDistance}
Negative dist ${res.negDistance}
Sum body size ${res.bodyLength}
`;
   return str;
}



///**
// * 
// * b - bad deps
// * d - deps
// * s - summary
// */
//function show(parts: Parts, params = 'cr'): void
//{
//   if (params.includes('d')) {
//      console.log('\nDEPENDENCIES:\n');
//      showDeps(parts);
//   }
//   if (params.includes('b')) {
//      console.log('\nBAD DEPS:\n');
//      showBadDeps(parts);
//   }
//   if (params.includes('r')) {
//      console.log('\nSUMMARY:\n');
//      showSummary(parts);
//   }
//}


//function showDeps(parts: Parts) {
//   partsWithDeps(parts.parts);
//}


//function showBadDeps(parts: Parts)
//{
//   const badParts = parts.parts.filter(p => p.sumOfInversions > 0);
//   if (badParts.length == 0) {
//      console.log("\nNo bad deps.");
//   } else {
//      partsWithDeps(badParts);
//   }
//}

//function partsWithDeps(parts: Part[]) {
//   let lectName = '';
//   for (const part of parts) {
//      // print lecture name
//      if (part.lectName !== lectName) {
//         lectName = part.lectName;
//         console.log(color.cian + '\n -------' + lectName + ' -------');
//      }

//      // print part id
//      let partMarkers = part.markers.join(' | ');
//      console.log(color.white + part.ordNo + '.' + part.id + '   ' + color.yellow, partMarkers);


//      if (part.deps.length == 0)
//         console.log(color.green + '        - no deps');

//      // print dependencies
//      for (let dep of part.deps) {
//         let distanceColor: string = dep.distance > 0 ? color.red : color.green;
//         let depOrdNo = dep.distance + part.ordNo;
//         console.log(`        ${color.white}${depOrdNo}.${dep.partId} ` +
//            color.yellow + dep.marker + ' ' +
//            distanceColor + dep.distance + color.white);
//      }
//   }
//}

//function showSummary(parts: Parts) {
//   let res = parts.summary;
//   console.log('Concept number', parts.concepts.length);
//   console.log('Parts number  ', res.count);
//   console.log('Positive dist ', res.posDistance);
//   console.log('Negative dist ', res.negDistance);
//   console.log('Sum body size ', res.bodyLength);
//   console.log();
//}