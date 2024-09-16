'use client';

import React from 'react';
import Link from 'next/link';
import { heroesData } from '../../data/heroesData'; // Importa los datos de héroes

const HeroesList: React.FC = () => {
  // Agrupar héroes por atributo
  const groupedHeroes = heroesData.reduce((acc, hero) => {
    const attribute = hero.primary_attr;
    if (!acc[attribute]) {
      acc[attribute] = [];
    }
    acc[attribute].push(hero);
    return acc;
  }, {} as Record<string, typeof heroesData>);

  return (
    <div>
      {Object.entries(groupedHeroes).map(([attribute, heroesList]) => (
        <div key={attribute} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {attribute === 'str' ? 'Strength' :
             attribute === 'agi' ? 'Agility' :
             attribute === 'int' ? 'Intelligence' : 'Universal'}
          </h2>
          <div className="flex flex-wrap gap-4">
            {heroesList.map((hero) => (
              <Link href={`/generators/heroes/${hero.id}`} key={hero.id}>
                <div
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-700 bg-zinc-800"
                  style={{ width: '150px', height: '200px' }} // Contenedor vacío
                >
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-cover rounded-lg mb-2"
                  />
                  <span className="text-zinc-300 text-center">{hero.name}</span>
                  <span className="text-zinc-400 text-center">
                    {attribute === 'str' ? 'Strength' :
                     attribute === 'agi' ? 'Agility' :
                     attribute === 'int' ? 'Intelligence' : 'Universal'}
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
