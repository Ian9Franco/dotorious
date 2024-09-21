'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OtherUsersHeroes() {
  const [otherHeroes, setOtherHeroes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOtherUsersHeroes = async () => {
      try {
        // Aquí deberías reemplazar esta URL con tu endpoint que obtenga héroes de otros usuarios
        const response = await fetch('/api/other-users-heroes'); 

        if (!response.ok) throw new Error('Failed to fetch other users heroes');
        const result = await response.json();
        setOtherHeroes(result);
      } catch (error) {
        console.error('Error fetching other users heroes:', error);
        setError('Failed to fetch other users heroes.');
      } finally {
        setLoading(false);
      }
    };

    fetchOtherUsersHeroes();
  }, []);

  if (loading) {
    // eslint-disable-next-line react/no-unescaped-entities
    return <div>Loading other users' heroes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
        Heroes from Other Users
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {otherHeroes.map(hero => (
          <motion.div
            key={hero.id}
            className="flex flex-col items-center p-2 rounded-lg border border-zinc-700 bg-zinc-800"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-16 h-16 mb-2">
              {<img
                src={hero.image}
                alt={hero.name}
                className="rounded-md"
              />}
            </div>
            <span className="text-zinc-300 text-xs text-center line-clamp-1">{hero.name}</span>
            <span className="text-zinc-400 text-xs">Pick Rate: {hero.pickRate}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
