'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Youtube, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollAnimations'

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  followers: string
  color: string
  description: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    icon: <Facebook className="w-6 h-6" />,
    url: 'https://facebook.com/autopremium',
    followers: '25.2K',
    color: 'hover:bg-blue-600 hover:text-white',
    description: 'Síguenos para ofertas exclusivas y noticias'
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    url: 'https://instagram.com/autopremium',
    followers: '18.7K',
    color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white',
    description: 'Fotos de nuestros vehículos y ganadores'
  },
  {
    name: 'Twitter',
    icon: <Twitter className="w-6 h-6" />,
    url: 'https://twitter.com/autopremium',
    followers: '12.1K',
    color: 'hover:bg-blue-400 hover:text-white',
    description: 'Actualizaciones en tiempo real'
  },
  {
    name: 'YouTube',
    icon: <Youtube className="w-6 h-6" />,
    url: 'https://youtube.com/@autopremium',
    followers: '8.9K',
    color: 'hover:bg-red-600 hover:text-white',
    description: 'Videos de sorteos en vivo y reviews'
  },
  {
    name: 'WhatsApp',
    icon: <MessageCircle className="w-6 h-6" />,
    url: 'https://wa.me/+34123456789',
    followers: 'Chat',
    color: 'hover:bg-green-500 hover:text-white',
    description: 'Contacto directo para consultas'
  }
]

const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Ubicación',
    content: 'Av. Principal 123, Madrid, España',
    action: 'Ver en mapa'
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Teléfono',
    content: '+34 123 456 789',
    action: 'Llamar ahora'
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'Email',
    content: 'info@autopremium.com',
    action: 'Enviar email'
  }
]

interface SocialMediaSectionProps {
  className?: string
}

export function SocialMediaSection({ className = '' }: SocialMediaSectionProps) {
  return (
    <section className={`section bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <motion.h2 
            className="heading-lg text-white mb-6"
            whileInView={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Síguenos en Redes Sociales
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mantente conectado con AutoPremium para no perderte ninguna oportunidad, ofertas exclusivas y sorteos especiales
          </p>
        </ScrollReveal>

        {/* Social Media Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" staggerDelay={0.1}>
          {socialLinks.map((social, index) => (
            <StaggerItem key={social.name}>
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-300 ${social.color} group hover:scale-105 hover:shadow-2xl`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{social.name}</h3>
                    <p className="text-sm text-gray-300 group-hover:text-white/90">
                      {social.followers} {social.name !== 'WhatsApp' ? 'seguidores' : ''}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 group-hover:text-white/90 transition-colors">
                  {social.description}
                </p>
                
                {/* Hover Effect */}
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Seguir ahora</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Contact Information */}
        <ScrollReveal direction="up" className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Prefieres el Contacto Directo?
            </h3>
            <p className="text-gray-300">
              También puedes visitarnos o contactarnos directamente
            </p>
          </div>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.2}>
            {contactInfo.map((contact, index) => (
              <StaggerItem key={contact.title}>
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors">
                    {contact.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {contact.title}
                  </h4>
                  <p className="text-gray-300 mb-4">
                    {contact.content}
                  </p>
                  <motion.button
                    className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {contact.action}
                  </motion.button>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal direction="up" className="text-center">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              ¡No Te Pierdas Ninguna Oportunidad!
            </h3>
            <p className="text-orange-100 mb-6 text-lg">
              Síguenos en todas nuestras redes para enterarte de sorteos exclusivos, ofertas especiales y promociones limitadas
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.slice(0, 4).map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}