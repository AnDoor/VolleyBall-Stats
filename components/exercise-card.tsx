"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Exercise } from "@/lib/exercises"
import { Clock, Users, Target, CheckCircle } from "lucide-react"

interface ExerciseCardProps {
  exercise: Exercise
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "principiante":
        return "bg-green-100 text-green-800"
      case "intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <div className="relative">
        <img src={exercise.image || "/placeholder.svg"} alt={exercise.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3">
          <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{exercise.name}</CardTitle>
        <p className="text-sm text-gray-600">{exercise.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Información básica */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{exercise.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-600" />
            <span>{exercise.repetitions}</span>
          </div>
        </div>

        {/* Posiciones */}
        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Posiciones:
          </h4>
          <div className="flex flex-wrap gap-1">
            {exercise.position.map((pos) => (
              <Badge key={pos} variant="outline" className="text-xs">
                {pos}
              </Badge>
            ))}
          </div>
        </div>

        {/* Material necesario */}
        <div>
          <h4 className="font-medium text-sm mb-2">Material necesario:</h4>
          <p className="text-sm text-gray-600">{exercise.material.join(", ")}</p>
        </div>

        {/* Pasos */}
        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Pasos a seguir:
          </h4>
          <ol className="text-sm text-gray-600 space-y-1">
            {exercise.steps.map((step, index) => (
              <li key={index} className="flex gap-2">
                <span className="font-medium text-blue-600 min-w-[20px]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
