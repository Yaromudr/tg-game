import { Item } from './Item';

export class Armor extends Item {
  healthBonus: number;
  defenseBonus: number;

  constructor(name: string, description: string, healthBonus: number, defenseBonus: number) {
    super(name, description);
    this.healthBonus = healthBonus;
    this.defenseBonus = defenseBonus;
  }
}