// Database schema and utilities
import { storage } from './utils'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  registeredAt: string
  totalEntries: number
  isActive: boolean
}

export interface Raffle {
  id: string
  date: string
  prize: {
    name: string
    value: string
    image: string
    description: string
  }
  status: 'upcoming' | 'active' | 'completed' | 'cancelled'
  participants: string[] // user IDs
  winnerId?: string
  drawTime: string // ISO string
  maxParticipants?: number
}

export interface Participation {
  id: string
  userId: string
  raffleId: string
  entries: number
  participatedAt: string
  source: 'registration' | 'daily_visit' | 'referral' | 'social_share' | 'test_drive' | 'visit_dealership'
}

export interface Prize {
  id: string
  name: string
  value: string
  image: string
  description: string
  category: 'vehicle' | 'tech' | 'cash' | 'accessory' | 'service'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  isActive: boolean
}

// In-memory database simulation (in production, use a real database)
class Database {
  private users: User[] = []
  private raffles: Raffle[] = []
  private participations: Participation[] = []
  private prizes: Prize[] = []

  constructor() {
    this.loadFromStorage()
    this.initializeDefaultData()
  }

  private loadFromStorage() {
    this.users = storage.get('users', [])
    this.raffles = storage.get('raffles', [])
    this.participations = storage.get('participations', [])
    this.prizes = storage.get('prizes', [])
  }

  private saveToStorage() {
    storage.set('users', this.users)
    storage.set('raffles', this.raffles)
    storage.set('participations', this.participations)
    storage.set('prizes', this.prizes)
  }

  private initializeDefaultData() {
    if (this.prizes.length === 0) {
      this.prizes = [
        {
          id: '1',
          name: 'Honda Civic 2024',
          value: '$28,000',
          image: '🚗',
          description: 'Honda Civic 2024 completamente equipado',
          category: 'vehicle',
          rarity: 'legendary',
          isActive: true
        },
        {
          id: '2',
          name: 'iPhone 15 Pro',
          value: '$1,200',
          image: '📱',
          description: 'iPhone 15 Pro 256GB',
          category: 'tech',
          rarity: 'epic',
          isActive: true
        },
        {
          id: '3',
          name: 'Yamaha MT-07',
          value: '$8,500',
          image: '🏍️',
          description: 'Yamaha MT-07 2024',
          category: 'vehicle',
          rarity: 'legendary',
          isActive: true
        },
        {
          id: '4',
          name: 'MacBook Pro',
          value: '$2,500',
          image: '💻',
          description: 'MacBook Pro M3 16"',
          category: 'tech',
          rarity: 'epic',
          isActive: true
        },
        {
          id: '5',
          name: 'Cash Prize',
          value: '$500',
          image: '💰',
          description: 'Premio en efectivo',
          category: 'cash',
          rarity: 'rare',
          isActive: true
        }
      ]
      this.saveToStorage()
    }

    // Create today's raffle if it doesn't exist
    this.ensureTodaysRaffle()
  }

  private ensureTodaysRaffle() {
    const today = new Date().toISOString().split('T')[0]
    const todaysRaffle = this.raffles.find(r => r.date === today)

    if (!todaysRaffle) {
      const randomPrize = this.prizes[Math.floor(Math.random() * this.prizes.length)]
      const drawTime = new Date()
      drawTime.setHours(20, 0, 0, 0) // 8 PM

      const newRaffle: Raffle = {
        id: `raffle-${Date.now()}`,
        date: today,
        prize: {
          name: randomPrize.name,
          value: randomPrize.value,
          image: randomPrize.image,
          description: randomPrize.description
        },
        status: new Date() < drawTime ? 'active' : 'completed',
        participants: [],
        drawTime: drawTime.toISOString(),
        maxParticipants: 100
      }

      this.raffles.push(newRaffle)
      this.saveToStorage()
    }
  }

  // User methods
  createUser(userData: Omit<User, 'id' | 'registeredAt' | 'totalEntries' | 'isActive'>): User {
    const user: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...userData,
      registeredAt: new Date().toISOString(),
      totalEntries: 1, // First entry for registration
      isActive: true
    }

    this.users.push(user)
    this.saveToStorage()
    return user
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email)
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id)
  }

  // Raffle methods
  getTodaysRaffle(): Raffle | undefined {
    const today = new Date().toISOString().split('T')[0]
    return this.raffles.find(r => r.date === today)
  }

  getAllRaffles(): Raffle[] {
    return this.raffles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  getRaffleById(id: string): Raffle | undefined {
    return this.raffles.find(r => r.id === id)
  }

  // Participation methods
  addParticipation(userId: string, raffleId: string, entries: number = 1, source: Participation['source'] = 'registration'): Participation {
    const participation: Participation = {
      id: `participation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      raffleId,
      entries,
      participatedAt: new Date().toISOString(),
      source
    }

    this.participations.push(participation)

    // Update raffle participants
    const raffle = this.raffles.find(r => r.id === raffleId)
    if (raffle && !raffle.participants.includes(userId)) {
      raffle.participants.push(userId)
    }

    // Update user total entries
    const user = this.users.find(u => u.id === userId)
    if (user) {
      user.totalEntries += entries
    }

    this.saveToStorage()
    return participation
  }

  getUserParticipations(userId: string): Participation[] {
    return this.participations.filter(p => p.userId === userId)
  }

  getRaffleParticipations(raffleId: string): Participation[] {
    return this.participations.filter(p => p.raffleId === raffleId)
  }

  // Draw winner
  drawWinner(raffleId: string): { winner: User | null, raffle: Raffle } {
    const raffle = this.raffles.find(r => r.id === raffleId)
    if (!raffle || raffle.status !== 'active') {
      throw new Error('Raffle not found or not active')
    }

    const participations = this.getRaffleParticipations(raffleId)
    if (participations.length === 0) {
      raffle.status = 'completed'
      this.saveToStorage()
      return { winner: null, raffle }
    }

    // Create weighted array based on entries
    const weightedParticipants: string[] = []
    participations.forEach(p => {
      for (let i = 0; i < p.entries; i++) {
        weightedParticipants.push(p.userId)
      }
    })

    // Draw random winner
    const randomIndex = Math.floor(Math.random() * weightedParticipants.length)
    const winnerId = weightedParticipants[randomIndex]
    const winner = this.getUserById(winnerId)

    raffle.winnerId = winnerId
    raffle.status = 'completed'
    this.saveToStorage()

    return { winner: winner || null, raffle }
  }

  // Statistics
  getStats() {
    const totalUsers = this.users.length
    const totalRaffles = this.raffles.length
    const totalParticipations = this.participations.length
    const completedRaffles = this.raffles.filter(r => r.status === 'completed').length
    const totalPrizeValue = this.raffles
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => {
        const value = parseFloat(r.prize.value.replace(/[$,]/g, ''))
        return sum + (isNaN(value) ? 0 : value)
      }, 0)

    return {
      totalUsers,
      totalRaffles,
      totalParticipations,
      completedRaffles,
      totalPrizeValue,
      activeUsers: this.users.filter(u => u.isActive).length
    }
  }

  // Get recent winners for display
  getRecentWinners(limit: number = 5) {
    return this.raffles
      .filter(r => r.status === 'completed' && r.winnerId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
      .map(r => {
        const winner = this.getUserById(r.winnerId!)
        return {
          id: r.id,
          winnerName: winner ? winner.name : 'Usuario Anónimo',
          prize: r.prize.name,
          date: r.date,
          value: r.prize.value
        }
      })
  }
}

// Singleton instance
export const db = new Database()

// Helper functions
export const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}