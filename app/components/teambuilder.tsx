'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

interface TeamBuilderProps {
  team: Hero[]
  showLane: boolean
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ team, showLane }) => {
  return (
    <div className="grid grid-cols-5 gap-4 mt-6"> {/* Cambiado de grid-cols-3 a grid-cols-5 */}
  {team.map((hero, index) => (
    <motion.div
      key={hero.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex flex-col items-center rounded-lg bg-zinc-800 shadow-lg overflow-hidden ${hero.winRate && hero.winRate > 45 ? 'ring-2 ring-yellow-400' : ''}`}
    >
      {showLane && hero.lane && (
        <div className="w-full bg-zinc-700 py-1 px-2 text-center">
          <span className="text-xs font-semibold text-zinc-300">{hero.lane}</span>
        </div>
      )}
      <div className="w-full h-32 relative"> {/* Ajuste del tamaño de las imágenes */}
        <Image
          src={hero.image}
          alt={hero.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 text-center">
        <span className="text-sm font-semibold text-zinc-100">{hero.name}</span>
        <span className="text-[0.85rem] text-zinc-400 block mt-1">{/* Texto ajustado a 0.85rem */}
          {hero.roles.join(', ')}
        </span>
        {hero.winRate && hero.winRate > 45 && (
          <span className="text-xs text-yellow-400 block mt-1">
            Win Rate: {hero.winRate.toFixed(2)}%
          </span>
        )}
      </div>
    </motion.div>
  ))}
</div>


  )
}

export default TeamBuilder

//consultar a la api de stratz para generar un json o tsx con los datos de los heroes meta.