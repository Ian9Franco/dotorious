'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { heroesData } from '../../data/heroesData';

const HeroesList: React.FC = () => {
  const groupedHeroes = heroesData.reduce((acc, hero) => {
    const attribute = hero.primary_attr;
    if (!acc[attribute]) {
      acc[attribute] = [];
    }
    acc[attribute].push(hero);
    return acc;
  }, {} as Record<string, typeof heroesData>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedHeroes).map(([attribute, heroesList]) => (
        <div key={attribute}>
          <h2 className="text-2xl font-bold mb-4 text-zinc-100">
            {attribute === 'str' ? 'Strength' :
             attribute === 'agi' ? 'Agility' :
             attribute === 'int' ? 'Intelligence' : 'Universal'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {heroesList.map((hero) => (
              <Link href={`/generators/heroes/${hero.id}`} key={hero.id}>
                <div className="flex flex-col items-center justify-center p-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200">
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={hero.image}
                      alt={hero.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <span className="text-zinc-300 text-xs text-center line-clamp-1">{hero.name}</span>
                  <span className="text-zinc-400 text-xs text-center">
                    {attribute === 'str' ? 'Str' :
                     attribute === 'agi' ? 'Agi' :
                     attribute === 'int' ? 'Int' : 'Uni'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroesList;