import { NextRequest, NextResponse } from 'next/server'
import { db, isValidEmail, isValidPhone } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Formato de teléfono inválido' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe un usuario con este email' },
        { status: 409 }
      )
    }

    // Create user
    const user = db.createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim()
    })

    // Add user to today's raffle
    const todaysRaffle = db.getTodaysRaffle()
    if (todaysRaffle) {
      db.addParticipation(user.id, todaysRaffle.id, 1, 'registration')
    }

    return NextResponse.json({
      success: true,
      message: '¡Registro exitoso! Has sido inscrito en el sorteo de hoy.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        totalEntries: user.totalEntries
      },
      raffle: todaysRaffle ? {
        id: todaysRaffle.id,
        prize: todaysRaffle.prize,
        drawTime: todaysRaffle.drawTime
      } : null
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}