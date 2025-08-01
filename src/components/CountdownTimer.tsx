'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTimeUntilNextDraw } from '@/lib/utils'

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
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
      
      {/* Main container */}
      <div className="relative bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl min-w-[90px] shadow-2xl border border-white/30 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-500 to-orange-500"
            animate={{ 
              background: [
                'linear-gradient(45deg, #3b82f6, #f59e0b)',
                'linear-gradient(45deg, #f59e0b, #10b981)',
                'linear-gradient(45deg, #10b981, #3b82f6)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

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
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.span>
          
          {/* Label with typewriter effect */}
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
            className="block text-xs md:text-sm text-gray-600 uppercase tracking-wider font-bold mt-2 overflow-hidden whitespace-nowrap"
          >
            {label}
          </motion.span>
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </motion.div>
  )
}

interface CountdownTimerProps {
  className?: string
  onComplete?: () => void
}

export function CountdownTimer({ className, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, total: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set client flag to true after component mounts
    setIsClient(true)
    
    // Initialize time after client mount
    const initialTime = getTimeUntilNextDraw()
    setTimeLeft(initialTime)

    const timer = setInterval(() => {
      const newTime = getTimeUntilNextDraw()
      setTimeLeft(newTime)
      
      // Call onComplete when countdown reaches zero
      if (newTime.total <= 0 && onComplete) {
        onComplete()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [onComplete])

  // Don't render countdown until client-side hydration is complete
  if (!isClient) {
    return (
      <div className={className}>
        <motion.div 
          className="flex justify-center gap-4 md:gap-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        >
          {/* Placeholder items */}
          {[0, 1, 2].map((index) => (
            <div key={index} className="text-center relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 blur-lg" />
              <div className="relative bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl min-w-[90px] shadow-2xl border border-white/30">
                <div className="text-3xl md:text-4xl font-black text-primary-700">--</div>
                <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-bold mt-2">
                  {['Horas', 'Min', 'Seg'][index]}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <div className={className}>
      <motion.div 
        className="flex justify-center gap-4 md:gap-6"
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
      
      {/* Urgency indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-center mt-4"
      >
        <motion.p
          animate={{ 
            scale: timeLeft.total < 3600 ? [1, 1.05, 1] : 1,
            color: timeLeft.total < 3600 ? ['#ef4444', '#f59e0b', '#ef4444'] : '#6b7280'
          }}
          transition={{ duration: 1, repeat: timeLeft.total < 3600 ? Infinity : 0 }}
          className="text-sm font-semibold"
        >
          {timeLeft.total < 3600 ? '¡Menos de 1 hora restante!' : 'Tiempo restante para el sorteo'}
        </motion.p>
      </motion.div>
    </div>
  )
}