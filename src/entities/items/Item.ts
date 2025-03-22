// Базовый класс для всех предметов
export abstract class Item {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}