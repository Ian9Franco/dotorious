import React, { useState } from 'react';
import Image from 'next/image';
import { Hero } from '../data/heroesData';

interface TeamBuilderProps {
  team: Hero[];
  onHeroChange: (roleIndex: number) => void;
  teamLogic: "lane" | "legis" | "Asuza";
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ team, onHeroChange, teamLogic }) => {
  const [pool, setPool] = useState<'Alevín' | 'Estrella'>('Alevín');
  const roles = ['Carry', 'Mid', 'Offlane', 'Secondary', 'Primary'];

  const handleTogglePool = () => {
    setPool(pool === 'Alevín' ? 'Estrella' : 'Alevín');
  };

  return (
    <div className="team-display w-full flex flex-col items-center justify-center">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleTogglePool}
          className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
        >
          {pool === 'Alevín' ? 'Switch to Estrella' : 'Switch to Alevín'}
        </button>
      </div>
      <div className="roles-display grid grid-cols-5 gap-4 mb-4 w-full">
        {team.map((hero, index) => (
          <div 
            key={hero?.id || index}
            className="hero-container flex flex-col items-center"
            onDoubleClick={() => onHeroChange(index)}
            onTouchStart={(e) => {
              if (e.touches.length === 2) {
                e.preventDefault();
                onHeroChange(index);
              }
            }}
          >
            <p className="text-lg text-zinc-200 font-bold mb-2">{roles[index]}</p>
            <div className="relative w-32 h-32 mb-1">
              {hero ? (
                <Image
                  src={hero.image}
                  alt={hero.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg border-2 border-zinc-700 transition-all duration-300 hover:border-zinc-500"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 rounded-lg"></div>
              )}
            </div>
            <p className="text-sm text-zinc-400 opacity-75 truncate">{hero.name}</p>
            {teamLogic === "Asuza" && <p className="text-xs text-zinc-500">Asuza Mode</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamBuilder;