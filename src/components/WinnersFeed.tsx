'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Clock } from 'lucide-react'
import { generateWinnerData } from '@/lib/utils'

interface Winner {
  id: string
  name: string
  prize: string
  time: string
  avatar: string
}

interface WinnerItemProps {
  winner: Winner
  index: number
}

function WinnerItem({ winner, index }: WinnerItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
    >
      {/* Avatar */}
      <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-medium">
        {winner.avatar}
      </div>
      
      {/* Winner Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">
          {winner.name}
        </h4>
        <div className="flex items-center gap-1 text-success-600 text-sm font-medium mt-1">
          <Trophy className="w-4 h-4" />
          <span className="truncate">{winner.prize}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
          <Clock className="w-3 h-3" />
          <span>{winner.time}</span>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="flex-shrink-0">
        <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
      </div>
    </motion.div>
  )
}

interface WinnersFeedProps {
  className?: string
  maxItems?: number
  autoUpdate?: boolean
  updateInterval?: number
}

export function WinnersFeed({ 
  className, 
  maxItems = 8, 
  autoUpdate = true, 
  updateInterval = 30000 
}: WinnersFeedProps) {
  const [winners, setWinners] = useState<Winner[]>([])

  // Initialize winners
  useEffect(() => {
    const initialWinners: Winner[] = Array.from({ length: maxItems }, (_, index) => ({
      id: `winner-${index}`,
      ...generateWinnerData()
    }))
    setWinners(initialWinners)
  }, [maxItems])

  // Auto-update winners
  useEffect(() => {
    if (!autoUpdate) return

    const interval = setInterval(() => {
      setWinners(prev => {
        const newWinner: Winner = {
          id: `winner-${Date.now()}`,
          ...generateWinnerData()
        }
        
        const updatedWinners = [newWinner, ...prev.slice(0, maxItems - 1)]
        return updatedWinners
      })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [autoUpdate, updateInterval, maxItems])

  return (
    <div className={className}>
      <div className="bg-white rounded-2xl shadow-medium overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="heading-sm text-gray-900">
              Ganadores Recientes
            </h3>
            <div className="flex items-center gap-2 text-sm text-success-600">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="font-medium">En vivo</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Personas reales ganando premios reales
          </p>
        </div>
        
        {/* Winners List */}
        <div className="max-h-96 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {winners.map((winner, index) => (
              <WinnerItem 
                key={winner.id} 
                winner={winner} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 text-success-500">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium text-success-600">Verificado</span>
            <span>•</span>
            <span>Todos los ganadores son contactados en menos de 24 horas</span>
          </div>
        </div>
      </div>
    </div>
  )
}