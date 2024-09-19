import React from 'react';
import Image from 'next/image';
import { Hero } from '../data/heroesData';

interface TeamBuilderProps {
  team: Hero[];
  onHeroChange: (roleIndex: number) => void;
  teamLogic: "lane" | "legis";
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ team, onHeroChange, teamLogic }) => {
  const roles = ['Carry', 'Mid', 'Offlane', 'Secondary', 'Primary'];

  return (
    <div className="team-display w-full flex flex-col items-center justify-center">
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
        {/* Lane Name */}
        <p className="text-lg text-zinc-200 font-bold mb-2">{roles[index]}</p>

        {/* Hero Image */}
        <div className="relative w-32 h-32 mb-1"> {/* Fixed size for uniformity */}
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

        {/* Hero Name */}
        <p className="text-sm text-zinc-400 opacity-75 truncate">{hero.name}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default TeamBuilder;
