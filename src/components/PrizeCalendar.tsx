'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Gift, Clock, Star, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'

interface Prize {
  id: string
  name: string
  value: string
  image: string
  category: 'vehicle' | 'tech' | 'cash' | 'accessory'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  status: 'completed' | 'active' | 'upcoming' | 'locked'
  winner?: string
}

interface CalendarDay {
  date: number
  prize: Prize | null
  isToday: boolean
  isPast: boolean
  isFuture: boolean
}

const prizes: Prize[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    value: '$1,200',
    image: '📱',
    category: 'tech',
    rarity: 'epic',
    status: 'completed',
    winner: 'María G.'
  },
  {
    id: '2',
    name: 'Honda Civic',
    value: '$28,000',
    image: '🚗',
    category: 'vehicle',
    rarity: 'legendary',
    status: 'active'
  },
  {
    id: '3',
    name: 'MacBook Pro',
    value: '$2,500',
    image: '💻',
    category: 'tech',
    rarity: 'epic',
    status: 'upcoming'
  },
  {
    id: '4',
    name: 'Cash Prize',
    value: '$500',
    image: '💰',
    category: 'cash',
    rarity: 'rare',
    status: 'upcoming'
  }
]

const getRarityColor = (rarity: Prize['rarity']) => {
  switch (rarity) {
    case 'legendary': return 'from-yellow-400 to-orange-500'
    case 'epic': return 'from-purple-400 to-pink-500'
    case 'rare': return 'from-blue-400 to-cyan-500'
    default: return 'from-gray-400 to-gray-500'
  }
}

const getRarityBorder = (rarity: Prize['rarity']) => {
  switch (rarity) {
    case 'legendary': return 'border-yellow-400 shadow-yellow-400/50'
    case 'epic': return 'border-purple-400 shadow-purple-400/50'
    case 'rare': return 'border-blue-400 shadow-blue-400/50'
    default: return 'border-gray-400 shadow-gray-400/50'
  }
}

interface PrizeCalendarProps {
  className?: string
}

