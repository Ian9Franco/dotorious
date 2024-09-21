'use client'

import React, { useState, useEffect } from "react"
import { Navigation } from "../../components/nav"
import { getAuth } from "firebase/auth"
import { getDatabase, ref, get, set } from "firebase/database"
import { app } from "../../firebase/firebaseConfig"
import Link from 'next/link'
import { motion } from "framer-motion"
import OtherUsersStats from "./OtherUsersStats"

const auth = getAuth(app)
const db = getDatabase(app)

interface UserStats {
  username: string;
  totalMatches: number;
  winCount: number;
  winRate: number;
  firstMatchDate: string;
  lastMatchDate: string;
}

export default function StatsPage() {
  const [teamLogic, setTeamLogic] = useState<"lane" | "legis" | "Asuza">("lane")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const user = auth.currentUser
        if (!user) {
          setError("User not logged in")
          setLoading(false)
          return
        }

        const userRef = ref(db, `players/${user.uid}`)
        const snapshot = await get(userRef)
        if (!snapshot.exists()) {
          setError("User data not found")
          setLoading(false)
          return
        }

        const userData = snapshot.val()
        const steamAccountId = userData.steamAccountId

        if (!steamAccountId) {
          setError("Steam Account ID not found")
          setLoading(false)
          return
        }

        const query = `
          query {
            player(steamAccountId: ${steamAccountId}) {
              steamAccount {
                name
              }
              matchCount
              winCount
              lastMatchDate
              firstMatchDate
            }
          }
        `

        const response = await fetch('https://api.stratz.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiZWJjNDhkZWMtMDg2Zi00ZjQwLThjZWMtZWU4MDg2NTRmYjc4IiwiU3RlYW1JZCI6IjMzNjQwMzIxMyIsIm5iZiI6MTcyNjMyNzk3MiwiZXhwIjoxNzU3ODYzOTcyLCJpYXQiOjE3MjYzMjc5NzIsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.kviG_lPHInTovL0XM76J6DwOk2pQrmMPsSPyrLspoKs'
          },
          body: JSON.stringify({ query })
        })

        if (!response.ok) throw new Error('Failed to fetch player data')
        const result = await response.json()

        if (result.errors) {
          throw new Error(result.errors[0].message)
        }

        const playerData = result.data.player
        const stats: UserStats = {
          username: playerData.steamAccount.name,
          totalMatches: playerData.matchCount,
          winCount: playerData.winCount,
          winRate: (playerData.winCount / playerData.matchCount) * 100,
          firstMatchDate: new Date(playerData.firstMatchDate * 1000).toLocaleDateString(),
          lastMatchDate: new Date(playerData.lastMatchDate * 1000).toLocaleDateString()
        }

        setUserStats(stats)
        
        // Save user stats to Firebase
        await set(ref(db, `userStats/${user.uid}`), stats)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching user stats:', error)
        setError('Failed to fetch user stats. Please try again later.')
        setLoading(false)
      }
    }

    fetchUserStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-zinc-100 text-2xl">Loading stats...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-red-500 text-2xl mb-4">{error}</div>
        <Link href="/generators" className="text-zinc-100 underline">
          Return to Generators
        </Link>
      </div>
    )
  }

  return (
    <div className="relative pb-16 bg-zinc-900 min-h-screen">
      <Navigation teamLogic={teamLogic} setTeamLogic={setTeamLogic} />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
            Dota 2 Stats
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            View your stats and compare with other players.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="flex flex-col lg:flex-row gap-8">
          <OtherUsersStats />
          {userStats && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/3 bg-zinc-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">Your Stats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Username" value={userStats.username} />
                <StatCard title="Total Matches" value={userStats.totalMatches.toString()} />
                <StatCard title="Wins" value={userStats.winCount.toString()} />
                <StatCard title="Win Rate" value={`${userStats.winRate.toFixed(2)}%`} />
                <StatCard title="First Match" value={userStats.firstMatchDate} />
                <StatCard title="Last Match" value={userStats.lastMatchDate} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-700 p-4 rounded-lg shadow"
    >
      <h4 className="text-zinc-300 text-sm font-semibold mb-1">{title}</h4>
      <p className="text-zinc-100 text-xl font-bold">{value}</p>
    </motion.div>
  )
}