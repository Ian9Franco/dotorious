'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../firebase/firebaseConfig";
import Image from 'next/image';

const db = getDatabase(app);

interface Hero {
  id: number;
  name: string;
  pickRate: number;
  image: string;
  matchCount: number;
  winCount: number;
}

interface HeroWithCount extends Hero {
  count: number;
}

export default function OtherUsersHeroes() {
  const [otherHeroes, setOtherHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOtherUsersHeroes = async () => {
      try {
        const userHeroesRef = ref(db, 'userHeroes');
        const snapshot = await get(userHeroesRef);

        if (snapshot.exists()) {
          const allUserHeroes = snapshot.val() as Record<string, Hero[]>;
          const heroesArray: Hero[] = Object.values(allUserHeroes).flat();
          
          // Count occurrences of each hero
          const heroCounts = heroesArray.reduce((acc: Record<number, HeroWithCount>, hero: Hero) => {
            if (!acc[hero.id]) {
              acc[hero.id] = { ...hero, count: 1 };
            } else {
              acc[hero.id].count += 1;
              acc[hero.id].matchCount += hero.matchCount;
              acc[hero.id].winCount += hero.winCount;
            }
            return acc;
          }, {});

          // Sort heroes by count and take top 5
          const sortedHeroes = Object.values(heroCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(hero => ({
              ...hero,
              pickRate: (hero.count / Object.keys(allUserHeroes).length) * 100
            }));

          setOtherHeroes(sortedHeroes);
        }
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
    return <div className="text-zinc-100 text-2xl">Loading other users&apos; heroes...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-2xl">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl mb-8">
        Most Popular Heroes Among Users
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {otherHeroes.map(hero => (
          <motion.div
            key={hero.id}
            className="flex flex-col items-center p-4 rounded-lg border border-zinc-700 bg-zinc-800"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-32 h-18 mb-4">
              <Image
                src={hero.image}
                alt={hero.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <span className="text-zinc-300 text-sm font-semibold text-center">{hero.name}</span>
            <span className="text-zinc-400 text-xs mt-1">Total Matches: {hero.matchCount}</span>
            <span className="text-zinc-400 text-xs">Total Wins: {hero.winCount}</span>
            <span className="text-zinc-400 text-xs">Average Win Rate: {((hero.winCount / hero.matchCount) * 100).toFixed(2)}%</span>
            <span className="text-zinc-400 text-xs">User Pick Rate: {hero.pickRate.toFixed(2)}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}