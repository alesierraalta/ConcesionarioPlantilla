import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET() {
  try {
    const recentWinners = db.getRecentWinners(10)
    
    return NextResponse.json({
      winners: recentWinners.map(winner => ({
        id: winner.id,
        winnerName: winner.winnerName,
        prize: winner.prize,
        value: winner.value,
        date: winner.date,
        timeAgo: getTimeAgo(winner.date)
      }))
    })

  } catch (error) {
    console.error('Winners error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

function getTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) {
    return 'Hoy'
  } else if (diffInDays === 1) {
    return 'Ayer'
  } else if (diffInDays < 7) {
    return `${diffInDays} días atrás`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} semana${weeks > 1 ? 's' : ''} atrás`
  } else {
    const months = Math.floor(diffInDays / 30)
    return `${months} mes${months > 1 ? 'es' : ''} atrás`
  }
}