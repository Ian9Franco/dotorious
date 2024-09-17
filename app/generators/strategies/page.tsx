'use client'

import React, { useState, useCallback, useEffect } from "react"
import { Navigation } from "../../components/nav"
import TeamBuilder from "../../components/teambuilder"
import { heroesData, Hero } from '../../data/heroesData'
import { assignLine } from '../../data/heroUtils'

interface HeroWinRate {
  heroId: number;
  winRate: number;
}

export default function StrategiesPage() {
  const [team, setTeam] = useState<Hero[]>([])
  const [combo, setCombo] = useState<Hero[]>([])
  const [isGeneratingTeam, setIsGeneratingTeam] = useState(false)
  const [isGeneratingCombo, setIsGeneratingCombo] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    setAudio(new Audio('/path-to-your-sound.mp3'))
  }, [])

  const generateTeam = useCallback((): Hero[] => {
    const newTeam: Hero[] = []
    const usedHeroes = new Set<number>()
    const lines = ["Hard Carry", "Mid", "Offlane", "Secondary Support", "Primary Support"]

    lines.forEach(line => {
      let availableHeroes = heroesData.filter(hero => 
        !usedHeroes.has(hero.id) && assignLine(hero) === line
      )

      // If no hero is available for a specific line, select from all remaining heroes
      if (availableHeroes.length === 0) {
        availableHeroes = heroesData.filter(hero => !usedHeroes.has(hero.id))
      }

      if (availableHeroes.length > 0) {
        const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)]
        newTeam.push(randomHero)
        usedHeroes.add(randomHero.id)
      }
    })

    return newTeam
  }, [])

  const generateRandomHeroes = useCallback((count: number): Hero[] => {
    const shuffled = [...heroesData].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }, [])

  const fetchHeroWinRates = useCallback(async (heroes: Hero[]): Promise<Hero[]> => {
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
  }, [])

  const handleGenerateTeam = useCallback(async () => {
    setIsGeneratingTeam(true)
    if (audio) audio.play()
    const newTeam = generateTeam()
    const teamWithWinRates = await fetchHeroWinRates(newTeam)
    setTeam(teamWithWinRates)
    setIsGeneratingTeam(false)
  }, [generateTeam, fetchHeroWinRates, audio])

  const handleGenerateCombo = useCallback(() => {
    setIsGeneratingCombo(true)
    if (audio) audio.play()
    const newCombo = generateRandomHeroes(5)
    setCombo(newCombo)
    setIsGeneratingCombo(false)
  }, [generateRandomHeroes, audio])

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Strategies
          </h2>
          <p className="mt-4 text-zinc-400">
            Generate team compositions and hero combos for your Dota 2 matches.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto">
          <div className="team-generator flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 transition-all duration-300 hover:border-zinc-500 w-full max-w-4xl mx-auto">
            <h3 className="text-xl font-medium text-zinc-300">Team Generator</h3>
            <p className="mt-2 text-zinc-400">Generate a balanced team composition.</p>
            <div className="mt-4 mb-6 w-full">
              <button
                onClick={handleGenerateTeam}
                disabled={isGeneratingTeam}
                className="w-full px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
              >
                {isGeneratingTeam ? 'Generating...' : 'Generate Team'}
              </button>
            </div>
            <TeamBuilder team={team} />
          </div>
  
          <div className="team-generator flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 transition-all duration-300 hover:border-zinc-500 w-full max-w-4xl mx-auto">
            <h3 className="text-xl font-medium text-zinc-300">Combo Generator</h3>
            <p className="mt-2 text-zinc-400">Create powerful hero combinations.</p>
            <div className="mt-4 mb-6 w-full">
              <button
                onClick={handleGenerateCombo}
                disabled={isGeneratingCombo}
                className="w-full px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
              >
                {isGeneratingCombo ? 'Generating...' : 'Generate Combo'}
              </button>
            </div>
            <TeamBuilder team={combo} />
          </div>
        </div>
      </div>
    </div>
  )
}