// app/generators/stats/page.tsx

'use client'

import React, { useState, useEffect } from "react"
import { Navigation } from "../../components/nav"
import { getAuth, User } from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database"
import { app } from "../../firebase/firebaseConfig"
import { useRouter } from 'next/navigation'

const auth = getAuth(app)
const db = getDatabase(app)

interface PlayerData {
  profile?: {
    personaname?: string;
  };
  mmr_estimate?: {
    estimate?: number;
  };
  win?: number;
  lose?: number;
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

export default function StatsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [playerData, setPlayerData] = useState<PlayerData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user data is in localStorage
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      setUser(parsedUser);
      fetchPlayerStats(parsedUser.uid);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user)
          fetchPlayerStats(user.uid)
        } else {
          router.push('/generators')
        }
      })
      return () => unsubscribe()
    }
  }, [router])

  const fetchPlayerStats = async (userId: string) => {
    const playerIdRef = ref(db, `players/${userId}/playerId`)
    const snapshot = await get(playerIdRef)
    if (snapshot.exists()) {
      const playerId = snapshot.val()
      const data = await fetchPlayerData(playerId)
      setPlayerData(data)
    }
  }

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Stats
          </h2>
          <p className="mt-4 text-zinc-400">View your personal Dota 2 statistics.</p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
          {playerData ? (
            <div className="grid grid-cols-1 gap-8 mx-auto">
              <div className="flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 hover:bg-zinc-700 transition-colors duration-300">
                <div className="flex items-center text-zinc-300">
                  <span className="text-lg font-medium">User Information</span>
                </div>
                <div className="mt-2 text-zinc-400">
                  <p>Name: {playerData.profile?.personaname || 'N/A'}</p>
                  <p>MMR Estimate: {playerData.mmr_estimate?.estimate || 'N/A'}</p>
                  <p>Wins: {playerData.win || 'N/A'}</p>
                  <p>Losses: {playerData.lose || 'N/A'}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-zinc-400">Loading player data...</p>
          )}
        </div>
      </div>
    </div>
  )
}