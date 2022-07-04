
export default class Part {
   id: string;
   regexps: RegExp[];
   body: string;
   deps: Part[] = [];
   _lectName: string;  

   constructor(id: string, markers: string[])
   {
      this.id = id;
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
   const META = "*\\.'\"-{}$^";
   let arr: string[] = [];
   for (let c of marker) {
      if (META.includes(c)) arr.push('\\');
      arr.push(c);
   };
   marker = arr.join('');

   marker = marker
      .replace(/\s/gm, "\\s")
      .replace(/\+/gm, "\\w\{0\,3\}");

   let regexp = new RegExp(marker);
   return regexp;
}

// TEST ===============================

//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/
