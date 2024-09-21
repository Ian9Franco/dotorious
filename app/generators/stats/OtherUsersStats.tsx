import React, { useState, useEffect } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import { app } from '../../firebase/firebaseConfig'
import { motion } from 'framer-motion'

const db = getDatabase(app)

interface UserStats {
  username: string
  totalMatches: number
  winCount: number
  winRate?: number
  firstMatchDate: string
  lastMatchDate: string
}

export default function OtherUsersStats() {
  const [otherUsers, setOtherUsers] = useState<UserStats[]>([])

  useEffect(() => {
    const userStatsRef = ref(db, 'userStats')
    const unsubscribe = onValue(userStatsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const usersArray = Object.values(data) as UserStats[]
        setOtherUsers(usersArray)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:w-1/3 bg-zinc-800 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[600px]"
    >
      <h3 className="text-2xl font-bold text-zinc-100 mb-4">Other Players</h3>
      {otherUsers.map((user, index) => (
        <motion.div
          key={user.username + index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-zinc-700 p-4 rounded-lg shadow mb-4"
        >
          <h4 className="text-zinc-100 text-lg font-semibold mb-2">{user.username}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-zinc-300">Matches: {user.totalMatches || 'N/A'}</p>
            <p className="text-zinc-300">Wins: {user.winCount || 'N/A'}</p>
            <p className="text-zinc-300">Win Rate: {user.winRate ? `${user.winRate.toFixed(2)}%` : 'N/A'}</p>
            <p className="text-zinc-300">Last Match: {user.lastMatchDate || 'N/A'}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}