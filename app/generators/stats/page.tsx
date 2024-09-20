'use client'

import React, { useState, useEffect, useCallback } from "react"
import { Navigation } from "../../components/nav"
import { getAuth } from "firebase/auth"
import { getDatabase, ref, get, set, onValue } from "firebase/database"
import { app } from "../../firebase/firebaseConfig"
import Image from 'next/image'
import { heroesData } from '../../data/heroesData'

const auth = getAuth(app)
const db = getDatabase(app)

interface PlayerData {
  personaname: string;
  rank_tier?: number;
}

interface BestHero {
  id: number;
  name: string;
  image: string;
  wins: number;
  games: number;
}

interface ConsecutiveStats {
  wins: number;
  losses: number;
}

interface UserStats {
  username: string;
  playerData: PlayerData | null;
  bestHero: BestHero | null;
  consecutiveStats: ConsecutiveStats | null;
}

const fetchPlayerData = async (playerId: string): Promise<PlayerData | null> => {
  try {
    const response = await fetch(`https://api.opendota.com/api/players/${playerId}`)
    if (!response.ok) throw new Error('Failed to fetch player data')
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

const fetchBestHeroThisWeek = async (playerId: string): Promise<BestHero | null> => {
  try {
    const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60
    const response = await fetch(`https://api.opendota.com/api/players/${playerId}/heroes?date=${oneWeekAgo}`)
    if (!response.ok) throw new Error('Failed to fetch hero data')
    const heroStats = await response.json()
    const bestHero = heroStats
      .filter((hero: { games: number }) => hero.games > 0)
      .sort((a: { win: number; games: number }, b: { win: number; games: number }) => (b.win / b.games) - (a.win / a.games))[0]
    if (bestHero) {
      const heroData = heroesData.find(h => h.id === bestHero.hero_id)
      return {
        id: bestHero.hero_id,
        name: heroData?.name || 'Unknown Hero',
        image: heroData?.image || '/placeholder.svg?height=80&width=80',
        wins: bestHero.win,
        games: bestHero.games
      }
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

const fetchRecentMatches = async (playerId: string) => {
  try {
    const response = await fetch(`https://api.opendota.com/api/players/${playerId}/recentMatches?limit=10`);
    if (!response.ok) throw new Error('Failed to fetch recent matches');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    return [];
  }
};

const calculateConsecutiveStats = (matches: Array<{ player_slot: number; radiant_win: boolean }>): ConsecutiveStats => {
  let consecutiveWins = 0;
  let consecutiveLosses = 0;
  let currentStreak = 0;
  let isWinStreak = false;

  for (const match of matches) {
    const playerWon = (match.player_slot < 128) === match.radiant_win;
    
    if (currentStreak === 0) {
      isWinStreak = playerWon;
      currentStreak = 1;
    } else if (playerWon === isWinStreak) {
      currentStreak++;
    } else {
      break;
    }
  }

  if (isWinStreak) {
    consecutiveWins = currentStreak;
  } else {
    consecutiveLosses = currentStreak;
  }

  return { wins: consecutiveWins, losses: consecutiveLosses };
};

export default function StatsPage() {
  const [allUserStats, setAllUserStats] = useState<Record<string, UserStats>>({})
  const [teamLogic, setTeamLogic] = useState<"lane" | "legis" | "Asuza">("lane")

  const fetchPlayerStats = useCallback(async (userId: string) => {
    const userRef = ref(db, `players/${userId}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      const userData = snapshot.val()
      const playerId = userData.playerId
      const username = userData.username || await fetchUsername(playerId)
      const data = await fetchPlayerData(playerId)
      const bestHeroData = await fetchBestHeroThisWeek(playerId)
      const recentMatches = await fetchRecentMatches(playerId)
      const stats = calculateConsecutiveStats(recentMatches)

      const userStats: UserStats = {
        username,
        playerData: data,
        bestHero: bestHeroData,
        consecutiveStats: stats
      }

      await set(ref(db, `userStats/${userId}`), userStats)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchPlayerStats(user.uid)
      }
    })
    return () => unsubscribe()
  }, [fetchPlayerStats])

  useEffect(() => {
    const allStatsRef = ref(db, 'userStats')
    const unsubscribe = onValue(allStatsRef, (snapshot) => {
      if (snapshot.exists()) {
        setAllUserStats(snapshot.val())
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchUsername = async (playerId: string): Promise<string> => {
    try {
      const response = await fetch(`https://api.opendota.com/api/players/${playerId}`)
      if (!response.ok) throw new Error('Failed to fetch player data')
      const data = await response.json()
      return data.profile?.personaname || 'Unknown Player'
    } catch (error) {
      console.error(error)
      return 'Unknown Player'
    }
  }

  const renderUserStats = (userId: string, stats: UserStats, rank: number) => (
    <div key={userId} className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-zinc-100">{stats.username}</h3>
        <div className="flex items-center">
          <span className={`text-3xl font-bold ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-400' : rank === 3 ? 'text-orange-400' : 'text-zinc-400'}`}>
            #{rank}
          </span>
          {rank <= 3 && (
            <Image
              src={`/images/rank-${rank}.png`}
              alt={`Rank ${rank}`}
              width={30}
              height={30}
              className="ml-2"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="bg-zinc-700 p-4 rounded-lg shadow-lg mb-4">
            <h4 className="text-xl font-bold text-zinc-100 mb-2">Weekly Best Hero</h4>
            {stats.bestHero ? (
              <div className="flex flex-col items-center">
                <Image
                  src={stats.bestHero.image}
                  alt={stats.bestHero.name}
                  width={80}
                  height={80}
                  className="rounded-md mb-2"
                />
                <p className="text-zinc-300 text-sm font-semibold">{stats.bestHero.name}</p>
                <p className="text-zinc-400 text-xs">Wins: {stats.bestHero.wins}</p>
                <p className="text-zinc-400 text-xs">Games: {stats.bestHero.games}</p>
                <p className="text-zinc-400 text-xs">
                  Winrate: {((stats.bestHero.wins / stats.bestHero.games) * 100).toFixed(2)}%
                </p>
              </div>
            ) : (
              <p className="text-zinc-400">No data available</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="bg-zinc-700 p-4 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold text-zinc-100 mb-2">Current Streak</h4>
            {stats.consecutiveStats ? (
              <div className="text-center">
                <p className={`text-2xl font-bold ${stats.consecutiveStats.wins > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.consecutiveStats.wins > 0 
                    ? `${stats.consecutiveStats.wins} Win Streak` 
                    : `${stats.consecutiveStats.losses} Loss Streak`}
                </p>
              </div>
            ) : (
              <p className="text-zinc-400">No streak data available</p>
            )}
          </div>
          <div className="bg-zinc-700 p-4 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold text-zinc-100 mb-2">Estimated MMR</h4>
            {stats.playerData?.rank_tier ? (
              <p className="text-2xl font-bold text-zinc-100">
                {stats.playerData.rank_tier * 100}
              </p>
            ) : (
              <p className="text-zinc-400">Not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const sortedUserStats = Object.entries(allUserStats).sort((a, b) => {
    const aWins = a[1].consecutiveStats?.wins || 0;
    const bWins = b[1].consecutiveStats?.wins || 0;
    return bWins - aWins;
  });

  return (
    <div className="relative pb-16 bg-zinc-900 min-h-screen">
      <Navigation teamLogic={teamLogic} setTeamLogic={setTeamLogic} />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
            Dota 2 Player Stats
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            View statistics for all Dota 2 players who have used our app.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8">
          {sortedUserStats.map(([userId, stats], index) => renderUserStats(userId, stats, index + 1))}
        </div>
      </div>
    </div>
  )
}