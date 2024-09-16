'use client'

import React, { useState, useEffect } from "react"
import { Navigation } from "../../components/nav"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth"
import { getDatabase, ref, set, get } from "firebase/database"
import { app } from "../../firebase/firebaseConfig"

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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [playerId, setPlayerId] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [isIdSaved, setIsIdSaved] = useState(false)
  const [playerData, setPlayerData] = useState<PlayerData | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      if (user) {
        checkIfIdSaved(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (playerId) {
      const fetchData = async () => {
        const data = await fetchPlayerData(playerId)
        setPlayerData(data)
      }
      fetchData()
    }
  }, [playerId])

  const checkIfIdSaved = async (userId: string) => {
    const playerIdRef = ref(db, `players/${userId}/playerId`)
    const snapshot = await get(playerIdRef)
    if (snapshot.exists()) {
      setPlayerId(snapshot.val())
      setIsIdSaved(true)
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      setError("")
    } catch (error) {
      setError(isSignUp ? "Failed to sign up. Please try again." : "Failed to log in. Please check your credentials.")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setError("")
      setIsIdSaved(false)
      setPlayerData(null)
    } catch (error) {
      setError("Failed to log out. Please try again.")
    }
  }

  const handleSubmitId = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await set(ref(db, `players/${user.uid}/playerId`), playerId)
      setIsIdSaved(true)
      setError("")
    } catch (error) {
      setError("Failed to save player ID. Please try again.")
    }
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
        {user ? (
          <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-zinc-100 mb-4">Welcome, {user.email}</h3>
            {!isIdSaved ? (
              <form onSubmit={handleSubmitId} className="space-y-4">
                <div>
                  <label htmlFor="playerId" className="block text-sm font-medium text-zinc-300">
                    Player ID
                  </label>
                  <input
                    type="text"
                    id="playerId"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500 transition-colors duration-300"
                >
                  Save Player ID
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-8 mx-auto">
                <div className="flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 hover:bg-zinc-700 transition-colors duration-300">
                  <div className="flex items-center text-zinc-300">
                    <span className="text-lg font-medium">User Information</span>
                  </div>
                  {playerData ? (
                    <div className="mt-2 text-zinc-400">
                      <p>Name: {playerData.profile?.personaname || 'N/A'}</p>
                      <p>MMR Estimate: {playerData.mmr_estimate?.estimate || 'N/A'}</p>
                      <p>Wins: {playerData.win || 'N/A'}</p>
                      <p>Losses: {playerData.lose || 'N/A'}</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-zinc-400">Loading player data...</p>
                  )}
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500 transition-colors duration-300"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 w-full px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors duration-300"
            >
              {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  )
}