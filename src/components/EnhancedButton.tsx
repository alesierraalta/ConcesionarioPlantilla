'use client'

import { forwardRef, ButtonHTMLAttributes, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2, Sparkles } from 'lucide-react'

export interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost' | 'neon' | 'glass'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  ripple?: boolean
  glow?: boolean
  magnetic?: boolean
  particles?: boolean
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl',
  outline: 'bg-transparent text-primary-700 border-2 border-primary-700 hover:bg-primary-700 hover:text-white',
  white: 'bg-white text-gray-900 shadow-md hover:shadow-lg',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  neon: 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-2xl neon-blue',
  glass: 'glass-button text-white backdrop-blur-md'
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
  xl: 'px-10 py-5 text-xl rounded-3xl'
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    disabled,
    children,
    icon,
    fullWidth = false,
    ripple = true,
    glow = false,
    magnetic = false,
    particles = false,
    onClick,
    ...props 
  }, ref) => {
    const [isClicked, setIsClicked] = useState(false)
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const isDisabled = disabled || loading

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled || !onClick) return

      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 150)

      // Create ripple effect
      if (ripple) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const newRipple = { id: Date.now(), x, y }
        
        setRipples(prev => [...prev, newRipple])
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id))
        }, 600)
      }

      onClick(e)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (magnetic) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        setMousePosition({ x: x * 0.1, y: y * 0.1 })
      }
    }

    const handleMouseLeave = () => {
      if (magnetic) {
        setMousePosition({ x: 0, y: 0 })
      }
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-semibold border-none cursor-pointer overflow-hidden transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2',
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && 'w-full',
          isDisabled && 'opacity-50 cursor-not-allowed',
          glow && 'animate-pulse-glow',
          className
        )}
        disabled={isDisabled}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          scale: isDisabled ? 1 : 1.01,
          y: isDisabled ? 0 : -1,
        }}
        whileTap={{ 
          scale: isDisabled ? 1 : 0.99,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 17,
        }}
      >
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 3,
            ease: 'linear'
          }}
        />

        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute bg-white/30 rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ 
                width: 100, 
                height: 100, 
                opacity: 0,
                x: -50,
                y: -50
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Particle effects */}
        {particles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Loading spinner */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon with animation */}
        <AnimatePresence>
          {!loading && icon && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text content */}
        <motion.span
          className="relative z-10"
          animate={{
            scale: isClicked ? [1, 0.95, 1] : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.span>

        {/* Sparkle effect on hover */}
        <motion.div
          className="absolute top-1 right-1 text-yellow-300"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileHover={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 360,
            transition: { duration: 0.3 }
          }}
        >
          <Sparkles className="w-3 h-3" />
        </motion.div>

        {/* Glow effect */}
        {glow && (
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary-400 to-orange-400 opacity-75 blur-lg animate-pulse" />
        )}
      </motion.button>
    )
  }
)

EnhancedButton.displayName = 'EnhancedButton'

export { EnhancedButton }