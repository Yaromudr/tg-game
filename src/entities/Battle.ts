// src/entities/Battle.ts
import { Player } from './Player';
import { Monster } from './Monster';

export class Battle {
  player: Player;
  monster: Monster;

  constructor(player: Player, monster: Monster) {
    this.player = player;
    this.monster = monster;
  }

  playerAttack(): void {
    const damage = this.player.getAttack() - this.monster.defense;
    if (damage > 0) {
      this.monster.takeDamage(damage);
      console.log(`${this.player.name} нанёс ${damage} урона!`);
    } else {
      console.log(`${this.player.name} не смог нанести урон.`);
    }
  }

  monsterAttack(): void {
    const damage = this.monster.attack - this.player.getDefense();
    if (damage > 0) {
      this.player.takeDamage(damage);
      console.log(`${this.monster.name} нанёс ${damage} урона!`);
    } else {
      console.log(`${this.monster.name} не смог нанести урон.`);
    }
  }

  isBattleOver(): boolean {
    return !this.monster.isAlive() || this.player.health <= 0;
  }

  getBattleResult(): string {
    if (!this.monster.isAlive()) {
      return `${this.player.name} победил!`;
    } else {
      return `${this.player.name} проиграл...`;
    }
  }
}