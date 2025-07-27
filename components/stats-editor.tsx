"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Player } from "@/types/player"
import { BarChart3, TrendingUp, Target, Shield, Zap, Award } from "lucide-react"

interface StatsEditorProps {
  player: Player
  onClose: () => void
  onSave: (updatedPlayer: Player) => void
}

export function StatsEditor({ player, onClose, onSave }: StatsEditorProps) {
  const [stats, setStats] = useState({
    // Estadísticas ofensivas
    points: player.stats.points,
    kills: player.stats.kills,
    killAttempts: player.stats.killAttempts || 0,
    killErrors: player.stats.killErrors || 0,
    aces: player.stats.aces,
    serviceAttempts: player.stats.serviceAttempts || 0,
    serviceErrors: player.stats.serviceErrors || 0,
    assists: player.stats.assists,

    // Estadísticas defensivas
    blocks: player.stats.blocks,
    blockSolos: player.stats.blockSolos || 0,
    blockAssists: player.stats.blockAssists || 0,
    blockErrors: player.stats.blockErrors || 0,
    digs: player.stats.digs,
    receptionAttempts: player.stats.receptionAttempts || 0,
    receptionErrors: player.stats.receptionErrors || 0,

    // Estadísticas adicionales
    matchesPlayed: player.stats.matchesPlayed || 0,
    setsPlayed: player.stats.setsPlayed || 0,
    minutesPlayed: player.stats.minutesPlayed || 0,
  })

  const handleStatChange = (field: string, value: string) => {
    setStats((prev) => ({
      ...prev,
      [field]: Number.parseInt(value) || 0,
    }))
  }

  const calculatePercentages = () => {
    return {
      killPercentage: stats.killAttempts > 0 ? ((stats.kills / stats.killAttempts) * 100).toFixed(1) : "0.0",
      servicePercentage:
        stats.serviceAttempts > 0
          ? (((stats.serviceAttempts - stats.serviceErrors) / stats.serviceAttempts) * 100).toFixed(1)
          : "0.0",
      receptionPercentage:
        stats.receptionAttempts > 0
          ? (((stats.receptionAttempts - stats.receptionErrors) / stats.receptionAttempts) * 100).toFixed(1)
          : "0.0",
      efficiency:
        stats.killAttempts > 0 ? (((stats.kills - stats.killErrors) / stats.killAttempts) * 100).toFixed(1) : "0.0",
    }
  }

  const handleSave = () => {
    const updatedPlayer: Player = {
      ...player,
      stats: {
        ...stats,
        // Calcular estadísticas derivadas
        killPercentage: Number.parseFloat(calculatePercentages().killPercentage),
        servicePercentage: Number.parseFloat(calculatePercentages().servicePercentage),
        receptionPercentage: Number.parseFloat(calculatePercentages().receptionPercentage),
        efficiency: Number.parseFloat(calculatePercentages().efficiency),
      },
    }
    onSave(updatedPlayer)
  }

  const percentages = calculatePercentages()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Estadísticas de {player.name}
          </DialogTitle>
          <p className="text-gray-600">
            {player.position} - {player.team}
          </p>
        </DialogHeader>

        <Tabs defaultValue="offensive" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="offensive">Ofensivas</TabsTrigger>
            <TabsTrigger value="defensive">Defensivas</TabsTrigger>
            <TabsTrigger value="general">Generales</TabsTrigger>
            <TabsTrigger value="analysis">Análisis</TabsTrigger>
          </TabsList>

          {/* Estadísticas Ofensivas */}
          <TabsContent value="offensive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  Estadísticas Ofensivas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="points">Puntos Totales</Label>
                  <Input
                    id="points"
                    type="number"
                    value={stats.points}
                    onChange={(e) => handleStatChange("points", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="kills">Remates Exitosos</Label>
                  <Input
                    id="kills"
                    type="number"
                    value={stats.kills}
                    onChange={(e) => handleStatChange("kills", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="killAttempts">Intentos de Remate</Label>
                  <Input
                    id="killAttempts"
                    type="number"
                    value={stats.killAttempts}
                    onChange={(e) => handleStatChange("killAttempts", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="killErrors">Errores de Remate</Label>
                  <Input
                    id="killErrors"
                    type="number"
                    value={stats.killErrors}
                    onChange={(e) => handleStatChange("killErrors", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="aces">Saques Directos (Aces)</Label>
                  <Input
                    id="aces"
                    type="number"
                    value={stats.aces}
                    onChange={(e) => handleStatChange("aces", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceAttempts">Intentos de Saque</Label>
                  <Input
                    id="serviceAttempts"
                    type="number"
                    value={stats.serviceAttempts}
                    onChange={(e) => handleStatChange("serviceAttempts", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceErrors">Errores de Saque</Label>
                  <Input
                    id="serviceErrors"
                    type="number"
                    value={stats.serviceErrors}
                    onChange={(e) => handleStatChange("serviceErrors", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="assists">Asistencias</Label>
                  <Input
                    id="assists"
                    type="number"
                    value={stats.assists}
                    onChange={(e) => handleStatChange("assists", e.target.value)}
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Estadísticas Defensivas */}
          <TabsContent value="defensive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Estadísticas Defensivas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="blocks">Bloqueos Totales</Label>
                  <Input
                    id="blocks"
                    type="number"
                    value={stats.blocks}
                    onChange={(e) => handleStatChange("blocks", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="blockSolos">Bloqueos Individuales</Label>
                  <Input
                    id="blockSolos"
                    type="number"
                    value={stats.blockSolos}
                    onChange={(e) => handleStatChange("blockSolos", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="blockAssists">Bloqueos Asistidos</Label>
                  <Input
                    id="blockAssists"
                    type="number"
                    value={stats.blockAssists}
                    onChange={(e) => handleStatChange("blockAssists", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="blockErrors">Errores de Bloqueo</Label>
                  <Input
                    id="blockErrors"
                    type="number"
                    value={stats.blockErrors}
                    onChange={(e) => handleStatChange("blockErrors", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="digs">Defensas (Digs)</Label>
                  <Input
                    id="digs"
                    type="number"
                    value={stats.digs}
                    onChange={(e) => handleStatChange("digs", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="receptionAttempts">Intentos de Recepción</Label>
                  <Input
                    id="receptionAttempts"
                    type="number"
                    value={stats.receptionAttempts}
                    onChange={(e) => handleStatChange("receptionAttempts", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="receptionErrors">Errores de Recepción</Label>
                  <Input
                    id="receptionErrors"
                    type="number"
                    value={stats.receptionErrors}
                    onChange={(e) => handleStatChange("receptionErrors", e.target.value)}
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Estadísticas Generales */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Estadísticas Generales
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="matchesPlayed">Partidos Jugados</Label>
                  <Input
                    id="matchesPlayed"
                    type="number"
                    value={stats.matchesPlayed}
                    onChange={(e) => handleStatChange("matchesPlayed", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="setsPlayed">Sets Jugados</Label>
                  <Input
                    id="setsPlayed"
                    type="number"
                    value={stats.setsPlayed}
                    onChange={(e) => handleStatChange("setsPlayed", e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="minutesPlayed">Minutos Jugados</Label>
                  <Input
                    id="minutesPlayed"
                    type="number"
                    value={stats.minutesPlayed}
                    onChange={(e) => handleStatChange("minutesPlayed", e.target.value)}
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análisis */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Porcentajes de Efectividad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Efectividad de Remate:</span>
                    <span className="text-lg font-bold text-orange-600">{percentages.killPercentage}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Efectividad de Saque:</span>
                    <span className="text-lg font-bold text-blue-600">{percentages.servicePercentage}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Efectividad de Recepción:</span>
                    <span className="text-lg font-bold text-green-600">{percentages.receptionPercentage}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Eficiencia General:</span>
                    <span className="text-lg font-bold text-purple-600">{percentages.efficiency}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    Promedios por Partido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.matchesPlayed > 0 ? (
                    <>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Puntos por Partido:</span>
                        <span className="text-lg font-bold">{(stats.points / stats.matchesPlayed).toFixed(1)}</span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Remates por Partido:</span>
                        <span className="text-lg font-bold">{(stats.kills / stats.matchesPlayed).toFixed(1)}</span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Bloqueos por Partido:</span>
                        <span className="text-lg font-bold">{(stats.blocks / stats.matchesPlayed).toFixed(1)}</span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Defensas por Partido:</span>
                        <span className="text-lg font-bold">{(stats.digs / stats.matchesPlayed).toFixed(1)}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Ingresa el número de partidos jugados para ver los promedios
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Guardar Estadísticas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
