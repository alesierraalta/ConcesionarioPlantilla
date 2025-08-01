'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Gift } from 'lucide-react'

interface TimeLeft {
  total: number
  hours: number
  minutes: number
  seconds: number
}

interface RaffleData {
  id: string
  prize: {
    name: string
    value: string
    image: string
  }
  drawTime: string
  currentParticipants: number
  maxParticipants: number
  remainingSlots: number | null
  status: string
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date()
  let timeLeft: TimeLeft = { total: difference, hours: 0, minutes: 0, seconds: 0 }

  if (difference > 0) {
    timeLeft = {
      total: difference,
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }
  return timeLeft
}

interface CountdownItemProps {
  value: number
  label: string
  index: number
}

function CountdownItem({ value, label, index }: CountdownItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: 'spring',
        bounce: 0.4
      }}
      className="text-center relative group"
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300" />
      
      {/* Main container */}
      <div className="relative bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl min-w-[90px] shadow-2xl border border-white/30 overflow-hidden">
        {/* Number with flip animation */}
        <motion.div className="relative z-10">
          <motion.span
            key={value}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="block text-3xl md:text-4xl font-black text-primary-700 relative"
            style={{ perspective: '1000px' }}
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
          
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
            className="block text-xs md:text-sm text-gray-600 uppercase tracking-wider font-bold mt-2 overflow-hidden whitespace-nowrap"
          >
            {label}
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}

interface RealCountdownTimerProps {
  className?: string
  onComplete?: () => void
}

export function RealCountdownTimer({ className, onComplete }: RealCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0, total: 0 })
  const [raffleData, setRaffleData] = useState<RaffleData | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    
    const fetchRaffleData = async () => {
      try {
        const response = await fetch('/api/raffle/current')
        const data = await response.json()
        
        if (response.ok && data.raffle) {
          setRaffleData(data.raffle)
          
          // Calculate initial time
          const initialTime = calculateTimeLeft(data.raffle.drawTime)
          setTimeLeft(initialTime)
        }
      } catch (error) {
        console.error('Error fetching raffle data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRaffleData()
    
    // Refresh raffle data every minute
    const raffleInterval = setInterval(fetchRaffleData, 60000)
    
    return () => clearInterval(raffleInterval)
  }, [])

  useEffect(() => {
    if (!raffleData) return

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(raffleData.drawTime)
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.total <= 0 && onComplete) {
        onComplete()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [raffleData, onComplete])

  // Don't render countdown until client-side hydration is complete
  if (!isClient || isLoading) {
    return (
      <div className={className}>
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-4" />
              <div className="flex justify-center gap-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-2xl mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!raffleData) {
    return (
      <div className={className}>
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
          <div className="text-center">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay sorteo activo
            </h3>
            <p className="text-gray-500">
              Vuelve pronto para el próximo sorteo
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-orange-400 hover:border-orange-500 transition-colors duration-300">
        <div className="text-center">
          {/* Prize Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="text-4xl mb-2">{raffleData.prize.image}</div>
            <h3 className="text-xl font-bold text-primary-700 mb-1">
              {raffleData.prize.name}
            </h3>
            <div className="text-2xl font-black text-orange-600 mb-2">
              {raffleData.prize.value}
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div 
            className="flex justify-center gap-4 md:gap-6 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          >
            <CountdownItem 
              value={timeLeft.hours} 
              label="Horas" 
              index={0}
            />
            
            {/* Animated separator */}
            <motion.div 
              className="flex flex-col justify-center items-center py-4"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full mb-2" />
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
            </motion.div>
            
            <CountdownItem 
              value={timeLeft.minutes} 
              label="Min" 
              index={1}
            />
            
            {/* Animated separator */}
            <motion.div 
              className="flex flex-col justify-center items-center py-4"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full mb-2" />
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
            </motion.div>
            
            <CountdownItem 
              value={timeLeft.seconds} 
              label="Seg" 
              index={2}
            />
          </motion.div>

          {/* Participation Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-primary-600" />
                <span className="font-semibold">{raffleData.currentParticipants}</span>
                <span className="text-gray-600">participantes</span>
              </div>
              {raffleData.remainingSlots && raffleData.remainingSlots > 0 && (
                <div className="flex items-center gap-1">
                  <Gift className="w-4 h-4 text-orange-600" />
                  <span className="font-semibold text-orange-600">{raffleData.remainingSlots}</span>
                  <span className="text-gray-600">lugares restantes</span>
                </div>
              )}
            </div>
            
            {/* Urgency indicator */}
            <motion.p
              animate={{ 
                scale: timeLeft.total < 3600000 ? [1, 1.05, 1] : 1, // Animate if less than 1 hour
                color: timeLeft.total < 3600000 ? ['#ef4444', '#f59e0b', '#ef4444'] : '#6b7280'
              }}
              transition={{ duration: 1, repeat: timeLeft.total < 3600000 ? Infinity : 0 }}
              className="text-sm font-semibold"
            >
              {timeLeft.total < 3600000 ? '¡Menos de 1 hora restante!' : 'Tiempo restante para el sorteo'}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}