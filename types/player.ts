export interface Player {
  id: number
  name: string
  position: string
  teams: string[] // Cambiado de team a teams (array)
  photo: string
  age: number
  height: string
  weight: string
  nationality: string
  stats: {
    // Estadísticas básicas
    points: number
    kills: number
    blocks: number
    aces: number
    digs: number
    assists: number

    // Estadísticas detalladas
    killAttempts?: number
    killErrors?: number
    serviceAttempts?: number
    serviceErrors?: number
    blockSolos?: number
    blockAssists?: number
    blockErrors?: number
    receptionAttempts?: number
    receptionErrors?: number
    matchesPlayed?: number
    setsPlayed?: number
    minutesPlayed?: number

    // Porcentajes calculados
    killPercentage?: number
    servicePercentage?: number
    receptionPercentage?: number
    efficiency?: number
  }
  performance: Array<{
    month: string
    points: number
    kills: number
    blocks: number
  }>
}
