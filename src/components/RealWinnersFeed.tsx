'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Clock, Car, Smartphone, Gift, Laptop, DollarSign } from 'lucide-react'

interface Winner {
  id: string
  winnerName: string
  prize: string
  value: string
  date: string
  timeAgo: string
}

interface WinnerItemProps {
  winner: Winner
  index: number
}

function getPrizeIcon(prizeName: string) {
  const name = prizeName.toLowerCase()
  if (name.includes('civic') || name.includes('yamaha') || name.includes('car') || name.includes('moto')) {
    return <Car className="w-4 h-4" />
  }
  if (name.includes('iphone') || name.includes('phone')) {
    return <Smartphone className="w-4 h-4" />
  }
  if (name.includes('macbook') || name.includes('laptop')) {
    return <Laptop className="w-4 h-4" />
  }
  if (name.includes('cash') || name.includes('efectivo')) {
    return <DollarSign className="w-4 h-4" />
  }
  return <Gift className="w-4 h-4" />
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
      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-medium">
        {winner.winnerName.charAt(0)}
      </div>
      
      {/* Winner Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">
          {winner.winnerName}
        </h4>
        <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-1">
          <Trophy className="w-4 h-4" />
          <span className="truncate">{winner.prize}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{winner.timeAgo}</span>
          </div>
          <span className="font-semibold text-primary-600">{winner.value}</span>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
    </motion.div>
  )
}

interface RealWinnersFeedProps {
  className?: string
}

export function RealWinnersFeed({ className = '' }: RealWinnersFeedProps) {
  const [winners, setWinners] = useState<Winner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/raffle/winners')
        const data = await response.json()
        
        if (response.ok && data.winners) {
          setWinners(data.winners.slice(0, 5))
          setError(null)
        } else {
          setError('Error al cargar ganadores')
        }
      } catch (error) {
        console.error('Error fetching winners:', error)
        setError('Error de conexión')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWinners()
    
    // Refresh winners every 30 seconds
    const interval = setInterval(fetchWinners, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className={`bg-white rounded-2xl shadow-soft p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Ganadores Recientes</h3>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white rounded-2xl shadow-soft p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Ganadores Recientes</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-soft overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Ganadores Recientes</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Estos son nuestros últimos ganadores verificados
        </p>
      </div>

      {/* Winners List */}
      <div className="max-h-80 overflow-y-auto">
        <AnimatePresence initial={false}>
          {winners.length > 0 ? (
            winners.map((winner, index) => (
              <WinnerItem key={winner.id} winner={winner} index={index} />
            ))
          ) : (
            <div className="p-8 text-center">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Aún no hay ganadores registrados
              </p>
              <p className="text-sm text-gray-400 mt-1">
                ¡Sé el primero en participar!
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Actualizado automáticamente
          </span>
          <div className="flex items-center gap-1 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">En vivo</span>
          </div>
        </div>
      </div>
    </div>
  )
}