'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Users, Gift, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'

interface ProbabilityCalculatorProps {
  className?: string
}

export function ProbabilityCalculator({ className = '' }: ProbabilityCalculatorProps) {
  const [entries, setEntries] = useState(1)
  const [totalParticipants, setTotalParticipants] = useState(100)
  const [probability, setProbability] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  // Simulated data for demonstration
  const currentPrize = "Honda Civic 2024"
  const prizeValue = "$28,000"
  const timeLeft = "4h 23m"

  const calculateProbability = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const prob = (entries / totalParticipants) * 100
      setProbability(Math.min(prob, 100))
      setIsCalculating(false)
    }, 800)
  }

  useEffect(() => {
    calculateProbability()
  }, [entries, totalParticipants])

  const getProbabilityColor = (prob: number) => {
    if (prob >= 10) return 'text-success-600'
    if (prob >= 5) return 'text-orange-600'
    return 'text-primary-600'
  }

  const getProbabilityMessage = (prob: number) => {
    if (prob >= 20) return "¡Excelentes probabilidades!"
    if (prob >= 10) return "¡Muy buenas posibilidades!"
    if (prob >= 5) return "Buenas oportunidades"
    if (prob >= 1) return "Posibilidades reales"
    return "Cada entrada cuenta"
  }

  const getMultiplierTips = () => [
    { action: "Referir 3 amigos", entries: 5, icon: Users },
    { action: "Visita al concesionario", entries: 2, icon: Gift },
    { action: "Compartir en redes", entries: 1, icon: TrendingUp },
    { action: "Prueba de manejo", entries: 3, icon: Zap }
  ]

  return (
    <section className={`section bg-white relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-500 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-500 rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-6">Calculadora de Probabilidades</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre tus posibilidades reales de ganar y cómo mejorarlas
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-primary-600" />
                    </div>
                    Calculadora Interactiva
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Prize Display */}
                  <div className="p-4 bg-gradient-to-r from-primary-50 to-orange-50 rounded-xl border border-primary-200">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🏆</div>
                      <h3 className="font-semibold text-gray-900 mb-1">{currentPrize}</h3>
                      <div className="text-2xl font-black text-orange-600 mb-2">{prizeValue}</div>
                      <div className="text-sm text-gray-600">Sorteo en {timeLeft}</div>
                    </div>
                  </div>

                  {/* Input Controls */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mis Entradas
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setEntries(Math.max(1, entries - 1))}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600 transition-colors"
                        >
                          −
                        </button>
                        <div className="flex-1 text-center">
                          <div className="text-3xl font-black text-primary-600">{entries}</div>
                          <div className="text-xs text-gray-500">entradas</div>
                        </div>
                        <button
                          onClick={() => setEntries(entries + 1)}
                          className="w-10 h-10 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center font-bold text-primary-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Participantes Estimados
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setTotalParticipants(Math.max(10, totalParticipants - 10))}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600 transition-colors"
                        >
                          −
                        </button>
                        <div className="flex-1 text-center">
                          <div className="text-2xl font-bold text-gray-700">{totalParticipants}</div>
                          <div className="text-xs text-gray-500">participantes</div>
                        </div>
                        <button
                          onClick={() => setTotalParticipants(totalParticipants + 10)}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Probability Display */}
                  <motion.div
                    key={probability}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 text-center"
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-gray-600">Calculando...</span>
                      </div>
                    ) : (
                      <>
                        <div className={`text-4xl font-black mb-2 ${getProbabilityColor(probability)}`}>
                          {probability.toFixed(2)}%
                        </div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">
                          Probabilidad de Ganar
                        </div>
                        <div className={`text-sm ${getProbabilityColor(probability)}`}>
                          {getProbabilityMessage(probability)}
                        </div>
                      </>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Multiplier Tips */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    Multiplica tus Oportunidades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 mb-6">
                    Realiza estas acciones para obtener más entradas y aumentar tus probabilidades:
                  </p>

                  {getMultiplierTips().map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary-200 transition-colors cursor-pointer group"
                      onClick={() => setEntries(entries + tip.entries)}
                    >
                      <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-100 rounded-xl flex items-center justify-center transition-colors">
                        <tip.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                          {tip.action}
                        </h4>
                        <p className="text-sm text-gray-600">
                          +{tip.entries} entrada{tip.entries > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-2xl font-black text-success-600">
                        +{tip.entries}
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-6 p-4 bg-gradient-to-r from-success-50 to-primary-50 rounded-xl border border-success-200"
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-success-700 mb-1">
                        Potencial Máximo
                      </div>
                      <div className="text-3xl font-black text-success-600 mb-2">
                        {((entries + 11) / totalParticipants * 100).toFixed(2)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Con todas las acciones completadas
                      </div>
                    </div>
                  </motion.div>

                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    className="mt-6"
                  >
                    Comenzar a Multiplicar
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { label: 'Probabilidad Promedio', value: '2.5%', color: 'text-gray-600' },
              { label: 'Mejor Probabilidad', value: '45%', color: 'text-success-600' },
              { label: 'Entradas Promedio', value: '3.2', color: 'text-primary-600' },
              { label: 'Ganadores Diarios', value: '1-3', color: 'text-orange-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-xl shadow-soft">
                <div className={`text-2xl font-black mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}