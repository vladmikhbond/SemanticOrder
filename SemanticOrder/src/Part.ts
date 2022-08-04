﻿
export type Dep = {
   part: Part,
   distance: number,
   marker: string
};

// Частина лекційного курсу
//
export class Part {
   id: string;
   markers: string[]; 
   body: string = '';
   deps: Dep[] = [];
   lectName: string;
   ordNo: number;

   constructor(id: string, markers: string[])
   {
      this.id = id;
      this.markers = markers;
   }

   get sumOfInversions(): number {
      let sum = 0;
      this.deps.filter(d => d.distance > 0)
          .forEach(d => sum += d.distance);
      return sum;
   }

   get conceptDefCount(): number {
      return this.markers.length;
   }

   get partDependantCount(): number {
      return this.deps.length;
   }
}

