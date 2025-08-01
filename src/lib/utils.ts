import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format time to display format (HH:MM:SS)
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Format number with separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num)
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Scroll to element smoothly
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (fallbackErr) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format (basic)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Calculate time until next draw (8 PM tomorrow)
 */
export function getTimeUntilNextDraw(): {
  hours: number
  minutes: number
  seconds: number
  total: number
} {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(20, 0, 0, 0) // 8 PM
  
  const diff = tomorrow.getTime() - now.getTime()
  const total = Math.floor(diff / 1000)
  
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  
  return { hours, minutes, seconds, total }
}

/**
 * Generate winner data
 */
export function generateWinnerData() {
  const names = [
    'María González', 'Carlos Rodríguez', 'Ana Martínez', 'Luis Fernández',
    'Sofia Herrera', 'Diego Morales', 'Carmen Silva', 'Roberto Jiménez',
    'Patricia López', 'Miguel Torres', 'Elena Vargas', 'Fernando Castro',
    'Lucia Mendoza', 'Andrés Ruiz', 'Valentina Ortiz', 'Gabriel Ramos'
  ]
  
  const prizes = [
    'iPhone 15 Pro', 'Casco Premium', 'Accesorios Moto', 'Kit de Herramientas',
    'Tarjeta Regalo $500', 'Seguro Gratis 6 meses', 'Mantenimiento Gratis',
    'Llantas Premium', 'Descuento 20%', 'Kit Limpieza', 'Revisión Gratis',
    'Combustible $100', 'Accesorio Premium', 'Servicio Técnico', 'Garantía Extendida'
  ]
  
  const timeOptions = [
    'Ahora mismo', '2 min ago', '15 min ago', '32 min ago', '1 hora ago',
    '2 horas ago', '3 horas ago', '4 horas ago', '5 horas ago'
  ]
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    prize: prizes[Math.floor(Math.random() * prizes.length)],
    time: timeOptions[Math.floor(Math.random() * timeOptions.length)],
    avatar: names[Math.floor(Math.random() * names.length)].charAt(0)
  }
}

/**
 * Analytics tracking helper
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...properties,
      timestamp: new Date().toISOString()
    })
  }
  
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties)
  }
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: (key: string, defaultValue: any = null) => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn('Error reading from localStorage:', error)
      return defaultValue
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Error writing to localStorage:', error)
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Error removing from localStorage:', error)
    }
  }
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Get relative time string
 */
export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Ahora mismo'
  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours} hora${hours > 1 ? 's' : ''} ago`
  return `${days} día${days > 1 ? 's' : ''} ago`
}

// Type declarations for global objects
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}