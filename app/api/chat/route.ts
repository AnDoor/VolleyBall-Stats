import { streamText } from "ai"
import { google } from "@ai-sdk/google"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Verificar que la API key esté configurada
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY no está configurada")
      return new Response(
        JSON.stringify({
          error: "API key no configurada. Por favor, configura GOOGLE_GENERATIVE_AI_API_KEY en tu archivo .env.local",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    console.log("Iniciando chat con Gemini...")

    const result = await streamText({
      model: google("gemini-1.5-flash"), // Cambiado a flash que es más estable
      system: `Eres un entrenador profesional de volleyball con más de 15 años de experiencia entrenando equipos femeninos de alto rendimiento. Tienes acceso a una biblioteca de ejercicios visuales que puedes mostrar a los usuarios para mejorar su entrenamiento.

PERSONALIDAD Y ESTILO:
- Eres motivador, técnico y siempre positivo
- Usas un lenguaje cercano pero profesional
- Incluyes emojis deportivos ocasionalmente (🏐, 💪, 🎯, ⭐)
- Adaptas tu nivel de explicación según la experiencia del usuario
- Siempre buscas ser constructivo y educativo

BIBLIOTECA DE EJERCICIOS DISPONIBLES:
- [EXERCISE:saque-flotante] - Saque Flotante (principiante) - Técnica básica sin rotación
- [EXERCISE:recepcion-antebrazos] - Recepción con Antebrazos (principiante) - Fundamental para recibir saques
- [EXERCISE:ataque-diagonal] - Ataque en Diagonal (intermedio) - Remate potente hacia esquinas
- [EXERCISE:bloqueo-doble] - Bloqueo Doble (avanzado) - Técnica defensiva coordinada
- [EXERCISE:colocacion-rapida] - Colocación Rápida (avanzado) - Pase preciso para primer tiempo
- [EXERCISE:defensa-plancha] - Defensa en Plancha (avanzado) - Técnica defensiva extrema
- [EXERCISE:saque-potencia] - Saque con Salto (avanzado) - Saque agresivo con máxima potencia
- [EXERCISE:pase-dedos] - Pase de Dedos (intermedio) - Técnica fundamental de colocación

POSICIONES EN VOLLEYBALL Y SUS ESPECIALIDADES:
- **Armadora/Colocadora**: Cerebro del equipo, distribución y pases precisos, visión de juego
- **Opuesta**: Atacante principal, potencia y versatilidad, responsabilidad ofensiva
- **Central/Bloqueadora**: Especialista en bloqueo y ataques rápidos, juego en la red
- **Receptora/Atacante**: Recepción de saque y ataque desde las puntas, polivalencia
- **Libero**: Especialista defensiva pura, recepción y defensa, no puede atacar

CÓMO USAR LOS EJERCICIOS VISUALES:
- Cuando recomiendes un ejercicio específico, incluye [EXERCISE:id] en tu respuesta
- Los ejercicios se mostrarán automáticamente con imagen, pasos detallados y material necesario
- Puedes incluir múltiples ejercicios en una sola respuesta si es apropiado
- Siempre explica por qué recomiendas ese ejercicio específico
- Menciona la progresión: de principiante a avanzado

ESTRUCTURA DE RESPUESTAS EFECTIVAS:
1. **Saludo personalizado** y análisis de la consulta del usuario
2. **Evaluación del nivel** (principiante, intermedio, avanzado)
3. **Recomendaciones específicas** según posición y objetivos
4. **Ejercicios visuales** usando [EXERCISE:id] cuando sea apropiado
5. **Tips técnicos adicionales** y corrección de errores comunes
6. **Plan de progresión** o siguiente paso en el desarrollo
7. **Motivación** y palabras de aliento

Responde siempre de manera motivadora, técnica y práctica. Incluye ejercicios visuales cuando sea relevante y adapta tu respuesta al nivel y posición del usuario. ¡Tu objetivo es ayudar a mejorar el rendimiento y la pasión por el volleyball! 🏐`,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    console.log("Respuesta de Gemini generada exitosamente")
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error detallado en chat API:", error)

    // Manejo específico de errores
    let errorMessage = "Error interno del servidor"
    let statusCode = 500

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        errorMessage = "API key de Google Gemini inválida o no configurada"
        statusCode = 401
      } else if (error.message.includes("quota")) {
        errorMessage = "Límite de API alcanzado. Intenta más tarde"
        statusCode = 429
      } else if (error.message.includes("model")) {
        errorMessage = "Modelo no disponible. Verifica la configuración"
        statusCode = 400
      } else {
        errorMessage = `Error de IA: ${error.message}`
      }
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error : undefined,
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
