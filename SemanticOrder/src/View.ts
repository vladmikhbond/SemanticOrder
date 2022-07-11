import { Part } from './Parts.js';
import { Concept } from './Part.js';
import { color } from "./utils.js";

export function showDeps(parts: Part[])
{
   function show(parts: Part[])
   { 
      let lectName = '';
      for (const part of parts) {
         // print lecture name
         if (part.lectName !== lectName) {
            lectName = part.lectName;
            console.log(color.cian + '\nЛекція: ' + lectName);
         }

         let sumInvers = part.sumOfInversions ? `  (${part.sumOfInversions})` : '';
         // print part id
         console.log(color.white + part.ordNo + '.' + part.id + '  ' + color.red + sumInvers);
         console.log(color.yellow, part.markers.join(' | '));

         if (part.deps.length == 0)
            console.log(color.green + '        - no deps');

         // print dependencies
         for (let dep of part.deps) {
            let distanceColor: string = dep.distance > 0 ? color.red : color.green;         
            console.log('        ' +
               color.white + dep.partId + ' ' +
               color.yellow + dep.marker + ' ' +
               distanceColor + dep.distance + color.white);
         }
      }
   }



   console.log("\n---------------------- DEPENDENCIES ------------------------\n")
   show(parts);

   const badParts = parts.filter(p => p.sumOfInversions > 0);
   if (badParts.length == 0) {
      console.log("\nNO BAD PARTS");
   } else {
      console.log("\n---------------- INVERSE DEPENDENCIES ONLY ------------------\n");
      show(badParts);
   }
   

}




export function showConcepts(concepts: Concept[])
{
   console.log("---------------------- CONCEPTS ------------------------\n")
   for (const concept of concepts) {
      const markerColor = concept.homeParts.length > 1 ? color.red : color.yellow; 
      console.log(markerColor + concept.marker + color.white,
         concept.homeParts.map(p => `${p.ordNo}.${p.id}  in  ${p.lectName.slice(0, 10)}...`));
   }

}