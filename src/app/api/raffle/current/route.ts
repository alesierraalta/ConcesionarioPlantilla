import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET() {
  try {
    const todaysRaffle = db.getTodaysRaffle()
    
    if (!todaysRaffle) {
      return NextResponse.json(
        { error: 'No hay sorteo activo hoy' },
        { status: 404 }
      )
    }

    const participations = db.getRaffleParticipations(todaysRaffle.id)
    const totalEntries = participations.reduce((sum, p) => sum + p.entries, 0)
    const uniqueParticipants = new Set(participations.map(p => p.userId)).size

    return NextResponse.json({
      raffle: {
        id: todaysRaffle.id,
        date: todaysRaffle.date,
        prize: todaysRaffle.prize,
        status: todaysRaffle.status,
        drawTime: todaysRaffle.drawTime,
        maxParticipants: todaysRaffle.maxParticipants,
        currentParticipants: uniqueParticipants,
        totalEntries,
        remainingSlots: todaysRaffle.maxParticipants ? todaysRaffle.maxParticipants - uniqueParticipants : null
      }
    })

  } catch (error) {
    console.error('Current raffle error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}