'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Car, Menu, X, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Button } from './ui/Button'
import { cn, scrollToElement } from '@/lib/utils'

interface HeaderProps {
  onOpenRegistration: () => void
}

export function Header({ onOpenRegistration }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId, 80)
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'como-funciona', label: '¿Cómo Funciona?' },
    { id: 'ganadores', label: 'Ganadores' },
    { id: 'premios', label: 'Premios' },
    { id: 'vehiculos', label: 'Vehículos' }
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-medium' 
            : 'bg-white dark:bg-gray-900 shadow-soft'
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between py-6">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3 text-xl font-black text-primary-700 hover:text-primary-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-medium">
                <Car className="w-5 h-5" />
              </div>
              <span>AutoPremium</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Social Media Icons */}
              <div className="flex items-center space-x-2 mr-4">
                <motion.a
                  href="https://instagram.com/autopremium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  title="Instagram - Sorteos EN VIVO"
                >
                  <Instagram className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </motion.a>
                <motion.a
                  href="https://facebook.com/autopremium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://youtube.com/@autopremium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </motion.a>
              </div>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={onOpenRegistration}
                size="md"
                className="shadow-medium hover:shadow-large"
              >
                Participar Ahora
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white border-t border-gray-100"
        >
          <div className="container-custom py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20
              }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="pt-4 border-t border-gray-100"
            >
              <Button
                onClick={() => {
                  onOpenRegistration()
                  setIsMobileMenuOpen(false)
                }}
                fullWidth
                size="md"
              >
                Participar Ahora
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  )
}