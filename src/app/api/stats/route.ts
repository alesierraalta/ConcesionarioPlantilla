import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET() {
  try {
    const stats = db.getStats()
    
    return NextResponse.json({
      stats: {
        totalUsers: stats.totalUsers,
        activeUsers: stats.activeUsers,
        totalRaffles: stats.totalRaffles,
        completedRaffles: stats.completedRaffles,
        totalParticipations: stats.totalParticipations,
        totalPrizeValue: stats.totalPrizeValue,
        formattedPrizeValue: new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'USD'
        }).format(stats.totalPrizeValue)
      }
    })

  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}