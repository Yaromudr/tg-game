// src/components/InventoryComponent.tsx
import React from 'react';
import { Player } from '../entities/Player';
import { Consumable, Item } from '../entities/items';

interface InventoryComponentProps {
  player: Player;
  onEquip: (item: Item) => void;
  onAddToBelt: (item: Consumable, slot: number) => void;
}

const InventoryComponent: React.FC<InventoryComponentProps> = ({ player, onEquip, onAddToBelt }) => {
  return (
    <div>
      <h3>Инвентарь</h3>
      <p>Золото: {player.gold}</p>
      <h4>Экипировка:</h4>
      <ul>
        {Object.entries(player.equippedItems).map(([slot, item]) => (
          <li key={slot}>
            {slot}: {item ? item.name : 'Пусто'}
            {item && <button onClick={() => player.unequipItem(slot as keyof typeof player.equippedItems)}>Снять</button>}
          </li>
        ))}
      </ul>
      <h4>Предметы:</h4>
      <ul>
        {player.inventory.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description}
            <button onClick={() => onEquip(item)}>Надеть</button>
            {item instanceof Consumable && (
              <div>
                {[0, 1, 2, 3].map((slot) => (
                  <button key={slot} onClick={() => onAddToBelt(item, slot)}>
                    Положить в пояс (слот {slot + 1})
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryComponent;