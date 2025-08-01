'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Users, 
  Gift, 
  Shield, 
  FileText, 
  Lock, 
  Scale,
  Car,
  Wrench,
  CreditCard,
  Star,
  Trophy,
  UserPlus,
  Calendar,
  Share2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react'

// Components
import { Header } from '@/components/Header'
import { NewHero } from '@/components/NewHero'
import { WinnersFeed } from '@/components/WinnersFeed'
import { RegistrationModal } from '@/components/RegistrationModal'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ScrollReveal, StaggerContainer, StaggerItem, ScrollProgress, Magnetic } from '@/components/ScrollAnimations'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { ProbabilityCalculator } from '@/components/ProbabilityCalculator'
import { PrizeCalendar } from '@/components/PrizeCalendar'

import { SocialMediaSection } from '@/components/SocialMediaSection'


export default function HomePage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const handleOpenRegistration = () => {
    setIsRegistrationOpen(true)
  }

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false)
  }

  return (
    <main className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Header */}
      <Header onOpenRegistration={handleOpenRegistration} />

      {/* Hero Section */}
      <NewHero onOpenRegistration={handleOpenRegistration} />

      {/* Enhanced How It Works Section */}
      <section id="como-funciona" className="section bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <ScrollReveal direction="up" className="text-center mb-16">
            <motion.h2 
              className="heading-lg mb-6"
              whileInView={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #1e40af, #f59e0b, #1e40af)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ¿Cómo Funciona?
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tres pasos simples para empezar a ganar premios increíbles
            </p>
          </ScrollReveal>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-12" staggerDelay={0.2}>
            {[
              {
                step: 1,
                title: 'Regístrate Gratis',
                description: 'Deja tu contacto en menos de 30 segundos. Sin complicaciones, sin costos ocultos.',
                icon: UserPlus
              },
              {
                step: 2,
                title: 'Obtén tu Entrada',
                description: 'Cada visita, prueba de manejo o referido te da una entrada automática al sorteo diario.',
                icon: Gift
              },
              {
                step: 3,
                title: '¡Gana Premios!',
                description: 'Mira el sorteo en vivo cada día a las 8 PM o recibe notificación instantánea si ganas.',
                icon: Trophy
              }
            ].map((step, index) => (
              <StaggerItem key={step.step} className="text-center relative">
                <div className="group">
                  <div className="text-center">
                    {/* Static Step Number */}
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-orange-500 rounded-3xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-8 shadow-lg">
                      <span>{step.step}</span>
                    </div>
                    
                    {/* Static Arrow */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 -right-8 text-orange-400 opacity-70">
                        <ArrowRight className="w-8 h-8" />
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      {/* Static Icon */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary-100 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                        <step.icon className="w-12 h-12 text-primary-600 mx-auto relative z-10" />
                      </div>
                      
                      <h3 className="heading-sm group-hover:text-primary-700 transition-colors">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Winners Feed Section */}
      <section id="ganadores" className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-6">Ganadores Recientes</h2>
            <p className="text-xl text-gray-600">
              Personas reales ganando premios reales cada día
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <WinnersFeed />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-success-600" />
                    </div>
                    <div>
                      <h3 className="heading-sm">100% Verificado</h3>
                      <p className="text-gray-600 text-sm">Todos los ganadores son reales</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-primary-50 rounded-xl">
                      <div className="text-2xl font-black text-primary-700">500+</div>
                      <div className="text-sm text-gray-600">Premios Entregados</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-black text-orange-600">24h</div>
                      <div className="text-sm text-gray-600">Tiempo de Contacto</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleOpenRegistration}
                    fullWidth
                    size="lg"
                  >
                    ¡Quiero Ser el Próximo!
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Probability Calculator Section */}
      <ProbabilityCalculator />

      {/* Prize Calendar Section */}
      <PrizeCalendar />

      {/* Transparency Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">100% Transparente</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Así garantizamos que todo sea justo, legal y completamente transparente
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Sorteos EN VIVO por Instagram',
                description: 'Cada sorteo se transmite EN VIVO por Instagram para garantizar total transparencia. ¡Síguenos @autopremium!'
              },
              {
                icon: FileText,
                title: 'Reglas Claras',
                description: 'Sin letra chica. Todas las reglas están disponibles públicamente y son fáciles de entender.'
              },
              {
                icon: Lock,
                title: 'Datos Protegidos',
                description: 'Tu información personal está protegida según las leyes de privacidad más estrictas.'
              },
              {
                icon: Scale,
                title: 'Legalmente Válido',
                description: 'Todos nuestros sorteos cumplen con la legislación local y están debidamente registrados.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="heading-sm mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mystery Prize Section */}
      <section id="premios" className="section gradient-blue text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-6">Premio Secreto de Mañana</h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Regístrate hoy para descubrir qué increíble sorpresa te espera
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center border border-white/20">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-6xl md:text-8xl mb-6"
              >
                🎁
              </motion.div>
              
              <h3 className="heading-md mb-6">¿Será tu día de suerte?</h3>
              <p className="text-lg text-white/90 mb-8">
                El premio de mañana podría ser desde accesorios premium 
                hasta el vehículo de tus sueños. ¡Solo hay una forma de saberlo!
              </p>
              
              <Button
                variant="white"
                size="lg"
                onClick={handleOpenRegistration}
                icon={<Gift className="w-5 h-5" />}
                className="shadow-large"
              >
                Descubrir Premio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Multipliers Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">Multiplica tus Oportunidades</h2>
            <p className="text-xl text-gray-600">
              Más participación = más posibilidades de ganar
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: UserPlus,
                title: 'Refiere Amigos',
                description: 'Por cada amigo que refiera, obtienes 2 entradas extra para el sorteo de esa semana.',
                progress: 60,
                status: 'Progreso: 3 de 5 referidos'
              },
              {
                icon: Calendar,
                title: 'Visitas Diarias',
                description: 'Visita nuestro concesionario 5 días seguidos y gana una entrada premium con doble probabilidad.',
                progress: 80,
                status: 'Racha actual: 4 días'
              },
              {
                icon: Share2,
                title: 'Comparte en Redes',
                description: 'Comparte nuestros sorteos en tus redes sociales y obtén entradas adicionales automáticamente.',
                progress: 40,
                status: '2 compartidos esta semana'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-t-4 border-orange-500">
                  <CardContent className="space-y-6">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    
                    <div>
                      <h3 className="heading-sm mb-3">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-semibold text-primary-600">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-success-500 to-orange-500 h-2 rounded-full"
                        />
                      </div>
                      <p className="text-sm text-gray-500">{item.status}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealership Features Section */}
      <section id="vehiculos" className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">¿Por Qué Elegirnos?</h2>
            <p className="text-xl text-gray-600">
              Más que un concesionario, somos tu socio en movilidad
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: '15 Años de Experiencia',
                description: 'Líderes en el mercado local con miles de clientes satisfechos.'
              },
              {
                icon: Car,
                title: '500+ Vehículos',
                description: 'La mayor variedad de carros y motos nuevos y seminuevos.'
              },
              {
                icon: Wrench,
                title: 'Servicio Integral',
                description: 'Taller especializado, repuestos originales y garantía extendida.'
              },
              {
                icon: CreditCard,
                title: 'Financiamiento Fácil',
                description: 'Créditos desde 0% de interés con aprobación inmediata.'
              },
              {
                icon: Gift,
                title: 'Rifas Exclusivas',
                description: 'El único concesionario que te premia por elegirnos.'
              },
              {
                icon: Star,
                title: '5 Estrellas',
                description: 'Calificación promedio de nuestros clientes en todas las plataformas.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="heading-sm mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* Final CTA Section */}
      <section className="section gradient-orange text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569-13.431-30-30-30v30h30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">¡Tu Premio te Está Esperando!</h2>
            <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto">
              Únete a los miles de personas que ya están participando. 
              El próximo ganador podrías ser tú.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                variant="white"
                size="xl"
                onClick={handleOpenRegistration}
                icon={<Gift className="w-6 h-6" />}
                className="shadow-large"
              >
                Participar en la Rifa de Hoy
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                icon={<Users className="w-6 h-6" />}
              >
                Ver Ganador de Hoy
              </Button>
            </div>
            
            <p className="text-orange-100 text-sm">
              También puedes suscribirte para recibir alertas de nuevos sorteos y rifas especiales
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container-custom py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-orange-500 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black">AutoPremium</span>
              </div>
              <p className="text-gray-400">
                El concesionario que te premia por elegirnos. 
                Vehículos de calidad y premios increíbles.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Av. Principal 123, Ciudad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span>info@autopremium.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-orange-500">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                {[
                  '¿Cómo Funciona?',
                  'Ganadores',
                  'Vehículos',
                  'Contacto',
                  'Sobre Nosotros'
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-orange-500">Legal</h3>
              <ul className="space-y-3">
                {[
                  'Términos y Condiciones',
                  'Política de Privacidad',
                  'Reglas de Sorteos',
                  'Juego Responsable',
                  'Contacto Legal'
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-orange-500">Síguenos</h3>
              <p className="text-gray-400 mb-6">
                Mantente al día con nuestros sorteos y promociones especiales.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Youtube, href: '#' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 AutoPremium. Todos los derechos reservados. 
              Sorteos autorizados bajo licencia oficial.
            </p>
          </div>
        </div>
      </footer>

            {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegistrationOpen} 
        onClose={handleCloseRegistration} 
      />




    </main>
  )
}