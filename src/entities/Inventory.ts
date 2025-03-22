// src/entities/Inventory.ts
type Item = {
    name: string;
    type: 'weapon' | 'potion' | 'armor';
    value: number;
  };
  
  export class Inventory {
    items: Item[];
  
    constructor() {
      this.items = [];
    }
  
    addItem(item: Item): void {
      this.items.push(item);
    }
  
    useItem(index: number): Item | null {
      if (index >= 0 && index < this.items.length) {
        return this.items.splice(index, 1)[0];
      }
      return null;
    }
  
    getItems(): Item[] {
      return this.items;
    }
  }