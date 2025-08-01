'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Gift, ArrowRight, Users, Award, Instagram, Play, Clock, Star } from 'lucide-react'
import { Button } from './ui/Button'
import { CountdownTimer } from './CountdownTimer'
import { ParticleBackground } from './ParticleBackground'
import { ScrollReveal, FloatingElement, Magnetic } from './ScrollAnimations'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

interface NewHeroProps {
  onOpenRegistration: () => void
}

export function NewHero({ onOpenRegistration }: NewHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const handleScrollToHowItWorks = () => {
    const element = document.getElementById('como-funciona')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 dark:from-black dark:via-primary-950 dark:to-black overflow-hidden pt-24 pb-16">
      {/* Particle Background */}
      <ParticleBackground particleCount={60} className="opacity-20" />

      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-orange-500/20 to-purple-500/20" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 2) * 30}%`,
            }}
          >
            <FloatingElement amplitude={10} duration={3 + i * 0.5}>
              <Star className="w-4 h-4 text-yellow-400 opacity-40" />
            </FloatingElement>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Instagram Live Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full text-white font-bold shadow-2xl mb-8 relative"
          >
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <Instagram className="w-5 h-5" />
            <span>SORTEOS EN VIVO por Instagram</span>
            <Play className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Gana Premios
              </span>
              <span className="block text-white">
                Increíbles
              </span>
              <span className="block text-gray-300 text-3xl md:text-4xl lg:text-5xl font-bold">
                Todos los Días
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Participa en nuestros sorteos diarios de vehículos, tecnología y premios en efectivo. 
            <strong className="text-orange-400"> 100% transparente</strong> y transmitido en vivo por Instagram.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 mb-12 text-gray-300"
          >
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-orange-400" />
              <span className="text-2xl font-bold text-white">25K+</span>
              <span>Participantes</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-green-400" />
              <span className="text-2xl font-bold text-white">$127K</span>
              <span>En Premios</span>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="w-6 h-6 text-purple-400" />
              <span className="text-2xl font-bold text-white">127</span>
              <span>Sorteos Realizados</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={onOpenRegistration}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-12 py-4 text-lg shadow-2xl border-0"
                icon={<Gift className="w-6 h-6" />}
              >
                Participar Gratis Ahora
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleScrollToHowItWorks}
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 font-bold px-12 py-4 text-lg"
                icon={<ArrowRight className="w-6 h-6" />}
              >
                ¿Cómo Funciona?
              </Button>
            </motion.div>
          </motion.div>

          {/* Countdown Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  🏆 Premio de Hoy: iPhone 15 Pro
                </h3>
                <p className="text-orange-400 text-xl font-bold">
                  Valor: $1,200
                </p>
              </div>
              
              <CountdownTimer className="mb-6" />
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <span>Sorteo a las 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-purple-400" />
                  <span>Transmisión en vivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span>47 lugares restantes</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12"
          >
            <motion.a
              href="https://instagram.com/autopremium"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-6 h-6" />
              <span>Seguir @autopremium para Ver Sorteos EN VIVO</span>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}