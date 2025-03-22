// src/entities/Weapon.ts
import { Item } from './Item';

export class Weapon extends Item {
  attackBonus: number;

  constructor(name: string, description: string, attackBonus: number) {
    super(name, description);
    this.attackBonus = attackBonus;
  }
}