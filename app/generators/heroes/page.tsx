'use client';

import React, { useState } from "react";
import { Navigation } from "../../components/nav";
import HeroesList from "./HeroesList";

export default function HeroesPage() {
  const [teamLogic, setTeamLogic] = useState<"lane" | "legis" | "Asuza">("lane");

  return (
    <div className="relative pb-16">
      <Navigation teamLogic={teamLogic} setTeamLogic={setTeamLogic} />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Heroes
          </h2>
          <p className="mt-4 text-zinc-400">
            Explore Dota 2 heroes and their abilities.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <HeroesList />
      </div>
    </div>
  );
}
