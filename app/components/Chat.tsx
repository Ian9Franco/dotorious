'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, push, onValue, query, limitToLast, remove, get } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { app } from '../firebase/firebaseConfig'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const db = getDatabase(app)
const auth = getAuth(app)

interface Message {
  id: string
  text: string
  userId: string
  username: string
  heroImage: string
  timestamp: number
}

const MAX_MESSAGES = 100

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

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [currentUser, setCurrentUser] = useState<{ uid: string; username: string; heroImage: string } | null>(null)
  const [heroImage, setHeroImage] = useState<string>('/path/to/your/default-image.svg')
  const [isChatVisible, setIsChatVisible] = useState<boolean>(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = ref(db, `players/${user.uid}`)
        const snapshot = await get(userRef)
        const userData = snapshot.val()

        const usernameFromAPI = await fetchUsername(userData?.playerId)
        
        setCurrentUser({
          uid: user.uid,
          username: usernameFromAPI || 'Usuario Desconocido',
          heroImage: userData?.heroImage || '/path/to/your/default-image.svg'
        })
        setHeroImage(userData?.heroImage || '/path/to/your/default-image.svg')
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const messagesRef = query(ref(db, 'messages'), limitToLast(MAX_MESSAGES))
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData: Message[] = []
      snapshot.forEach((childSnapshot) => {
        messagesData.push({ id: childSnapshot.key!, ...childSnapshot.val() })
      })
      setMessages(messagesData)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && currentUser) {
      const messagesRef = ref(db, 'messages')
      push(messagesRef, {
        text: newMessage,
        userId: currentUser.uid,
        username: currentUser.username,
        heroImage: heroImage,
        timestamp: Date.now()
      })
      setNewMessage('')

      if (messages.length >= MAX_MESSAGES) {
        const oldestMessageRef = ref(db, `messages/${messages[0].id}`)
        remove(oldestMessageRef)
      }
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = URL.createObjectURL(e.target.files[0])
      setHeroImage(selectedImage)

      // Guardar la nueva imagen en Firebase
      if (currentUser) {
        const userRef = ref(db, `players/${currentUser.uid}/heroImage`)
        await push(userRef, selectedImage)
      }
    }
  }

  const getMessageColor = (userId: string) => {
    if (!userId) return 'text-gray-400'; // Color por defecto si userId es undefined
  
    const colors = ['text-blue-400', 'text-green-400', 'text-yellow-400', 'text-pink-400', 'text-purple-400'];
    const colorIndex = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[colorIndex];
  }
  
  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev)
  }
  
  return (
    <>
      <button onClick={toggleChatVisibility} className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-lg">
        {isChatVisible ? 'Cerrar Chat' : 'Abrir Chat'}
      </button>

      {isChatVisible && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-zinc-800 rounded-lg shadow-lg flex flex-col">
          <div className="p-4 bg-zinc-700 rounded-t-lg flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-100">Global Chat</h2>
            <label className="cursor-pointer">
              <FontAwesomeIcon icon={faImage} className="text-zinc-100" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <FontAwesomeIcon 
              icon={faTimesCircle} 
              className="text-zinc-100 cursor-pointer" 
              onClick={() => setHeroImage('/path/to/your/default-image.svg')} 
            />
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-2 flex items-start">
                <Image
                  src={message.heroImage}
                  alt={message.username}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                <div>
                  <span className={`font-bold ${getMessageColor(message.userId)}`}>{message.username}: </span>
                  <span className="text-zinc-400">{message.text}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-zinc-700 rounded-b-lg">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-zinc-600 text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </form>
        </div>
      )}
    </>
  )
}
