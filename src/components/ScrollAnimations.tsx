'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}

export function ScrollReveal({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0,
  duration = 0.6 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 }
      case 'down': return { y: -50, x: 0 }
      case 'left': return { y: 0, x: 50 }
      case 'right': return { y: 0, x: -50 }
      default: return { y: 50, x: 0 }
    }
  }

  const initial = getInitialPosition()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        x: initial.x, 
        y: initial.y 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration, 
        delay,
        ease: 'easeOut'
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: smoothY }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        },
        visible: { 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: 'easeOut'
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-orange-500 transform-gpu z-50 ${className}`}
      style={{ scaleX, transformOrigin: '0%' }}
    />
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}

export function FloatingElement({ 
  children, 
  className = '', 
  amplitude = 10,
  duration = 3 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

interface RotatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
  direction?: 'clockwise' | 'counterclockwise'
}

export function RotatingElement({ 
  children, 
  className = '', 
  duration = 10,
  direction = 'clockwise' 
}: RotatingElementProps) {
  const rotation = direction === 'clockwise' ? 360 : -360

  return (
    <motion.div
      className={className}
      animate={{ rotate: rotation }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {children}
    </motion.div>
  )
}

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}