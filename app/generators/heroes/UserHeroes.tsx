'use client';

import React, { useState, useEffect } from "react";
import { Navigation } from "../../components/nav";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { app } from "../../firebase/firebaseConfig";
import Link from 'next/link';
import { motion } from "framer-motion";
import OtherUsersHeroes from "./OtherUsersHeroes"; // Componente para mostrar héroes de otros usuarios

const auth = getAuth(app);
const db = getDatabase(app);

export default function HeroesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostUsedHeroes, setMostUsedHeroes] = useState<any[]>([]);
  const [userHeroes, setUserHeroes] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserHeroes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const userRef = ref(db, `players/${user.uid}/steamAccountId`);
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
          setError("Steam Account ID not found");
          setLoading(false);
          return;
        }

        const steamAccountId = snapshot.val();
        const query = `
          query {
            player(steamAccountId: ${steamAccountId}) {
              heroes {
                id
                name
                pickRate
                image
              }
            }
          }
        `;

        const response = await fetch('https://api.stratz.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`
          },
          body: JSON.stringify({ query })
        });

        if (!response.ok) throw new Error('Failed to fetch user heroes');
        const result = await response.json();

        const heroes = result.data.player.heroes.sort((a: any, b: any) => b.pickRate - a.pickRate).slice(0, 5);
        setUserHeroes(heroes);
      } catch (error) {
        console.error('Error fetching user heroes:', error);
        setError('Failed to fetch user heroes. Please try again later.');
      }
    };

    const fetchMostUsedHeroes = async () => {
      try {
        const query = `
          query {
            heroes {
              id
              name
              pickRate
              image
            }
          }
        `;

        const response = await fetch('https://api.stratz.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`
          },
          body: JSON.stringify({ query })
        });

        if (!response.ok) throw new Error('Failed to fetch heroes data');
        const result = await response.json();

        const heroes = result.data.heroes.sort((a: any, b: any) => b.pickRate - a.pickRate).slice(0, 5);
        setMostUsedHeroes(heroes);
      } catch (error) {
        console.error('Error fetching heroes:', error);
        setError('Failed to fetch heroes data. Please try again later.');
      }
    };

    fetchUserHeroes();
    fetchMostUsedHeroes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-zinc-100 text-2xl">lpm no anda mañana lo arreglo no jodan...</div>
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
    <div className="relative pb-16 bg-zinc-900 min-h-screen">
      <Navigation teamLogic={"lane"} setTeamLogic={function (value: React.SetStateAction<"lane" | "legis" | "Asuza">): void {
        throw new Error("Function not implemented.");
      } } />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Most Used Heroes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {mostUsedHeroes.map(hero => (
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
        <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Your Heroes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {userHeroes.map(hero => (
            <motion.div
              key={hero.id}
              className="flex flex-col items-center p-2 rounded-lg border border-zinc-700 bg-zinc-800"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-16 h-16 mb-2">
               {/*  <img
                  src={hero.image}
                  alt={hero.name}
                  className="rounded-md"
                /> */}
              </div>
              <span className="text-zinc-300 text-xs text-center line-clamp-1">{hero.name}</span>
              <span className="text-zinc-400 text-xs">Pick Rate: {hero.pickRate}%</span>
            </motion.div>
          ))}
        </div>
        <OtherUsersHeroes />
      </div>
    </div>
  );
}
