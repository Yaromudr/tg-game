// src/components/BattleComponent.tsx
import React, { useState } from 'react';
import { Monster } from '../entities/Monster';
import { Player } from '../entities/Player';
import { Item } from '../entities/items'; // Добавляем импорт

interface BattleComponentProps {
  player: Player; // Передаём игрока из MapComponent
  monster: Monster;
  onBattleEnd: (reward: number, loot: Item[]) => void;
}

const BattleComponent: React.FC<BattleComponentProps> = ({ player, monster, onBattleEnd }) => {
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const handleAttack = () => {
    const playerDamage = Math.max(player.getAttack() - monster.defense, 0);
    monster.takeDamage(playerDamage);
    setBattleLog([...battleLog, `Вы нанесли ${playerDamage} урона!`]);

    if (monster.isAlive()) {
      const monsterDamage = Math.max(monster.attack - player.getDefense(), 0);
      player.takeDamage(monsterDamage);
      setBattleLog([...battleLog, `${monster.name} нанёс вам ${monsterDamage} урона!`]);
    }

    if (!monster.isAlive() || player.health <= 0) {
      const reward = monster.getReward();
      const loot = monster.loot;
      onBattleEnd(reward, loot);
    }
  };

  return (
    <div>
      <h3>Бой с {monster.name}</h3>
      <p>Ваше здоровье: {player.health}</p>
      <p>Здоровье {monster.name}: {monster.health}</p>
      <button onClick={handleAttack} disabled={!monster.isAlive() || player.health <= 0}>
        Атаковать
      </button>
      <div>
        <h4>Лог боя:</h4>
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default BattleComponent;