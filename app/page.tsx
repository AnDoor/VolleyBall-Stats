"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { PlayerCard } from "@/components/player-card"
import { PlayerModal } from "@/components/player-modal"
import { Chatbot } from "@/components/chatbot"
import { TeamDashboard } from "@/components/team-dashboard"
import type { Player } from "@/types/player"
import { AddPlayerForm } from "@/components/add-player-form"
import { StatsEditor } from "@/components/stats-editor"
import { BarChart3, Users } from "lucide-react"

// Solo un atleta de ejemplo
const mockPlayers: Player[] = [
  {
    id: 1,
    name: "María Ejemplo",
    position: "Opuesto",
    teams: ["Mi Club Local"],
    photo: "/placeholder.svg?height=300&width=250",
    age: 24,
    height: "1.75m",
    weight: "65kg",
    nationality: "Colombia",
    stats: {
      points: 150,
      kills: 120,
      blocks: 35,
      aces: 18,
      digs: 45,
      assists: 8,
      killAttempts: 200,
      killErrors: 25,
      serviceAttempts: 100,
      serviceErrors: 12,
      matchesPlayed: 12,
      setsPlayed: 36,
      killPercentage: 60.0,
      servicePercentage: 88.0,
      efficiency: 47.5,
    },
    performance: [
      { month: "Ene", points: 25, kills: 20, blocks: 6 },
      { month: "Feb", points: 28, kills: 22, blocks: 7 },
      { month: "Mar", points: 24, kills: 19, blocks: 5 },
      { month: "Abr", points: 30, kills: 24, blocks: 8 },
      { month: "May", points: 26, kills: 21, blocks: 6 },
      { month: "Jun", points: 17, kills: 14, blocks: 3 },
    ],
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [editingStats, setEditingStats] = useState<Player | null>(null)
  const [players, setPlayers] = useState<Player[]>(mockPlayers)
  const [currentView, setCurrentView] = useState<"players" | "dashboard">("players")

  const handleEditPlayer = (updatedPlayer: Omit<Player, "id">) => {
    if (editingPlayer) {
      setPlayers(players.map((p) => (p.id === editingPlayer.id ? { ...updatedPlayer, id: editingPlayer.id } : p)))
      setEditingPlayer(null)
    }
  }

  const handleEditStats = (updatedPlayer: Player) => {
    setPlayers(players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p)))
    setEditingStats(null)
  }

  const handleDeletePlayer = (playerId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta atleta?")) {
      setPlayers(players.filter((p) => p.id !== playerId))
    }
  }

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.teams.some((team) => team.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAddPlayer = (newPlayer: Omit<Player, "id">) => {
    const playerWithId = {
      ...newPlayer,
      id: Math.max(...players.map((p) => p.id)) + 1,
    }
    setPlayers([playerWithId, ...players])
    setIsAddPlayerOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {/* Toggle entre vistas */}
            <div className="mb-6 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentView("players")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === "players"
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Atletas
                </button>
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === "dashboard"
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  Dashboard del Equipo
                </button>
              </div>

              {currentView === "players" && (
                <button
                  onClick={() => setIsAddPlayerOpen(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar Atleta
                </button>
              )}
            </div>

            {/* Vista de Atletas */}
            {currentView === "players" && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Panel de Entrenador</h1>
                  <p className="text-gray-400">Gestiona y evalúa el rendimiento de tus atletas</p>
                  {players.length === 1 && (
                    <div className="mt-4 p-4 bg-indigo-900/50 border-l-4 border-indigo-500 rounded backdrop-blur-sm">
                      <p className="text-indigo-200 text-sm">
                        <strong>¡Bienvenido!</strong> Esta es una atleta de ejemplo. Puedes editarla o eliminarla y
                        agregar tus propias atletas usando el botón "Agregar Atleta".
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onClick={() => setSelectedPlayer(player)}
                      onEdit={() => setEditingPlayer(player)}
                      onDelete={() => handleDeletePlayer(player.id)}
                      onEditStats={() => setEditingStats(player)}
                    />
                  ))}
                </div>

                {filteredPlayers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No se encontraron jugadores que coincidan con tu búsqueda</p>
                  </div>
                )}
              </>
            )}

            {/* Vista de Dashboard */}
            {currentView === "dashboard" && <TeamDashboard players={players} />}
          </div>

          <div className="hidden xl:block flex-shrink-0">
            <Chatbot />
          </div>
        </div>

        {/* Formularios y modales */}
        {(isAddPlayerOpen || editingPlayer) && (
          <AddPlayerForm
            onClose={() => {
              setIsAddPlayerOpen(false)
              setEditingPlayer(null)
            }}
            onSubmit={editingPlayer ? handleEditPlayer : handleAddPlayer}
            editingPlayer={editingPlayer}
          />
        )}

        {editingStats && (
          <StatsEditor player={editingStats} onClose={() => setEditingStats(null)} onSave={handleEditStats} />
        )}
      </main>

      {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}

      {/* Botón flotante para chatbot en móvil */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {isChatbotOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-75 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-white">Entrenador Virtual IA</h3>
              <button onClick={() => setIsChatbotOpen(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="h-full pb-20">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
