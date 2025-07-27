import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/types/player"
import { PerformanceChart } from "@/components/performance-chart"
import { User, MapPin, Ruler, Scale, Calendar, Trophy } from "lucide-react"

interface PlayerModalProps {
  player: Player
  onClose: () => void
}

export function PlayerModal({ player, onClose }: PlayerModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{player.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información personal */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <img
                    src={player.photo || "/placeholder.svg"}
                    alt={player.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                  />
                  <Badge variant="outline" className="mb-2">
                    {player.position}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Edad:</strong> {player.age} años
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Altura:</strong> {player.height}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Peso:</strong> {player.weight}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Nacionalidad:</strong> {player.nationality}
                    </span>
                  </div>

                  {/* Equipos - Mostrar múltiples equipos */}
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <strong>Equipos:</strong>
                      <div className="mt-1 space-y-1">
                        {player.teams.map((team) => (
                          <Badge key={team} variant="outline" className="mr-1 mb-1">
                            {team}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estadísticas y gráficas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Estadísticas generales */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de la Temporada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{player.stats.points}</div>
                    <div className="text-sm text-gray-600">Puntos</div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{player.stats.kills}</div>
                    <div className="text-sm text-gray-600">Remates</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{player.stats.blocks}</div>
                    <div className="text-sm text-gray-600">Bloqueos</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{player.stats.aces}</div>
                    <div className="text-sm text-gray-600">Saques</div>
                  </div>

                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{player.stats.digs}</div>
                    <div className="text-sm text-gray-600">Defensas</div>
                  </div>

                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{player.stats.assists}</div>
                    <div className="text-sm text-gray-600">Asistencias</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráfica de rendimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart data={player.performance} />
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
