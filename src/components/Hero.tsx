'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Gift, ArrowRight, Sparkles, Users, Award, Star, Zap, Instagram } from 'lucide-react'
import { Button } from './ui/Button'
import { CountdownTimer } from './CountdownTimer'
import { ParticleBackground } from './ParticleBackground'
import { ScrollReveal, FloatingElement, Magnetic } from './ScrollAnimations'
import { InstagramLiveBanner } from './InstagramLiveBanner'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

interface HeroProps {
  onOpenRegistration: () => void
}

export function Hero({ onOpenRegistration }: HeroProps) {
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
    <section ref={containerRef} className="relative min-h-screen flex items-center gradient-primary overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground particleCount={80} className="opacity-30" />

      {/* Static Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-orange-500/10 to-green-500/10" />
      </motion.div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <FloatingElement
              amplitude={15 + (i % 3) * 5}
              duration={2 + (i % 4)}
            >
            <motion.div
              className={cn(
                "w-3 h-3 rounded-full opacity-30",
                i % 4 === 0 && "bg-orange-400",
                i % 4 === 1 && "bg-primary-400", 
                i % 4 === 2 && "bg-success-400",
                i % 4 === 3 && "bg-purple-400"
              )}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
            </FloatingElement>
          </div>
        ))}
        
        {/* Sparkle Effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400 opacity-60"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 2) * 30}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Star className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            style={{ y: textY }}
            className="text-center lg:text-left"
          >
            {/* Enhanced Badge */}
            <Magnetic strength={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300 relative"
              >
                <Instagram className="w-5 h-5" />
                <span>🔴 SORTEOS EN VIVO por Instagram</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </motion.div>
            </Magnetic>

            {/* Enhanced Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, type: 'spring', bounce: 0.3 }}
              className="heading-xl mb-8"
            >
              <motion.span 
                className="text-gradient-primary block"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Gana premios
              </motion.span>
              <motion.span 
                className="text-gradient-rainbow block"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                todos los días
              </motion.span>
              <motion.span 
                className="text-gray-900 block"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                con nosotros
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Rifas diarias de vehículos, accesorios y sorpresas increíbles. 
              Participa en segundos y multiplica tus oportunidades de ganar.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">15,000+</span>
                <span className="text-sm">Participantes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Award className="w-5 h-5 text-orange-500" />
                <span className="font-semibold">500+</span>
                <span className="text-sm">Premios Entregados</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Gift className="w-5 h-5 text-success-500" />
                <span className="font-semibold">$50K+</span>
                <span className="text-sm">En Premios</span>
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                  <Button
                    size="lg"
                    onClick={onOpenRegistration}
                    icon={<Gift className="w-5 h-5" />}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Entrar a la Rifa de Hoy
                  </Button>
              </motion.div>
              
              <Magnetic strength={0.1}>
                <motion.div
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleScrollToHowItWorks}
                    icon={
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    }
                    className="glass-button border-2 border-white/30 backdrop-blur-md"
                  >
                    ¿Cómo Funciona?
                  </Button>
                </motion.div>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Column - Countdown & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, type: 'spring', bounce: 0.2 }}
            className="space-y-8"
          >
            {/* Enhanced Countdown Card */}
            <motion.div 
              className="glass-card rounded-3xl p-8 shadow-2xl border-2 border-orange-400 relative overflow-hidden hover:border-orange-500 transition-colors duration-300"
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-orange-500/10" />
              </div>

              {/* Enhanced Decorative elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>

              {/* Static decorations */}
              <div className="absolute top-6 left-6 text-yellow-400 opacity-60">
                <Star className="w-4 h-4" />
              </div>
              <div className="absolute bottom-6 right-16 text-yellow-400 opacity-40">
                <Star className="w-3 h-3" />
              </div>

              <div className="text-center">
                <motion.h3
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="heading-sm text-orange-600 mb-2"
                >
                  Próximo Sorteo
                </motion.h3>
                
                <CountdownTimer className="mb-6" />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-gray-600">
                    ¡Solo quedan <strong className="text-orange-600">47 entradas</strong> disponibles!
                  </p>
                  
                  <Button
                    variant="secondary"
                    onClick={onOpenRegistration}
                    className="w-full hover:bg-orange-600 transition-colors duration-300"
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Participar Ahora
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Today's Prize Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-large"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">Premio de Hoy</h4>
                  <p className="text-primary-100 text-sm">iPhone 15 Pro + Accesorios</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black">$1,200</div>
                  <div className="text-primary-200 text-xs">Valor aprox.</div>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            {/* Instagram Live Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <InstagramLiveBanner />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}