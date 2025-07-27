export interface Exercise {
  id: string
  name: string
  description: string
  position: string[]
  difficulty: "principiante" | "intermedio" | "avanzado"
  duration: string
  repetitions: string
  material: string[]
  image: string
  steps: string[]
}

export const exerciseLibrary: Exercise[] = [
  {
    id: "saque-flotante",
    name: "Saque Flotante",
    description: "Técnica básica de saque sin rotación para generar movimiento impredecible",
    position: ["Todas"],
    difficulty: "principiante",
    duration: "15-20 minutos",
    repetitions: "3 series de 10 saques",
    material: ["Balón de volleyball", "Red", "Cancha"],
    image: "/placeholder.svg?height=300&width=400&text=Saque+Flotante",
    steps: [
      "Posición inicial: pie contrario adelante",
      "Lanzar el balón 1 metro por encima de la cabeza",
      "Contacto firme con la palma de la mano",
      "Seguimiento corto sin rotación de muñeca",
    ],
  },
  {
    id: "recepcion-antebrazos",
    name: "Recepción con Antebrazos",
    description: "Técnica fundamental para recibir saques y ataques",
    position: ["Libero", "Punta Receptora"],
    difficulty: "principiante",
    duration: "20 minutos",
    repetitions: "4 series de 15 recepciones",
    material: ["Balón de volleyball", "Compañero"],
    image: "/placeholder.svg?height=300&width=400&text=Recepción+Antebrazos",
    steps: [
      "Posición baja con rodillas flexionadas",
      "Brazos extendidos formando plataforma",
      "Contacto en el tercio inferior del antebrazo",
      "Dirección hacia el armador",
    ],
  },
  {
    id: "ataque-diagonal",
    name: "Ataque en Diagonal",
    description: "Remate potente dirigido hacia las esquinas de la cancha rival",
    position: ["Opuesto", "Punta Receptora"],
    difficulty: "intermedio",
    duration: "25 minutos",
    repetitions: "5 series de 8 ataques",
    material: ["Balón", "Red", "Armador"],
    image: "/placeholder.svg?height=300&width=400&text=Ataque+Diagonal",
    steps: [
      "Aproximación en 3 pasos (izq-der-izq)",
      "Salto explosivo con brazos hacia arriba",
      "Contacto en el punto más alto",
      "Golpe con muñeca hacia diagonal",
    ],
  },
  {
    id: "bloqueo-doble",
    name: "Bloqueo Doble",
    description: "Técnica defensiva coordinada entre dos jugadores centrales",
    position: ["Central"],
    difficulty: "avanzado",
    duration: "30 minutos",
    repetitions: "6 series de 10 bloqueos",
    material: ["Balón", "Red", "Compañero"],
    image: "/placeholder.svg?height=300&width=400&text=Bloqueo+Doble",
    steps: [
      "Comunicación previa entre bloqueadores",
      "Salto sincronizado en la red",
      "Manos firmes y dedos separados",
      "Penetración sobre la red",
    ],
  },
  {
    id: "colocacion-rapida",
    name: "Colocación Rápida",
    description: "Pase preciso y veloz para ataques de primer tiempo",
    position: ["Armador"],
    difficulty: "avanzado",
    duration: "20 minutos",
    repetitions: "4 series de 12 colocaciones",
    material: ["Balón", "Atacante central"],
    image: "/placeholder.svg?height=300&width=400&text=Colocación+Rápida",
    steps: [
      "Posición bajo el balón con pies paralelos",
      "Contacto con yemas de los dedos",
      "Extensión rápida de muñecas",
      "Altura de 50cm sobre la red",
    ],
  },
  {
    id: "defensa-plancha",
    name: "Defensa en Plancha",
    description: "Técnica defensiva extrema para balones lejanos",
    position: ["Libero", "Todas"],
    difficulty: "avanzado",
    duration: "25 minutos",
    repetitions: "3 series de 8 defensas",
    material: ["Balón", "Rodilleras", "Compañero"],
    image: "/placeholder.svg?height=300&width=400&text=Defensa+Plancha",
    steps: [
      "Lectura rápida de la trayectoria",
      "Extensión completa del cuerpo",
      "Contacto con una mano",
      "Caída controlada sobre el pecho",
    ],
  },
  {
    id: "saque-potencia",
    name: "Saque con Salto",
    description: "Saque agresivo con salto para máxima potencia",
    position: ["Opuesto", "Punta Receptora"],
    difficulty: "avanzado",
    duration: "20 minutos",
    repetitions: "4 series de 6 saques",
    material: ["Balón", "Red", "Espacio de carrera"],
    image: "/placeholder.svg?height=300&width=400&text=Saque+Potencia",
    steps: [
      "Carrera de aproximación de 3-4 pasos",
      "Lanzamiento alto del balón",
      "Salto explosivo",
      "Contacto potente en el punto más alto",
    ],
  },
  {
    id: "pase-dedos",
    name: "Pase de Dedos",
    description: "Técnica fundamental de colocación con precisión",
    position: ["Armador"],
    difficulty: "intermedio",
    duration: "15 minutos",
    repetitions: "5 series de 15 pases",
    material: ["Balón", "Pared o compañero"],
    image: "/placeholder.svg?height=300&width=400&text=Pase+Dedos",
    steps: [
      "Posición de manos formando triángulo",
      "Contacto suave con yemas de dedos",
      "Extensión coordinada de brazos",
      "Seguimiento hacia el objetivo",
    ],
  },
]

export function getExercisesByPosition(position: string): Exercise[] {
  return exerciseLibrary.filter(
    (exercise) => exercise.position.includes(position) || exercise.position.includes("Todas"),
  )
}

export function getExercisesByDifficulty(difficulty: "principiante" | "intermedio" | "avanzado"): Exercise[] {
  return exerciseLibrary.filter((exercise) => exercise.difficulty === difficulty)
}

export function getExerciseById(id: string): Exercise | undefined {
  return exerciseLibrary.find((exercise) => exercise.id === id)
}
