'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

interface Testimonial {
  id: number
  name: string
  location: string
  prize: string
  amount: string
  rating: number
  text: string
  image: string
  videoThumbnail?: string
  date: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    location: "Madrid, España",
    prize: "Honda Civic 2024",
    amount: "$28,000",
    rating: 5,
    text: "¡No podía creerlo cuando me llamaron! Pensé que era una broma, pero era real. El proceso fue súper transparente y recibí mi carro en perfectas condiciones. ¡Gracias AutoPremium!",
    image: "/testimonials/maria.jpg",
    videoThumbnail: "/testimonials/maria-video.jpg",
    date: "Hace 2 semanas",
    verified: true
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    location: "Barcelona, España",
    prize: "iPhone 15 Pro Max",
    amount: "$1,200",
    rating: 5,
    text: "Participé por curiosidad y terminé ganando el iPhone que tanto quería. La atención al cliente es excelente y todo el proceso muy profesional.",
    image: "/testimonials/carlos.jpg",
    date: "Hace 1 semana",
    verified: true
  },
  {
    id: 3,
    name: "Ana Martínez",
    location: "Valencia, España",
    prize: "Yamaha MT-07",
    amount: "$8,500",
    rating: 5,
    text: "Como motociclista, siempre soñé con una Yamaha MT-07. Cuando gané en AutoPremium, no solo recibí la moto sino también el equipo completo de seguridad. ¡Increíble experiencia!",
    image: "/testimonials/ana.jpg",
    videoThumbnail: "/testimonials/ana-video.jpg",
    date: "Hace 3 días",
    verified: true
  }
]

interface TestimonialsSectionProps {
  className?: string
}

export function TestimonialsSection({ className = '' }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const openVideoModal = (videoThumbnail: string) => {
    setSelectedVideo(videoThumbnail)
    setIsVideoModalOpen(true)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className={`section bg-gradient-to-br from-gray-50 to-white relative overflow-hidden ${className}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">Lo Que Dicen Nuestros Ganadores</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Historias reales de personas que cambiaron su vida con AutoPremium
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Testimonial Content */}
              <Card className="p-8 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary-200">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {currentTestimonial.rating}.0
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">
                        {currentTestimonial.name}
                      </h4>
                      {currentTestimonial.verified && (
                        <div className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{currentTestimonial.location}</p>
                    <p className="text-gray-500 text-xs">{currentTestimonial.date}</p>
                  </div>
                </div>
              </Card>

              {/* Prize Display */}
              <div className="relative">
                <Card className="p-8 bg-gradient-to-br from-primary-50 to-orange-50 border-2 border-primary-200">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="text-6xl mb-6"
                    >
                      🏆
                    </motion.div>
                    
                    <h3 className="heading-md text-primary-700 mb-2">
                      {currentTestimonial.prize}
                    </h3>
                    
                    <div className="text-3xl font-black text-orange-600 mb-4">
                      {currentTestimonial.amount}
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Ganado por {currentTestimonial.name}
                    </p>

                    {/* Video Thumbnail */}
                    {currentTestimonial.videoThumbnail && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative cursor-pointer rounded-xl overflow-hidden mb-4"
                        onClick={() => openVideoModal(currentTestimonial.videoThumbnail!)}
                      >
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-primary-600 ml-1" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          Ver testimonio
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Anterior
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              icon={<ChevronRight className="w-4 h-4" />}
            >
              Siguiente
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: '98%', label: 'Satisfacción' },
            { number: '24h', label: 'Tiempo de Entrega' },
            { number: '500+', label: 'Ganadores Felices' },
            { number: '100%', label: 'Premios Reales' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="text-center p-6 bg-white rounded-2xl shadow-soft"
            >
              <div className="text-3xl font-black text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p>Video testimonio de {testimonials[currentIndex].name}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    (Demo - En producción se mostraría el video real)
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">
                  Testimonio de {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-600">
                  Ganador de {testimonials[currentIndex].prize}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}