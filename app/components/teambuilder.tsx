import React from 'react'
import Image from 'next/image'
import { Hero } from '../data/heroesData'
import { assignLine } from '../data/heroUtils'

interface TeamBuilderProps {
  team: Hero[]
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ team }) => {
  const lineOrder = ["Hard Carry", "Mid", "Offlane", "Secondary Support", "Primary Support"];

  const sortedTeam = [...team].sort((a, b) => 
    lineOrder.indexOf(assignLine(a)) - lineOrder.indexOf(assignLine(b))
  );

  return (
    <div className="team-display flex flex-wrap justify-between items-end w-full">
      {sortedTeam.map((hero, index) => (
        <div key={hero.id} className={`hero text-center flex-1 min-w-[120px] max-w-[180px] px-2 mb-4 opacity-0 animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
          <div className="relative w-full pb-[150%] mb-2">
            <Image
              src={hero.image}
              alt={hero.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg border-2 border-zinc-700 transition-all duration-300 hover:scale-105 hover:border-zinc-500"
            />
          </div>
          <p className="text-sm text-zinc-300 font-medium truncate">{hero.name}</p>
          <p className="text-xs text-zinc-400 leading-tight">
            <span className="block">{assignLine(hero).split(' ')[0]}</span>
            <span className="block">{assignLine(hero).split(' ')[1]}</span>
          </p>
          {/* {{hero.winRate !== undefined && (
            <p className="text-xs text-zinc-500">Win Rate: {(hero.winRate * 100).toFixed(2)}%</p>
          )}} */}
        </div>
      ))}
    </div>
  )
}

export default TeamBuilder

//consultar a la api de stratz para generar un json o tsx con los datos de los heroes meta.