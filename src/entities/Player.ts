// src/entities/Player.ts
import { Location } from './Location';
import { Item, Armor, Weapon, Helmet, Bracers, Pauldrons, Leggings, Chainmail, Boots, Consumable } from './items';

export class Player {
  name: string;
  health: number;
  baseAttack: number;
  baseDefense: number;
  gold: number;
  inventory: Item[];
  belt: (Consumable | null)[];
  equippedItems: {
    helmet: Helmet | null;
    bracers: Bracers | null;
    pauldrons: Pauldrons | null;
    weapon: Weapon | null;
    armor: Armor | null;
    leggings: Leggings | null;
    chainmail: Chainmail | null;
    boots: Boots | null;
  };
  currentLocation: Location;

  constructor(name: string, startingLocation: Location) {
    this.name = name;
    this.health = 100;
    this.baseAttack = 10;
    this.baseDefense = 5;
    this.gold = 0;
    this.inventory = [];
    this.belt = Array(4).fill(null);
    this.equippedItems = {
      helmet: null,
      bracers: null,
      pauldrons: null,
      weapon: null,
      armor: null,
      leggings: null,
      chainmail: null,
      boots: null,
    };
    this.currentLocation = startingLocation;
  }

  // Добавление предмета в инвентарь
  addToInventory(item: Item): void {
    this.inventory.push(item);
  }

   // Удаление предмета из инвентаря
   removeFromInventory(item: Item): void {
    const index = this.inventory.indexOf(item);
    if (index !== -1) {
      this.inventory.splice(index, 1);
    }
  }

  // Надеть предмет
  equipItem(item: Item): void {
    if (item instanceof Helmet) {
      this.equippedItems.helmet = item;
    } else if (item instanceof Bracers) {
      this.equippedItems.bracers = item;
    } else if (item instanceof Pauldrons) {
      this.equippedItems.pauldrons = item;
    } else if (item instanceof Weapon) {
      this.equippedItems.weapon = item;
      this.baseAttack += item.attackBonus;
    } else if (item instanceof Armor) {
      this.equippedItems.armor = item;
      this.health += item.healthBonus;
      this.baseDefense += item.defenseBonus;
    } else if (item instanceof Leggings) {
      this.equippedItems.leggings = item;
    } else if (item instanceof Chainmail) {
      this.equippedItems.chainmail = item;
    } else if (item instanceof Boots) {
      this.equippedItems.boots = item;
    }
    this.removeFromInventory(item); // Удаляем предмет из инвентаря
  }

  // Снять предмет
  unequipItem(slot: keyof typeof this.equippedItems): void {
    const item = this.equippedItems[slot];
    if (item) {
      if (item instanceof Weapon) {
        this.baseAttack -= item.attackBonus;
      } else if (item instanceof Armor) {
        this.health -= item.healthBonus;
        this.baseDefense -= item.defenseBonus;
      }
      this.equippedItems[slot] = null;
      this.addToInventory(item); // Возвращаем предмет в инвентарь
    }
  }

  // Добавление предмета в пояс
  addToBelt(item: Consumable, slot: number): void {
    if (slot >= 0 && slot < 4) {
      this.belt[slot] = item;
      this.removeFromInventory(item); // Удаляем предмет из инвентаря
    }
  }

  // Использование предмета из пояса
  useFromBelt(slot: number): void {
    if (slot >= 0 && slot < 4 && this.belt[slot]) {
      const item = this.belt[slot];
      if (item instanceof Consumable) {
        item.use(this);
        this.belt[slot] = null; // Удаляем использованный предмет
      }
    }
  }


  // Получить текущую атаку (с учётом оружия)
  getAttack(): number {
    return this.baseAttack + (this.equippedItems.weapon ? this.equippedItems.weapon.attackBonus : 0);
  }

  // Получить текущую защиту (с учётом брони)
  getDefense(): number {
    return this.baseDefense + (this.equippedItems.armor ? this.equippedItems.armor.defenseBonus : 0);
  }

  // Получить текущее здоровье
  getHealth(): number {
    return this.health;
  }

  // Получение урона
  takeDamage(damage: number): void {
    this.health -= damage;
    if (this.health < 0) this.health = 0;
  }

  // Перемещение в новую локацию
  moveTo(location: Location): void {
    this.currentLocation = location;
  }

  // Добавление золота
  addGold(amount: number): void {
    this.gold += amount;
  }
}