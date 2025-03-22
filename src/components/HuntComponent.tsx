// src/components/HuntComponent.tsx
import React from 'react';
import { Monster } from '../entities/Monster';

interface HuntComponentProps {
  monsters: Monster[];
  onAttackMonster: (monster: Monster) => void;
}

const HuntComponent: React.FC<HuntComponentProps> = ({ monsters, onAttackMonster }) => {
  return (
    <div>
      <h3>Монстры в локации:</h3>
      <ul>
        {monsters.map((monster, index) => (
          <li key={index}>
            <button onClick={() => onAttackMonster(monster)}>
              Атаковать {monster.name} (Здоровье: {monster.health})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HuntComponent;