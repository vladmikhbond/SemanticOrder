
export type Dep = {
   partId: string,
   distance: number,
   marker: string
};

// Частина лекційного курсу
//
export class Part {
   id: string;
   markers: string[];
   body: string;
   deps: Dep[] = [];
   lectName: string;
   ordNo: number;

   get sumOfInversions(): number {
      let sum = 0;
      this.deps.filter(d => d.distance > 0)
          .forEach(d => sum += d.distance);
      return sum;
   }

   constructor(id: string, markers: string[])
   {
      this.id = id;
      this.markers = markers;
   }
}

