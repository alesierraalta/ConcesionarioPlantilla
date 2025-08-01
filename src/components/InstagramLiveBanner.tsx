'use client'

import { motion } from 'framer-motion'
import { Instagram, Users, Clock, Play } from 'lucide-react'
import { Button } from './ui/Button'

interface InstagramLiveBannerProps {
  className?: string
}

export function InstagramLiveBanner({ className = '' }: InstagramLiveBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-pink-300 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left Side - Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
              <span className="text-red-200 text-sm font-semibold uppercase tracking-wider">
                EN VIVO AHORA
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black mb-3">
              🔴 Sorteos Transmitidos en Vivo
            </h3>
            
            <p className="text-lg text-purple-100 mb-4 leading-relaxed">
              Todos nuestros sorteos se transmiten <strong>EN VIVO por Instagram</strong> para garantizar 
              total transparencia. ¡No te pierdas ni un momento de la emoción!
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-purple-200 mb-6">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>+25K espectadores</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Todos los días 8:00 PM</span>
              </div>
              <div className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                <span>100% Transparente</span>
              </div>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30"
            >
              <Instagram className="w-10 h-10" />
            </motion.div>

            <motion.a
              href="https://instagram.com/autopremium"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3 shadow-lg"
                icon={<Instagram className="w-5 h-5" />}
              >
                Seguir @autopremium
              </Button>
            </motion.a>

            <p className="text-xs text-purple-200 text-center max-w-40">
              Activa las notificaciones para no perderte ningún sorteo
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="border-t border-white/20 pt-6 mt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-white mb-1">127</div>
              <div className="text-xs text-purple-200 uppercase tracking-wide">Sorteos Realizados</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white mb-1">$127K</div>
              <div className="text-xs text-purple-200 uppercase tracking-wide">En Premios Entregados</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white mb-1">0</div>
              <div className="text-xs text-purple-200 uppercase tracking-wide">Quejas o Reclamos</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}