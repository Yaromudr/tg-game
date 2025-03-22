import { WorldMap } from '../entities/WorldMap';
import { Monster } from '../entities/Monster';
import { Location, LocationType } from "../entities/Location";
import { HealingScroll, PoisonScroll } from '../entities/items/Consumable';
import { Armor, Weapon } from '../entities/items';

export const createWorldMap = (): WorldMap => {
  const worldMap = new WorldMap();

  const town = new Location('Город', LocationType.Town, 'Мирный город с магазинами и NPC.');
  const dungeon = new Location('Данж', LocationType.Dungeon, 'Опасное подземелье с монстрами.');
  const field = new Location('Поле', LocationType.Field, 'Открытая местность с редкими монстрами.');

  // Добавляем локации в карту мира
  worldMap.addLocation(town);
  worldMap.addLocation(dungeon);
  worldMap.addLocation(field);

  // Связываем локации
  worldMap.connectLocations(town, field);
  worldMap.connectLocations(field, dungeon);
  
  // Латный доспех
  const plateArmor = new Armor(
    'Латный доспех',
    'Тяжёлый доспех, обеспечивающий отличную защиту.',
    20, // Бонус к здоровью
    10  // Бонус к защите
  );
  // Двуручный меч
  const greatsword = new Weapon(
    'Двуручный меч',
    'Мощное оружие, наносящее огромный урон.',
    15 // Бонус к атаке
  );

  // Добавляем монстров в локацию "Поле"
  const goblin = new Monster('Гоблин', 50, 8, 3, { min: 10, max: 20 }, [new HealingScroll(), new PoisonScroll()]);
  const wolf = new Monster('Волк', 40, 10, 2, { min: 8, max: 15 }, [plateArmor, greatsword]);

  field.addMonster(goblin); // Добавляем монстра в локацию "Поле"
  field.addMonster(wolf);   // Добавляем ещё одного монстра

  // Проверка связей
  console.log('Связи города:', worldMap.getConnectedLocations(town)); // [field]
  console.log('Связи поля:', worldMap.getConnectedLocations(field)); // [town, dungeon]
  console.log('Связи данжа:', worldMap.getConnectedLocations(dungeon)); // [field]

  return worldMap;
};