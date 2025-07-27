"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Player } from "@/types/player"
import { MapPin, Trophy, BarChart3 } from "lucide-react"

interface PlayerCardProps {
  player: Player
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
  onEditStats: () => void
}

export function PlayerCard({ player, onClick, onEdit, onDelete, onEditStats }: PlayerCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gray-800/90 backdrop-blur-sm border-gray-700 hover:border-indigo-500/50"
      onClick={onClick}
    >
      <div className="relative">
        <img src={player.photo || "/placeholder.svg"} alt={player.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-gray-900/80 text-indigo-300 border-indigo-500/50">
            {player.position}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </div>

      <CardContent className="p-4 bg-gray-800">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-white">{player.name}</h3>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {player.nationality}
            </div>
          </div>

          {/* Equipos - Mostrar múltiples equipos */}
          <div className="flex items-start text-sm text-gray-400">
            <Trophy className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {player.teams.map((team, index) => (
                <span key={team} className="inline">
                  {team}
                  {index < player.teams.length - 1 && <span className="text-gray-500 mx-1">•</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-700">
            <div className="text-center">
              <div className="font-semibold text-indigo-400">{player.stats.points}</div>
              <div className="text-xs text-gray-500">Puntos</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-400">{player.stats.kills}</div>
              <div className="text-xs text-gray-500">Remates</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-cyan-400">{player.stats.blocks}</div>
              <div className="text-xs text-gray-500">Bloqueos</div>
            </div>
          </div>

          {/* Porcentajes de efectividad */}
          {player.stats.killPercentage && (
            <div className="pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-500 mb-1">Efectividad</div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">
                  Remate: <strong className="text-indigo-400">{player.stats.killPercentage.toFixed(1)}%</strong>
                </span>
                <span className="text-gray-300">
                  Saque: <strong className="text-purple-400">{player.stats.servicePercentage?.toFixed(1) || 0}%</strong>
                </span>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="grid grid-cols-3 gap-1 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="bg-indigo-900/50 hover:bg-indigo-800/70 text-indigo-300 py-2 px-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 border border-indigo-700/50"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onEditStats()
              }}
              className="bg-cyan-900/50 hover:bg-cyan-800/70 text-cyan-300 py-2 px-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 border border-cyan-700/50"
            >
              <BarChart3 className="w-3 h-3" />
              Stats
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="bg-red-900/50 hover:bg-red-800/70 text-red-300 py-2 px-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 border border-red-700/50"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Eliminar
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
