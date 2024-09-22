'use client';

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { app } from "../../firebase/firebaseConfig";
import Link from 'next/link';
import { motion } from "framer-motion";
import Image from 'next/image';

const auth = getAuth(app);
const db = getDatabase(app);

interface Hero {
  id: number;
  name: string;
  shortName: string;
  lastPlayedDateTime: string;
}

interface HeroStats {
  heroId: number;
  lastPlayedDateTime: string;
}

export default function UserHeroes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userHeroes, setUserHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    const fetchUserHeroes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const userRef = ref(db, `players/${user.uid}`);
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
          setError("User data not found");
          setLoading(false);
          return;
        }

        const userData = snapshot.val();
        const steamAccountId = userData.steamAccountId;

        if (!steamAccountId) {
          setError("Steam Account ID not found");
          setLoading(false);
          return;
        }

        const query = `
          query {
            player(steamAccountId: ${steamAccountId}) {
              matches(request: { take: 5 }) {
                players(steamAccountId: ${steamAccountId}) {
                  heroId
                }
                startDateTime
              }
            }
          }
        `;

        const response = await fetch('https://api.stratz.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiZWJjNDhkZWMtMDg2Zi00ZjQwLThjZWMtZWU4MDg2NTRmYjc4IiwiU3RlYW1JZCI6IjMzNjQwMzIxMyIsIm5iZiI6MTcyNjMyNzk3MiwiZXhwIjoxNzU3ODYzOTcyLCJpYXQiOjE3MjYzMjc5NzIsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.kviG_lPHInTovL0XM76J6DwOk2pQrmMPsSPyrLspoKs'
          },
          body: JSON.stringify({ query })
        });

        if (!response.ok) throw new Error('Failed to fetch user heroes');
        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const heroStats: HeroStats[] = result.data.player.matches.map((match: { players: { heroId: number }[], startDateTime: string }) => ({
          heroId: match.players[0].heroId,
          lastPlayedDateTime: match.startDateTime
        }));

        const heroesWithDetails = await Promise.all(heroStats.map(async (hero) => {
          const heroQuery = `
            query {
              constants {
                hero(id: ${hero.heroId}) {
                  id
                  displayName
                  shortName
                }
              }
            }
          `;

          const heroResponse = await fetch('https://api.stratz.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiZWJjNDhkZWMtMDg2Zi00ZjQwLThjZWMtZWU4MDg2NTRmYjc4IiwiU3RlYW1JZCI6IjMzNjQwMzIxMyIsIm5iZiI6MTcyNjMyNzk3MiwiZXhwIjoxNzU3ODYzOTcyLCJpYXQiOjE3MjYzMjc5NzIsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.kviG_lPHInTovL0XM76J6DwOk2pQrmMPsSPyrLspoKs'
            },
            body: JSON.stringify({ query: heroQuery })
          });

          if (!heroResponse.ok) throw new Error('Failed to fetch hero details');
          const heroResult = await heroResponse.json();
          const heroDetails = heroResult.data.constants.hero;

          return {
            id: heroDetails.id,
            name: heroDetails.displayName,
            shortName: heroDetails.shortName,
            lastPlayedDateTime: hero.lastPlayedDateTime
          };
        }));

        setUserHeroes(heroesWithDetails);

        // Save user heroes to Firebase
        await set(ref(db, `userHeroes/${user.uid}`), heroesWithDetails);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user heroes:', error);
        setError('Failed to fetch user heroes. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserHeroes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-zinc-100 text-2xl">Loading your hero data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-red-500 text-2xl mb-4">{error}</div>
        <Link href="/generators" className="text-zinc-100 underline">
          Return to Generators
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl mb-8">
        Your Last Played Heroes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {userHeroes.map(hero => (
          <motion.div
            key={hero.id}
            className="flex flex-col items-center p-4 rounded-lg border border-zinc-700 bg-zinc-800"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-32 h-18 mb-4">
              <Image
                src={`/images/heroesIMG/${hero.shortName}.png`}
                alt={hero.name}
                width={128}
                height={72}
                className="rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/heroesIMG/default_hero.png';
                }}
              />
            </div>
            <span className="text-zinc-300 text-sm font-semibold text-center">{hero.name}</span>
            <span className="text-zinc-400 text-xs mt-1">
              Last Played: {new Date(hero.lastPlayedDateTime).toLocaleDateString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}