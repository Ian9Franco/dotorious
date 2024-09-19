'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Navigation } from '../../components/nav';
import TeamBuilder from '../../components/teambuilder';
import { heroesData, Hero } from '../../data/heroesData';

export default function StrategiesPage() {
  const [team, setTeam] = useState<Hero[]>([]);
  const [isGeneratingTeam, setIsGeneratingTeam] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [teamLogic, setTeamLogic] = useState<"lane" | "legis">("lane");

  useEffect(() => {
    setAudio(new Audio('/audio/team/announcer_battle_prepare_01.mp3'));
  }, []);

  const generateTeam = useCallback((): Hero[] => {
    const newTeam: Hero[] = [];
    const roles = ['Carry', 'Mid', 'Offlane', 'Secondary Support', 'Primary Support'];
    const availableHeroes = [...heroesData];

    roles.forEach((role) => {
      const heroesForRole = availableHeroes.filter(hero => hero[teamLogic].includes(role));
      
      if (heroesForRole.length > 0) {
        const selectedHero = heroesForRole[Math.floor(Math.random() * heroesForRole.length)];
        newTeam.push(selectedHero);
        
        // Remove the selected hero and any heroes that share a role with it
        const index = availableHeroes.findIndex(hero => hero.id === selectedHero.id);
        if (index > -1) {
          availableHeroes.splice(index, 1);
        }
        availableHeroes.forEach((hero, idx) => {
          if (hero[teamLogic].some(r => selectedHero[teamLogic].includes(r))) {
            availableHeroes.splice(idx, 1);
          }
        });
      }
    });

    return newTeam;
  }, [teamLogic]);

  const handleGenerateTeam = useCallback(() => {
    setIsGeneratingTeam(true);
    if (audio) audio.play();

    const newTeam = generateTeam();
    setTeam(newTeam);
    setIsGeneratingTeam(false);
  }, [generateTeam, audio]);

  const handleHeroChange = useCallback((roleIndex: number) => {
    const roles = ['Carry', 'Mid', 'Offlane', 'Secondary Support', 'Primary Support'];
    const currentRole = roles[roleIndex];
    const availableHeroes = heroesData.filter(hero => 
      hero[teamLogic].includes(currentRole) && 
      !team.some(teamHero => teamHero.id === hero.id || teamHero[teamLogic].some(r => hero[teamLogic].includes(r)))
    );

    if (availableHeroes.length > 0) {
      const newHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
      const newTeam = [...team];
      newTeam[roleIndex] = newHero;
      setTeam(newTeam);
    }
  }, [team, teamLogic]);

  return (
    <div className="relative pb-16">
      <Navigation teamLogic={teamLogic} setTeamLogic={setTeamLogic} />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Strategies</h2>
          <p className="mt-4 text-zinc-400">Generate team compositions for your Dota 2 matches.</p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto">
          <div className="team-generator flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 transition-all duration-300 hover:border-zinc-500 w-full max-w-4xl mx-auto">
            <h3 className="text-xl font-medium text-zinc-300">Team Generator ({teamLogic})</h3>
            <p className="mt-2 text-zinc-400">Generate a balanced team composition. Double-click or double-tap a hero to change it.</p>
            <div className="mt-4 mb-6 w-full">
              <button
                onClick={handleGenerateTeam}
                disabled={isGeneratingTeam}
                className="w-full px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
              >
                {isGeneratingTeam ? 'Generating...' : 'Generate Team'}
              </button>
            </div>
            {team.length > 0 && <TeamBuilder team={team} onHeroChange={handleHeroChange} teamLogic={teamLogic} />}
          </div>
        </div>
      </div>
    </div>
  );
}