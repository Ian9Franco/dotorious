'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { heroesData, Hero } from '../../data/heroesData';

interface OpenDotaHero {
  hero_id: number;
  last_played: number;
  games: number;
  win: number;
}

interface OpenDotaMatch {
  hero_id: number;
  player_slot: number;
  radiant_win: boolean;
  start_time: number;
}

const UserHeroes: React.FC = () => {
  const [lastPlayedHeroes, setLastPlayedHeroes] = useState<Hero[]>([]);
  const [mostPlayedHeroes, setMostPlayedHeroes] = useState<Hero[]>([]);
  const [bestWinrateHeroes, setBestWinrateHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const db = getDatabase();
        const userIdRef = ref(db, `players/${user.uid}/playerId`);
        const snapshot = await get(userIdRef);
        
        if (!snapshot.exists()) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const playerId = snapshot.val();

        // Fetch last played heroes
        const recentMatchesResponse = await fetch(`https://api.opendota.com/api/players/${playerId}/recentMatches`);
        const recentMatches: OpenDotaMatch[] = await recentMatchesResponse.json();

        // Fetch hero stats
        const heroStatsResponse = await fetch(`https://api.opendota.com/api/players/${playerId}/heroes`);
        const heroStats: OpenDotaHero[] = await heroStatsResponse.json();

        const processedHeroes = processHeroData(recentMatches, heroStats);
        setLastPlayedHeroes(processedHeroes.lastPlayed);
        setMostPlayedHeroes(processedHeroes.mostPlayed);
        setBestWinrateHeroes(processedHeroes.bestWinrate);
      } catch (err) {
        setError("Failed to fetch hero data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const processHeroData = (recentMatches: OpenDotaMatch[], heroStats: OpenDotaHero[]) => {
    const heroMap = new Map(heroesData.map(hero => [hero.id, hero]));
    
    const lastPlayed = recentMatches
      .slice(0, 5)
      .map(match => {
        const hero = heroMap.get(match.hero_id);
        return hero ? { ...hero, last_played: match.start_time } : undefined;
      })
      .filter((hero): hero is Hero & { last_played: number } => hero !== undefined);

    const mostPlayed = heroStats
      .sort((a, b) => b.games - a.games)
      .slice(0, 5)
      .map(stat => {
        const hero = heroMap.get(stat.hero_id);
        return hero ? { ...hero, games: stat.games } : undefined;
      })
      .filter((hero): hero is Hero & { games: number } => hero !== undefined);

    const bestWinrate = heroStats
      .filter(stat => stat.games >= 10)
      .sort((a, b) => (b.win / b.games) - (a.win / a.games))
      .slice(0, 5)
      .map(stat => {
        const hero = heroMap.get(stat.hero_id);
        return hero ? { ...hero, winrate: stat.win / stat.games } : undefined;
      })
      .filter((hero): hero is Hero & { winrate: number } => hero !== undefined);

    return { lastPlayed, mostPlayed, bestWinrate };
  };

  if (loading) {
    return <div className="text-center text-zinc-400">Loading hero data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const HeroList: React.FC<{ heroes: (Hero & { winrate?: number, games?: number, last_played?: number })[], title: string, showWinrate?: boolean, showGames?: boolean, showLastPlayed?: boolean }> = ({ heroes, title, showWinrate, showGames, showLastPlayed }) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-zinc-100">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {heroes.map((hero) => (
          <div key={hero.id} className="flex flex-col items-center p-2 rounded-lg border border-zinc-700 bg-zinc-800">
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
            {showWinrate && hero.winrate !== undefined && (
              <span className="text-zinc-400 text-xs">
                Winrate: {(hero.winrate * 100).toFixed(2)}%
              </span>
            )}
            {showGames && hero.games !== undefined && (
              <span className="text-zinc-400 text-xs">
                Games: {hero.games}
              </span>
            )}
            {showLastPlayed && hero.last_played !== undefined && (
              <span className="text-zinc-400 text-xs">
                Last played: {new Date(hero.last_played * 1000).toLocaleDateString()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <HeroList heroes={lastPlayedHeroes} title="Last 5 Heroes Played" showLastPlayed />
      <HeroList heroes={mostPlayedHeroes} title="Top 5 Most Played Heroes" showGames />
      <HeroList heroes={bestWinrateHeroes} title="Top 5 Heroes by Winrate" showWinrate />
    </div>
  );
};

export default UserHeroes;