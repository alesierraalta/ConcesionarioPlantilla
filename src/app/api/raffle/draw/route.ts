import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { raffleId, adminKey } = body

    // Simple admin authentication (in production, use proper auth)
    if (adminKey !== 'autopremium-admin-2024') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    if (!raffleId) {
      return NextResponse.json(
        { error: 'ID de sorteo requerido' },
        { status: 400 }
      )
    }

    const { winner, raffle } = db.drawWinner(raffleId)

    return NextResponse.json({
      success: true,
      raffle: {
        id: raffle.id,
        prize: raffle.prize,
        status: raffle.status,
        drawTime: raffle.drawTime
      },
      winner: winner ? {
        id: winner.id,
        name: winner.name,
        email: winner.email
      } : null,
      message: winner 
        ? `¡${winner.name} ha ganado ${raffle.prize.name}!`
        : 'No hubo participantes en este sorteo'
    })

  } catch (error) {
    console.error('Draw winner error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error interno del servidor' },
      { status: 500 }
    )
  }
}