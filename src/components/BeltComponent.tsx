import React from 'react';
import { Player } from '../entities/Player';

interface BeltComponentProps {
  player: Player;
  onUse: (slot: number) => void;
}

const BeltComponent: React.FC<BeltComponentProps> = ({ player, onUse }) => {
  return (
    <div>
      <h3>Пояс</h3>
      <ul>
        {player.belt.map((item, index) => (
          <li key={index}>
            Слот {index + 1}: {item ? item.name : 'Пусто'}
            {item && <button onClick={() => onUse(index)}>Использовать</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeltComponent;