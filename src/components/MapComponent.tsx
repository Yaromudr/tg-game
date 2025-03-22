// src/components/MapComponent.tsx
import React, { useState, useMemo } from 'react';
import { Player } from '../entities/Player';
import { Location } from '../entities/Location';
import { createWorldMap } from '../data/worldMap';
import HuntComponent from './HuntComponent';
import InventoryComponent from './InventoryComponent';
import BeltComponent from './BeltComponent';
import BattleComponent from './BattleComponent';
import { Item, Armor, Weapon, Helmet, Bracers, Pauldrons, Leggings, Chainmail, Boots, Consumable } from '../entities/items';
import { Monster } from '../entities/Monster';

enum GameState {
  Location,
  Inventory,
  Hunt,
  Battle,
}

const MapComponent: React.FC = () => {
  const worldMap = useMemo(() => createWorldMap(), []);
  const [player] = useState(new Player('Герой', worldMap.locations[0]));
  const [currentLocation, setCurrentLocation] = useState(player.currentLocation);
  const [gameState, setGameState] = useState(GameState.Location);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

  const handleMove = (location: Location) => {
    player.moveTo(location);
    setCurrentLocation(location);
  };

  const handleBattleEnd = (reward: number, loot: Item[]) => {
    player.addGold(reward);
    loot.forEach((item) => player.addToInventory(item));
    setGameState(GameState.Location);
    alert(`Вы получили ${reward} золота и следующие предметы: ${loot.map((item) => item.name).join(', ')}`);
  };

  const handleEquip = (item: Item) => {
    if (item instanceof Armor) {
      player.equipItem(item); // Надеваем броню
    } else if (item instanceof Weapon) {
      player.equipItem(item); // Надеваем оружие
    } else if (item instanceof Helmet) {
      player.equipItem(item); // Надеваем шлем
    } else if (item instanceof Bracers) {
      player.equipItem(item); // Надеваем наручи
    } else if (item instanceof Pauldrons) {
      player.equipItem(item); // Надеваем наплечники
    } else if (item instanceof Leggings) {
      player.equipItem(item); // Надеваем поножи
    } else if (item instanceof Chainmail) {
      player.equipItem(item); // Надеваем кольчугу
    } else if (item instanceof Boots) {
      player.equipItem(item); // Надеваем сапоги
    } else {
      console.error('Неизвестный тип предмета:', item);
    }
    setCurrentLocation( currentLocation ); // Обновляем состояние
  };

  const handleAddToBelt = (item: Consumable, slot: number) => {
    player.addToBelt(item, slot);
    setCurrentLocation( currentLocation ); // Обновляем состояние
  };

  const handleUseFromBelt = (slot: number) => {
    player.useFromBelt(slot);
    setCurrentLocation( currentLocation ); // Обновляем состояние
  }

  const handleAttackMonster = (monster: Monster) => {
    if (monster.isAlive()) {
      setSelectedMonster(monster);
      setGameState(GameState.Battle);
    } else {
      alert('Монстр уже повержен!');
    }
  };

  return (
    <div>
      {gameState !== GameState.Battle && (
        <div>
          <button onClick={() => setGameState(GameState.Location)}>Локация</button>
          <button onClick={() => setGameState(GameState.Inventory)}>Инвентарь</button>
          {currentLocation.type === 'Field' && (
            <button onClick={() => setGameState(GameState.Hunt)}>Охота</button>
          )}
        </div>
      )}

      {gameState === GameState.Location && (
        <div>
          <h2>Локация: {currentLocation.name}</h2>
          <p>{currentLocation.description}</p>
          <h3>Доступные локации:</h3>
          <ul>
            {worldMap.getConnectedLocations(currentLocation).map((location, index) => (
              <li key={index}>
                <button onClick={() => handleMove(location)}>
                  Перейти в {location.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {gameState === GameState.Inventory && (
        <div>
          <InventoryComponent
            player={player}
            onEquip={handleEquip}
            onAddToBelt={handleAddToBelt}
          />
          <BeltComponent player={player} onUse={handleUseFromBelt} />
        </div>
      )}

      {gameState === GameState.Hunt && (
        <HuntComponent
          monsters={currentLocation.getMonsters()}
          onAttackMonster={handleAttackMonster}
        />
      )}

      {gameState === GameState.Battle && selectedMonster && (
        <BattleComponent
          player={player}
          monster={selectedMonster}
          onBattleEnd={handleBattleEnd}
        />
      )}
    </div>
  );
};

export default MapComponent;