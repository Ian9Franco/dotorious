'use client';

import React, { useState, useEffect } from "react";
import { Navigation } from "../../components/nav";
import UserHeroes from "./UserHeroes";
import { getAuth } from "firebase/auth";

export default function HeroesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamLogic, setTeamLogic] = useState<"lane" | "legis" | "Asuza">("lane");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative pb-16">
      <Navigation teamLogic={teamLogic} setTeamLogic={setTeamLogic} />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Your Heroes
          </h2>
          <p className="mt-4 text-zinc-400">
            View your recent and most successful heroes in Dota 2.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        {isLoggedIn ? (
          <UserHeroes />
        ) : (
          <div className="text-center text-zinc-400">
            Please log in to view your hero statistics.
          </div>
        )}
      </div>
    </div>
  );
}