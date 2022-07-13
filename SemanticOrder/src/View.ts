import { Parts, Part } from './Parts.js';
import { Concept } from './Part.js';
import { color } from "./utils.js";

export function showDeps(parts: Parts)
{
   function show(parts: Part[])
   { 
      let lectName = '';
      for (const part of parts) {
         // print lecture name
         if (part.lectName !== lectName) {
            lectName = part.lectName;
            console.log(color.cian + '\n -------' + lectName + ' -------') ;
         }

         // print part id
         let partMarkers = part.markers.join(' | ');
         console.log(color.white + part.ordNo + '.' + part.id + '   ' + color.yellow, partMarkers);


         if (part.deps.length == 0)
            console.log(color.green + '        - no deps');

         // print dependencies
         for (let dep of part.deps) {
            let distanceColor: string = dep.distance > 0 ? color.red : color.green;
            let depOrdNo = dep.distance + part.ordNo;
            console.log(`        ${color.white}${depOrdNo}.${dep.partId} ` +
               color.yellow + dep.marker + ' ' +
               distanceColor + dep.distance + color.white);
         }
      }
   }

   let _parts = parts.parts

   show(_parts);

   const badParts = _parts.filter(p => p.sumOfInversions > 0);
   if (badParts.length == 0) {
      console.log("\nNO BAD PARTS");
   } else {
      console.log("\n---------------- INVERSE DEPENDENCIES ONLY ------------------\n");
      show(badParts);
   }
}


export function showConcepts(parts: Parts)
{
   console.log("--- CONCEPTS ---\n")
   for (const concept of parts.concepts)
   {
      let markerColor = concept.homeParts.length > 1 ? color.white : color.yellow; 

      console.log(markerColor + concept.marker + color.white,
         concept.homeParts.map(p => `${p.ordNo}.${p.id}  in  ${p.lectName.slice(0, 10)}...`));
   }

}

export function showResume(parts: Parts) {
   let res = parts.resume;
   console.log('Concept number', parts.concepts.length);
   console.log('Parts number  ', res.count);
   console.log('Positive dist ', res.posDistance);
   console.log('Negative dist ', res.negDistance);
   console.log('Sum body size ', res.bodyLength);
   console.log();

}