import { Monster } from './Monster';

export enum LocationType {
  Town = 'Town',
  Field = 'Field',
  Dungeon = 'Dungeon',
}

export class Location {
  name: string;
  type: LocationType;
  description: string;
  monsters: Monster[]; // Монстры в локации

  constructor(name: string, type: LocationType, description: string, monsters: Monster[] = []) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.monsters = monsters;
  }

  // Метод для добавления монстра
  addMonster(monster: Monster): void {
    this.monsters.push(monster);
  }

  // Метод для получения списка монстров
  getMonsters(): Monster[] {
    return this.monsters;
  }
}