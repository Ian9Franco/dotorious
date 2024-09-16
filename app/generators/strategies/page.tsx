'use client'

import React, { useState } from "react"
import { Navigation } from "../../components/nav"
import TeamBuilder from "../../components/teambuilder"
import { heroesData } from '../../data/heroesData'

interface Hero {
  id: number
  name: string
  primary_attr: string
  attack_type: string
  roles: string[]
  image: string
  lane?: string
  winRate?: number
}

interface HeroWinRate {
  heroId: number;
  winRate: number;
}

export default function StrategiesPage() {
  const [team, setTeam] = useState<Hero[]>([])
  const [combo, setCombo] = useState<Hero[]>([])
  const [isGeneratingTeam, setIsGeneratingTeam] = useState(false)
  const [isGeneratingCombo, setIsGeneratingCombo] = useState(false)

  const generateTeam = (): Hero[] => {
    const newTeam: Hero[] = []
    const usedHeroes = new Set<number>()

    const getRandomHeroWithRoles = (roles: string[], excludeRoles: string[] = []): Hero => {
      let hero: Hero | undefined
      while (!hero) {
        const randomHero = heroesData[Math.floor(Math.random() * heroesData.length)]
        if (!usedHeroes.has(randomHero.id) && 
            roles.some(role => randomHero.roles.includes(role)) &&
            !excludeRoles.some(role => randomHero.roles.includes(role))) {
          hero = { ...randomHero }
          usedHeroes.add(hero.id)
        }
      }
      return hero
    }

    const primarySupport = getRandomHeroWithRoles(['Support'])
    primarySupport.lane = 'Primary'
    newTeam.push(primarySupport)

    const secondarySupport = getRandomHeroWithRoles(['Support', 'Initiator', 'Disabler', 'Nuker'], ['Carry'])
    secondarySupport.lane = 'Secondary'
    newTeam.push(secondarySupport)

    const midCarry = getRandomHeroWithRoles(['Carry'])
    midCarry.lane = 'Medium'
    newTeam.push(midCarry)

    const hardCarry = getRandomHeroWithRoles(['Carry'])
    hardCarry.lane = 'Hard Carry'
    newTeam.push(hardCarry)

    const offlane = getRandomHeroWithRoles(['Durable', 'Pusher', 'Nuker'])
    offlane.lane = 'Offlane'
    newTeam.push(offlane)

    return newTeam
  }

  const generateRandomHeroes = (count: number): Hero[] => {
    const newHeroes: Hero[] = []
    const usedHeroes = new Set<number>()

    while (newHeroes.length < count) {
      const randomHero = heroesData[Math.floor(Math.random() * heroesData.length)]
      if (!usedHeroes.has(randomHero.id)) {
        newHeroes.push(randomHero)
        usedHeroes.add(randomHero.id)
      }
    }

    return newHeroes
  }

  const fetchHeroWinRates = async (heroes: Hero[]): Promise<Hero[]> => {
    try {
      const response = await fetch('https://api.stratz.com/api/v1/Hero/winRate?isCompetitive=true', {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`
        }
      })
      const data: HeroWinRate[] = await response.json()
      
      const heroWinRates = new Map(data.map(hero => [hero.heroId, hero.winRate]))

      return heroes.map(hero => ({
        ...hero,
        winRate: heroWinRates.get(hero.id) || 0
      }))
    } catch (error) {
      console.error('Error fetching hero win rates:', error)
      return heroes // Return original heroes if API call fails
    }
  }

  const handleGenerateTeam = async () => {
    setIsGeneratingTeam(true)
    const newTeam = generateTeam()
    const teamWithWinRates = await fetchHeroWinRates(newTeam)
    setTeam(teamWithWinRates)
    setIsGeneratingTeam(false)
  }

  const handleGenerateCombo = () => {
    setIsGeneratingCombo(true)
    const newCombo = generateRandomHeroes(5)
    setCombo(newCombo)
    setTimeout(() => setIsGeneratingCombo(false), 1000)
  }

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7x1 lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Strategies
          </h2>
          <p className="mt-4 text-zinc-400">
            Generate team compositions and hero combos for your Dota 2 matches.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          <div className="flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 min-h-[400px] flex-grow">
            <h3 className="text-xl font-medium text-zinc-300">Team Generator</h3>
            <p className="mt-2 text-zinc-400">Generate a balanced team composition.</p>
            <div className="mt-4 mb-6 w-full">
              <button
                onClick={handleGenerateTeam}
                disabled={isGeneratingTeam}
                className="w-full px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
              >
                {isGeneratingTeam ? 'Generating...' : 'Generate Team'}
              </button>
            </div>
            <TeamBuilder team={team} showLane={true} />
          </div>
  
          <div className="flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 min-h-[400px] flex-grow">
            <h3 className="text-xl font-medium text-zinc-300">Combo Generator</h3>
            <p className="mt-2 text-zinc-400">Create powerful hero combinations.</p>
            <div className="mt-4 mb-6 w-full">
              <button
                onClick={handleGenerateCombo}
                disabled={isGeneratingCombo}
                className="w-full px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
              >
                {isGeneratingCombo ? 'Generating...' : 'Generate Combo'}
              </button>
            </div>
            <TeamBuilder team={combo} showLane={false} />
          </div>
        </div>
      </div>
    </div>
  )
}