// src/entities/Monster.ts
import { Item } from "./items/Item";

export class Monster {
  name: string;
  maxHealth: number; // Максимальное здоровье
  health: number;
  attack: number;
  defense: number;
  reward: { min: number; max: number };
  loot: Item[];

  constructor(
    name: string,
    health: number,
    attack: number,
    defense: number,
    reward: { min: number; max: number },
    loot: Item[] = []
  ) {
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.reward = reward;
    this.loot = loot;
  }

  takeDamage(damage: number): void {
    this.health -= damage;
    if (this.health < 0) this.health = 0;
  }

  isAlive(): boolean {
    return this.health > 0;
  }

  getReward(): number {
    return Math.floor(Math.random() * (this.reward.max - this.reward.min + 1)) + this.reward.min;
  }

  resetHealth(): void {
    this.health = this.maxHealth; // Восстанавливаем здоровье
  }
}