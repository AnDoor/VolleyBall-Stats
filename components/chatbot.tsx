"use client"
import { useChat } from "ai/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, Bot, User, Sparkles, Zap, AlertCircle, RefreshCw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ExerciseCard } from "@/components/exercise-card"
import { getExerciseById } from "@/lib/exercises"

export function Chatbot() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "error">("connecting")
  const [errorDetails, setErrorDetails] = useState<string>("")

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "¡Hola! 🏐 Soy tu entrenador virtual de volleyball con IA avanzada. Estoy aquí para ayudarte a mejorar tu juego con:\n\n• 🎯 Entrenamientos específicos por posición\n• 📚 Ejercicios con ejemplos visuales detallados\n• 📋 Planes de entrenamiento personalizados\n• 🧠 Técnicas avanzadas y consejos tácticos\n• 💪 Corrección de errores comunes\n• ⭐ Motivación y mentalidad deportiva\n\n¿En qué posición juegas o qué aspecto del volleyball te gustaría mejorar? ¡Cuéntame tu nivel actual para darte consejos más precisos!",
      },
    ],
    onError: (error) => {
      console.error("Chat error:", error)
      setConnectionStatus("error")

      // Extraer detalles del error
      if (error.message) {
        setErrorDetails(error.message)
      } else {
        setErrorDetails("Error de conexión con el servidor")
      }
    },
    onFinish: () => {
      setConnectionStatus("connected")
      setErrorDetails("")
    },
    onResponse: (response) => {
      if (response.ok) {
        setConnectionStatus("connected")
        setErrorDetails("")
      } else {
        setConnectionStatus("error")
        setErrorDetails(`Error ${response.status}: ${response.statusText}`)
      }
    },
  })

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Verificar estado de conexión
  useEffect(() => {
    if (messages.length > 1 && !error) {
      setConnectionStatus("connected")
    }
  }, [messages, error])

  // Función para reintentar conexión
  const handleRetry = () => {
    setConnectionStatus("connecting")
    setErrorDetails("")
    reload()
  }

  const parseMessageContent = (content: string) => {
    // Buscar referencias a ejercicios en el formato [EXERCISE:id]
    const exerciseRegex = /\[EXERCISE:([^\]]+)\]/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = exerciseRegex.exec(content)) !== null) {
      // Agregar texto antes del ejercicio
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: content.slice(lastIndex, match.index),
        })
      }

      // Agregar ejercicio
      const exerciseId = match[1]
      const exercise = getExerciseById(exerciseId)
      if (exercise) {
        parts.push({
          type: "exercise",
          exercise: exercise,
        })
      }

      lastIndex = match.index + match[0].length
    }

    // Agregar texto restante
    if (lastIndex < content.length) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex),
      })
    }

    return parts.length > 0 ? parts : [{ type: "text", content }]
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-900/30 text-green-300 border-green-700/50"
      case "connecting":
        return "bg-yellow-900/30 text-yellow-300 border-yellow-700/50"
      case "error":
        return "bg-red-900/30 text-red-300 border-red-700/50"
      default:
        return "bg-gray-900/30 text-gray-300 border-gray-700/50"
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Sparkles className="w-3 h-3" />
      case "connecting":
        return <Zap className="w-3 h-3 animate-pulse" />
      case "error":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Bot className="w-3 h-3" />
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Entrenador"
      case "connecting":
        return "Conectando..."
      case "error":
        return "Error de conexión"
      default:
        return "Iniciando..."
    }
  }

  return (
    <Card className="w-96 h-[600px] flex flex-col shadow-2xl bg-gray-800/95 backdrop-blur-sm border-gray-700">
      <CardHeader className="pb-3 border-b border-gray-700">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span className="text-white">Entrenador Virtual IA</span>
          </div>
          <Badge variant="outline" className={`text-xs border ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-400"> IA especialista en volleyball</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Mostrar error si existe */}
        {error && (
          <div className="p-4 border-b border-gray-700">
            <Alert className="border-red-700/50 bg-red-900/30">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Error de conexión</p>
                    <p className="text-sm mt-1">{errorDetails || "Verifica tu configuración de API"}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="ml-2 border-red-600 text-red-300 hover:bg-red-900/50 bg-transparent"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Reintentar
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-2">
          <div className="space-y-4 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[95%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    }`}
                  >
                    {message.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col gap-3 min-w-0">
                    {message.role === "assistant" ? (
                      // Parsear contenido del asistente para mostrar ejercicios
                      parseMessageContent(message.content).map((part, index) => (
                        <div key={index}>
                          {part.type === "text" && part.content.trim() && (
                            <div className="bg-gray-700/80 text-gray-100 p-3 rounded-lg text-sm leading-relaxed break-words rounded-bl-sm border-l-4 border-indigo-500">
                              <div className="whitespace-pre-wrap overflow-wrap-anywhere">{part.content}</div>
                            </div>
                          )}
                          {part.type === "exercise" && part.exercise && (
                            <div className="my-2">
                              <ExerciseCard exercise={part.exercise} />
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      // Mensaje del usuario
                      <div className="bg-indigo-600 text-white p-3 rounded-lg text-sm leading-relaxed break-words rounded-br-sm">
                        <div className="whitespace-pre-wrap overflow-wrap-anywhere">{message.content}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-gray-700/80 text-gray-100 p-3 rounded-lg text-sm border-l-4 border-indigo-500">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={
                connectionStatus === "error"
                  ? "Configura tu API key para continuar..."
                  : "Ej: soy armadora principiante, ¿qué ejercicios me recomiendas?"
              }
              className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading || connectionStatus === "error"}
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !input.trim() || connectionStatus === "error"}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <div className="mt-2 text-xs text-gray-400">
            <div className="flex items-center justify-between">
              <span>
                {connectionStatus === "error"
                  ? "Verifica tu configuración en la pestaña 'Configurar IA'"
                  : "Pregunta sobre: ejercicios, técnicas, entrenamientos, táctica"}
              </span>
             
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
