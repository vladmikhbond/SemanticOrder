
// Частина лекційного курсу
//
export class Part {
   id: string;
   markers: string[]; 
   body: string = '';
   deps: Part[] = [];
   lectName: string;
   ordNo: number;

   constructor(id: string, markers: string[])
   {
      this.id = id;
      this.markers = markers;
   }

   get conceptDefCount(): number {
      return this.markers.length;
   }

   get partDependantCount(): number {
      return this.deps.length;
   }

   get face(): string {
      return `${this.lectName} (${this.ordNo}.${this.id})`;
   }
}