export function PrizeCalendar({ className = '' }: PrizeCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null)

  const today = new Date()
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const generateCalendarDays = (): CalendarDay[] => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: CalendarDay[] = []

    // Add empty days for the start of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        date: 0,
        prize: null,
        isToday: false,
        isPast: false,
        isFuture: false
      })
    }

    // Add days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(currentYear, currentMonth, date)
      const isToday = currentDate.toDateString() === today.toDateString()
      const isPast = currentDate < today && !isToday
      const isFuture = currentDate > today

      // Assign prizes to specific days (demo logic)
      let prize: Prize | null = null
      if (date <= prizes.length) {
        prize = { ...prizes[date - 1] }
        if (isPast && prize.status === 'upcoming') {
          prize.status = 'completed'
          prize.winner = ['Ana M.', 'Carlos R.', 'Luis F.', 'Sofia H.'][Math.floor(Math.random() * 4)]
        } else if (isToday && prize.status === 'upcoming') {
          prize.status = 'active'
        } else if (isFuture && prize.status === 'active') {
          prize.status = 'upcoming'
        }
      } else if (date % 3 === 0) {
        // Add some random prizes for demo
        const randomPrizes = [
          { name: 'AirPods Pro', value: '$250', image: '🎧', category: 'tech' as const, rarity: 'rare' as const },
          { name: 'Gaming Chair', value: '$400', image: '🪑', category: 'accessory' as const, rarity: 'common' as const },
          { name: 'Smart Watch', value: '$300', image: '⌚', category: 'tech' as const, rarity: 'rare' as const }
        ]
        const randomPrize = randomPrizes[date % randomPrizes.length]
        prize = {
          id: `random-${date}`,
          ...randomPrize,
          status: isFuture ? 'upcoming' : isPast ? 'completed' : 'active',
          winner: isPast ? 'Ganador Anónimo' : undefined
        }
      }

      days.push({
        date,
        prize,
        isToday,
        isPast,
        isFuture
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  return (
    <section className={`section bg-gradient-to-br from-gray-50 to-white relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-48 h-48 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-6">Calendario de Premios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre qué increíbles premios te esperan cada día del mes
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary-50 to-orange-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  {monthNames[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {/* Day Headers */}
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays.map((day, index) => (
                  <motion.div
                    key={index}
                    className={`aspect-square p-1 ${day.date === 0 ? 'invisible' : ''}`}
                    whileHover={day.prize ? { scale: 1.02 } : {}}
                    whileTap={day.prize ? { scale: 0.95 } : {}}
                  >
                    {day.date > 0 && (
                      <div
                        className={`w-full h-full rounded-lg border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                          day.isToday
                            ? 'border-orange-400 bg-orange-50 shadow-lg'
                            : day.prize
                            ? `${getRarityBorder(day.prize.rarity)} bg-white shadow-lg hover:shadow-xl`
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => day.prize && setSelectedPrize(day.prize)}
                      >
                        {/* Date Number */}
                        <div className={`absolute top-1 left-1 text-xs font-bold ${
                          day.isToday ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {day.date}
                        </div>

                        {/* Prize Display */}
                        {day.prize && (
                          <div className="flex flex-col items-center justify-center h-full pt-4">
                            <div className="text-2xl mb-1">{day.prize.image}</div>
                            <div className="text-xs text-center px-1">
                              <div className="font-semibold text-gray-800 truncate">
                                {day.prize.name}
                              </div>
                              <div className="text-gray-600">{day.prize.value}</div>
                            </div>

                            {/* Status Indicators */}
                            <div className="absolute top-1 right-1">
                              {day.prize.status === 'completed' && (
                                <div className="w-3 h-3 bg-success-500 rounded-full" />
                              )}
                              {day.prize.status === 'active' && (
                                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                              )}
                              {day.prize.status === 'upcoming' && (
                                <Clock className="w-3 h-3 text-gray-400" />
                              )}
                              {day.prize.status === 'locked' && (
                                <Lock className="w-3 h-3 text-gray-400" />
                              )}
                            </div>
                          </div>
                        )}

                        {/* Rarity Glow Effect */}
                        {day.prize && day.prize.rarity !== 'common' && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(day.prize.rarity)} opacity-10 rounded-lg`} />
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success-500 rounded-full" />
                  <span className="text-gray-600">Completado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-gray-600">Activo Hoy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">Próximo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-yellow-400 rounded-full" />
                  <span className="text-gray-600">Legendario</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-purple-400 rounded-full" />
                  <span className="text-gray-600">Épico</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prize Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {[
              { label: 'Premios Este Mes', value: '31', icon: Gift, color: 'text-primary-600' },
              { label: 'Valor Total', value: '$125K', icon: Star, color: 'text-orange-600' },
              { label: 'Ganadores', value: '28', icon: '🏆', color: 'text-success-600' },
              { label: 'Días Restantes', value: '3', icon: Clock, color: 'text-gray-600' }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-4">
                <div className="flex items-center justify-center mb-2">
                  {typeof stat.icon === 'string' ? (
                    <div className="text-2xl">{stat.icon}</div>
                  ) : (
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  )}
                </div>
                <div className={`text-2xl font-black mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Prize Detail Modal */}
      <AnimatePresence>
        {selectedPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPrize(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 bg-gradient-to-br ${getRarityColor(selectedPrize.rarity)}`}>
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">{selectedPrize.image}</div>
                  <h3 className="text-2xl font-bold mb-2">{selectedPrize.name}</h3>
                  <div className="text-3xl font-black">{selectedPrize.value}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-semibold capitalize">{selectedPrize.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rareza:</span>
                    <span className={`font-semibold capitalize ${
                      selectedPrize.rarity === 'legendary' ? 'text-yellow-600' :
                      selectedPrize.rarity === 'epic' ? 'text-purple-600' :
                      selectedPrize.rarity === 'rare' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {selectedPrize.rarity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`font-semibold capitalize ${
                      selectedPrize.status === 'completed' ? 'text-success-600' :
                      selectedPrize.status === 'active' ? 'text-orange-600' :
                      'text-gray-600'
                    }`}>
                      {selectedPrize.status === 'completed' ? 'Completado' :
                       selectedPrize.status === 'active' ? 'Activo' : 'Próximo'}
                    </span>
                  </div>
                  {selectedPrize.winner && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ganador:</span>
                      <span className="font-semibold text-success-600">{selectedPrize.winner}</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  className="mt-6"
                  onClick={() => setSelectedPrize(null)}
                >
                  {selectedPrize.status === 'active' ? 'Participar Ahora' : 'Cerrar'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}