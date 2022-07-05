
export type Dep = { partId: string, len: number, marker: string };

// Частина лекц курсу
//
export class Part {
   id: string;
   markers: string[];
   regexps: RegExp[];
   body: string;
   deps: Dep[] = [];
   _lectName: string;  

   constructor(id: string, markers: string[])
   {
      this.id = id;
      this.markers = markers;
      this.regexps = markers.map(m => marker2regex(m));
   }
}

// Виробляємо регекс 
// Символам *\.'"-{}$^  передує бекслеш.
// Заміни:
//   space ->   \s+
//   +     ->   \w{0,3}
//
function marker2regex(marker: string): RegExp {
   const META = "*\\.'\"-{}$^()";
   let arr: string[] = [];
   for (let c of marker) {
      if (META.includes(c)) arr.push('\\');
      arr.push(c);
   };
   marker = arr.join('');

   marker = marker
      .replace(/\+/gm, "\\w\{0\,3\}")   // 	    + -> \w{0,3}
      .replace(/\s/gm, "\\s+");         //   space -> \s+      

   return new RegExp(marker);
}

// TEST ===============================

//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/
