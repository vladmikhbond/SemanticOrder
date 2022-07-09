
export type Dep = {
   partId: string,
   distance: number,
   marker: string
};

// Частина лекц курсу
//
export class Part {
   id: string;
   markers: string[];
   regexps: RegExp[];
   body: string;
   deps: Dep[] = [];
   lectName: string; 

   get depsInversIndex(): number {
      let sum = 0;
      this.deps.filter(d => d.distance > 0)
          .forEach(d => sum += d.distance);
      return sum;
   }

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
// Якщо маркер - слово, оточуємо його межами слова  \b
function marker2regex(marker: string): RegExp
{
   const META = "*\\.'\"-{}$^()[]";
   const NON_ALPHA = "\\ $.=[_";

   let arr: string[] = [];
   for (let c of marker) {
      if (META.includes(c)) arr.push('\\');
      arr.push(c);
   };
   marker = arr.join('');

   marker = marker
      .replace(/\+/gm, "\\w\{0\,3\}")   // 	    + -> \w{0,3}
      .replace(/\s/gm, "\\s+");         //   space -> \s+

   if (!NON_ALPHA.includes(marker[0]))
      marker = '\\b' + marker + '\\b';

   return new RegExp(marker);
}

// TEST ===============================

//console.log(marker2regex("111\\111"));         //  /111\\111/
//console.log(marker2regex("111*111'111-111"));  //  /111\*111\'111\-111/
//console.log(marker2regex("111+ 222+"));        //  /111\*111\'111\-111/
