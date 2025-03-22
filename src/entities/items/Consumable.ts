import { Item } from './Item';
import { Player } from '../Player';

export abstract class Consumable extends Item {
  intervalId: number | null = null; // Используем number вместо NodeJS.Timeout
  abstract use(player: Player): void;
  
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Свиток исцеления
// src/entities/items/Consumable.ts
export class HealingScroll extends Consumable {
  intervalId: number | null = null; // Используем number вместо NodeJS.Timeout

  constructor() {
    super('Свиток исцеления', 'Лечит 5 здоровья каждые 10 секунд (всего 30 здоровья).');
  }

  use(player: Player): void {
    let totalHealed = 0;
    this.intervalId = window.setInterval(() => { // Используем window.setInterval
      if (totalHealed < 30) {
        player.health += 5;
        totalHealed += 5;
        console.log(`Исцелено 5 здоровья. Всего исцелено: ${totalHealed}`);
      } else {
        this.stop();
      }
    }, 10000);
  }
}

// Свиток отравления
export class PoisonScroll extends Consumable {
  constructor() {
    super('Свиток отравления', 'Наносит 5 урона каждые 10 секунд (всего 30 урона).');
  }

  use(player: Player): void {
    let totalDamage = 0;
    const interval = setInterval(() => {
      if (totalDamage < 30) {
        player.health -= 5;
        totalDamage += 5;
        console.log(`Нанесено 5 урона. Всего нанесено: ${totalDamage}`);
      } else {
        clearInterval(interval);
      }
    }, 10000);
  }
}

// Зелье усиления удара
export class StrengthPotion extends Consumable {
  constructor() {
    super('Зелье усиления удара', 'Увеличивает силу следующего удара на 5%.');
  }

  use(player: Player): void {
    player.baseAttack *= 1.05;
    console.log('Сила удара увеличена на 5%.');
  }
}