"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Player } from "@/types/player"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Users,
  Trophy,
  TrendingUp,
  Target,
  Award,
  Zap,
  Shield,
  BarChart3,
  PieChartIcon,
  Activity,
  Star,
} from "lucide-react"

interface TeamDashboardProps {
  players: Player[]
}

export function TeamDashboard({ players }: TeamDashboardProps) {
  // Cálculos de estadísticas del equipo
  const teamStats = {
    totalPlayers: players.length,
    totalPoints: players.reduce((sum, p) => sum + p.stats.points, 0),
    totalKills: players.reduce((sum, p) => sum + p.stats.kills, 0),
    totalBlocks: players.reduce((sum, p) => sum + p.stats.blocks, 0),
    totalAces: players.reduce((sum, p) => sum + p.stats.aces, 0),
    totalDigs: players.reduce((sum, p) => sum + p.stats.digs, 0),
    totalAssists: players.reduce((sum, p) => sum + p.stats.assists, 0),
    avgAge: Math.round(players.reduce((sum, p) => sum + p.age, 0) / players.length),
    totalMatches: players.reduce((sum, p) => sum + (p.stats.matchesPlayed || 0), 0),
  }

  // Promedios del equipo
  const teamAverages = {
    avgPoints: Math.round(teamStats.totalPoints / players.length),
    avgKills: Math.round(teamStats.totalKills / players.length),
    avgBlocks: Math.round(teamStats.totalBlocks / players.length),
    avgAces: Math.round(teamStats.totalAces / players.length),
    avgDigs: Math.round(teamStats.totalDigs / players.length),
    avgAssists: Math.round(teamStats.totalAssists / players.length),
    avgEfficiency: Math.round(players.reduce((sum, p) => sum + (p.stats.efficiency || 0), 0) / players.length),
  }

  // Distribución por posiciones
  const positionDistribution = players.reduce(
    (acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const positionData = Object.entries(positionDistribution).map(([position, count]) => ({
    position,
    count,
    percentage: Math.round((count / players.length) * 100),
  }))

  // Top performers
  const topScorers = [...players].sort((a, b) => b.stats.points - a.stats.points).slice(0, 5)
  const topKillers = [...players].sort((a, b) => b.stats.kills - a.stats.kills).slice(0, 5)
  const topBlockers = [...players].sort((a, b) => b.stats.blocks - a.stats.blocks).slice(0, 5)
  const topServers = [...players].sort((a, b) => b.stats.aces - a.stats.aces).slice(0, 5)

  // Análisis por posición
  const positionAnalysis = Object.entries(
    players.reduce(
      (acc, player) => {
        if (!acc[player.position]) {
          acc[player.position] = {
            players: [],
            totalPoints: 0,
            totalKills: 0,
            totalBlocks: 0,
            totalAces: 0,
            count: 0,
          }
        }
        acc[player.position].players.push(player)
        acc[player.position].totalPoints += player.stats.points
        acc[player.position].totalKills += player.stats.kills
        acc[player.position].totalBlocks += player.stats.blocks
        acc[player.position].totalAces += player.stats.aces
        acc[player.position].count += 1
        return acc
      },
      {} as Record<string, any>,
    ),
  ).map(([position, data]) => ({
    position,
    avgPoints: Math.round(data.totalPoints / data.count),
    avgKills: Math.round(data.totalKills / data.count),
    avgBlocks: Math.round(data.totalBlocks / data.count),
    avgAces: Math.round(data.totalAces / data.count),
    count: data.count,
    players: data.players,
  }))

  // Datos para radar chart del equipo
  const teamRadarData = [
    { stat: "Ataque", value: Math.min(teamAverages.avgKills * 2, 100) },
    { stat: "Saque", value: Math.min(teamAverages.avgAces * 8, 100) },
    { stat: "Bloqueo", value: Math.min(teamAverages.avgBlocks * 3, 100) },
    { stat: "Defensa", value: Math.min(teamAverages.avgDigs / 2, 100) },
    { stat: "Distribución", value: Math.min(teamAverages.avgAssists / 3, 100) },
    { stat: "Eficiencia", value: teamAverages.avgEfficiency },
  ]

  // Datos para gráfica de rendimiento general mejorada
  const performanceData = [
    {
      stat: "Puntos",
      promedio: teamAverages.avgPoints,
      total: teamStats.totalPoints,
      objetivo: 200, // Meta por jugadora
      color: "#6366F1",
    },
    {
      stat: "Remates",
      promedio: teamAverages.avgKills,
      total: teamStats.totalKills,
      objetivo: 150,
      color: "#8B5CF6",
    },
    {
      stat: "Bloqueos",
      promedio: teamAverages.avgBlocks,
      total: teamStats.totalBlocks,
      objetivo: 50,
      color: "#06B6D4",
    },
    {
      stat: "Aces",
      promedio: teamAverages.avgAces,
      total: teamStats.totalAces,
      objetivo: 30,
      color: "#10B981",
    },
    {
      stat: "Defensas",
      promedio: teamAverages.avgDigs,
      total: teamStats.totalDigs,
      objetivo: 100,
      color: "#F59E0B",
    },
    {
      stat: "Asistencias",
      promedio: teamAverages.avgAssists,
      total: teamStats.totalAssists,
      objetivo: 80,
      color: "#EF4444",
    },
  ]

  const COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"]

  return (
    <div className="space-y-4">
      {/* Header del Dashboard */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white p-6 rounded-lg border border-gray-700 shadow-2xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard del Equipo</h1>
          <p className="text-gray-300">Vista general del rendimiento y estadísticas del equipo</p>
        </div>
      </div>

      {/* Métricas Generales */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-gray-800/90 border-gray-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
            <div className="text-2xl font-bold text-white">{teamStats.totalPlayers}</div>
            <div className="text-sm text-gray-400">Jugadoras</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 border-gray-700">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{teamStats.totalPoints}</div>
            <div className="text-sm text-gray-400">Puntos Total</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 border-gray-700">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{teamStats.totalKills}</div>
            <div className="text-sm text-gray-400">Remates</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 border-gray-700">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{teamStats.totalBlocks}</div>
            <div className="text-sm text-gray-400">Bloqueos</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 border-gray-700">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{teamStats.totalAces}</div>
            <div className="text-sm text-gray-400">Aces</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 border-gray-700">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <div className="text-2xl font-bold text-white">{teamStats.totalDigs}</div>
            <div className="text-sm text-gray-400">Defensas</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 border-gray-700">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-pink-400" />
            <div className="text-2xl font-bold text-white">{teamAverages.avgEfficiency}%</div>
            <div className="text-sm text-gray-400">Eficiencia</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300"
          >
            Resumen
          </TabsTrigger>
          <TabsTrigger
            value="positions"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300"
          >
            Posiciones
          </TabsTrigger>
          <TabsTrigger
            value="rankings"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300"
          >
            Rankings
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300"
          >
            Análisis
          </TabsTrigger>
        </TabsList>

        {/* Tab: Resumen */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Distribución por Posiciones */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 justify-center text-white">
                  <PieChartIcon className="w-5 h-5" />
                  Distribución por Posiciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={positionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ position, percentage }) => `${position} (${percentage}%)`}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {positionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", color: "#fff" }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  {positionData.map((position, index) => (
                    <div
                      key={position.position}
                      className="flex items-center justify-between p-2 bg-gray-700/50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="font-medium text-white">{position.position}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white">{position.count}</span>
                        <span className="text-sm text-gray-400 ml-1">({position.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fortalezas del Equipo */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 justify-center text-white">
                  <Target className="w-5 h-5" />
                  Fortalezas del Equipo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={teamRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="stat" className="text-gray-300" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Equipo"
                        dataKey="value"
                        stroke="#6366F1"
                        fill="#6366F1"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", color: "#fff" }}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {teamRadarData.map((item, index) => (
                    <div key={item.stat} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                      <span className="text-sm font-medium text-white">{item.stat}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-600 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${item.value}%` }} />
                        </div>
                        <span className="text-sm font-bold text-white">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfica de rendimiento general */}
          <Card className="bg-gray-800/90 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 justify-center text-white">
                <BarChart3 className="w-5 h-5" />
                Rendimiento General por Estadística
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="stat" className="text-gray-300" />
                    <YAxis className="text-gray-300" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", color: "#fff" }}
                      formatter={(value, name) => [
                        `${value}${name === "promedio" ? " por jugadora" : name === "objetivo" ? " meta" : " total"}`,
                        name === "promedio" ? "Promedio" : name === "objetivo" ? "Meta" : "Total",
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="promedio" fill="#6366F1" name="Promedio por Jugadora" />
                    <Bar dataKey="objetivo" fill="#10B981" name="Meta por Jugadora" opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {performanceData.map((item) => {
                  const cumplimiento = Math.round((item.promedio / item.objetivo) * 100)
                  const color =
                    cumplimiento >= 100 ? "text-green-400" : cumplimiento >= 80 ? "text-yellow-400" : "text-red-400"
                  return (
                    <div key={item.stat} className="text-center p-3 bg-gray-700/50 rounded-lg">
                      <div className="text-sm font-medium text-gray-300">{item.stat}</div>
                      <div className={`text-lg font-bold ${color}`}>{cumplimiento}%</div>
                      <div className="text-xs text-gray-500">vs Meta</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Promedios del Equipo */}
          <Card className="bg-gray-800/90 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-white">Promedios del Equipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-indigo-900/30 rounded-lg border border-indigo-700/50">
                  <div className="text-2xl font-bold text-indigo-400">{teamAverages.avgPoints}</div>
                  <div className="text-sm text-gray-400">Puntos/Jugadora</div>
                </div>
                <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
                  <div className="text-2xl font-bold text-purple-400">{teamAverages.avgKills}</div>
                  <div className="text-sm text-gray-400">Remates/Jugadora</div>
                </div>
                <div className="text-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-700/50">
                  <div className="text-2xl font-bold text-cyan-400">{teamAverages.avgBlocks}</div>
                  <div className="text-sm text-gray-400">Bloqueos/Jugadora</div>
                </div>
                <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-700/50">
                  <div className="text-2xl font-bold text-green-400">{teamAverages.avgAces}</div>
                  <div className="text-sm text-gray-400">Aces/Jugadora</div>
                </div>
                <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-700/50">
                  <div className="text-2xl font-bold text-yellow-400">{teamAverages.avgDigs}</div>
                  <div className="text-sm text-gray-400">Defensas/Jugadora</div>
                </div>
                <div className="text-center p-4 bg-pink-900/30 rounded-lg border border-pink-700/50">
                  <div className="text-2xl font-bold text-pink-400">{teamAverages.avgAssists}</div>
                  <div className="text-sm text-gray-400">Asistencias/Jugadora</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Análisis por Posiciones */}
        <TabsContent value="positions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {positionAnalysis.map((position) => (
              <Card key={position.position} className="bg-gray-800/90 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-white">
                    {position.position}
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {position.count} jugadoras
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-indigo-900/30 rounded border border-indigo-700/50">
                      <div className="font-bold text-indigo-400">{position.avgPoints}</div>
                      <div className="text-gray-400">Puntos prom.</div>
                    </div>
                    <div className="text-center p-2 bg-purple-900/30 rounded border border-purple-700/50">
                      <div className="font-bold text-purple-400">{position.avgKills}</div>
                      <div className="text-gray-400">Remates prom.</div>
                    </div>
                    <div className="text-center p-2 bg-cyan-900/30 rounded border border-cyan-700/50">
                      <div className="font-bold text-cyan-400">{position.avgBlocks}</div>
                      <div className="text-gray-400">Bloqueos prom.</div>
                    </div>
                    <div className="text-center p-2 bg-green-900/30 rounded border border-green-700/50">
                      <div className="font-bold text-green-400">{position.avgAces}</div>
                      <div className="text-gray-400">Aces prom.</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-white">Jugadoras:</h4>
                    <div className="space-y-1">
                      {position.players.map((player: Player) => (
                        <div key={player.id} className="text-sm flex justify-between text-gray-300">
                          <span>{player.name}</span>
                          <span className="text-gray-500">{player.stats.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab: Rankings */}
        <TabsContent value="rankings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top 5 Anotadoras */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Anotadoras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topScorers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/50">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                              ? "bg-gray-400"
                              : index === 2
                                ? "bg-orange-600"
                                : "bg-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-white">{player.stats.points}</div>
                        <div className="text-sm text-gray-400">puntos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top 5 Rematadoras */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="w-5 h-5 text-purple-400" />
                  Top Rematadoras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topKillers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/50">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                              ? "bg-gray-400"
                              : index === 2
                                ? "bg-orange-600"
                                : "bg-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-white">{player.stats.kills}</div>
                        <div className="text-sm text-gray-400">remates</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top 5 Bloqueadoras */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  Top Bloqueadoras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topBlockers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/50">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                              ? "bg-gray-400"
                              : index === 2
                                ? "bg-orange-600"
                                : "bg-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-white">{player.stats.blocks}</div>
                        <div className="text-sm text-gray-400">bloqueos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top 5 Sacadoras */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-green-400" />
                  Top Sacadoras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topServers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/50">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                              ? "bg-gray-400"
                              : index === 2
                                ? "bg-orange-600"
                                : "bg-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-white">{player.stats.aces}</div>
                        <div className="text-sm text-gray-400">aces</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Análisis */}
        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fortalezas del Equipo */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  Fortalezas del Equipo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamAverages.avgKills > 25 && (
                  <div className="p-3 bg-green-900/30 border-l-4 border-green-500 rounded">
                    <p className="font-medium text-green-300">Excelente poder ofensivo</p>
                    <p className="text-sm text-green-400">Promedio de {teamAverages.avgKills} remates por jugadora</p>
                  </div>
                )}
                {teamAverages.avgBlocks > 8 && (
                  <div className="p-3 bg-green-900/30 border-l-4 border-green-500 rounded">
                    <p className="font-medium text-green-300">Sólido juego defensivo</p>
                    <p className="text-sm text-green-400">Promedio de {teamAverages.avgBlocks} bloqueos por jugadora</p>
                  </div>
                )}
                {teamAverages.avgEfficiency > 50 && (
                  <div className="p-3 bg-green-900/30 border-l-4 border-green-500 rounded">
                    <p className="font-medium text-green-300">Alta eficiencia general</p>
                    <p className="text-sm text-green-400">{teamAverages.avgEfficiency}% de eficiencia promedio</p>
                  </div>
                )}
                {positionDistribution["Armador"] >= 2 && (
                  <div className="p-3 bg-green-900/30 border-l-4 border-green-500 rounded">
                    <p className="font-medium text-green-300">Buena distribución táctica</p>
                    <p className="text-sm text-green-400">Múltiples opciones de armado</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Áreas de Mejora */}
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Target className="w-5 h-5" />
                  Áreas de Mejora
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamAverages.avgAces < 5 && (
                  <div className="p-3 bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                    <p className="font-medium text-yellow-300">Mejorar efectividad del saque</p>
                    <p className="text-sm text-yellow-400">Solo {teamAverages.avgAces} aces promedio por jugadora</p>
                  </div>
                )}
                {teamAverages.avgDigs < 15 && (
                  <div className="p-3 bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                    <p className="font-medium text-yellow-300">Fortalecer defensa de campo</p>
                    <p className="text-sm text-yellow-400">Promedio de {teamAverages.avgDigs} defensas por jugadora</p>
                  </div>
                )}
                {!positionDistribution["Libero"] && (
                  <div className="p-3 bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                    <p className="font-medium text-yellow-300">Considerar especialista defensiva</p>
                    <p className="text-sm text-yellow-400">No hay libero en el equipo</p>
                  </div>
                )}
                {teamAverages.avgEfficiency < 40 && (
                  <div className="p-3 bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                    <p className="font-medium text-yellow-300">Trabajar en la eficiencia general</p>
                    <p className="text-sm text-yellow-400">Eficiencia promedio del {teamAverages.avgEfficiency}%</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recomendaciones Tácticas */}
          <Card className="bg-gray-800/90 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-indigo-400" />
                Recomendaciones Tácticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700/50">
                  <h4 className="font-medium text-indigo-300 mb-2">Formación Recomendada</h4>
                  <p className="text-sm text-indigo-400">
                    Basado en las fortalezas del equipo, considera una formación 5-1 con énfasis en el ataque rápido.
                  </p>
                </div>
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
                  <h4 className="font-medium text-purple-300 mb-2">Rotaciones</h4>
                  <p className="text-sm text-purple-400">
                    Optimiza las rotaciones para maximizar el tiempo de las mejores atacantes en primera línea.
                  </p>
                </div>
                <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-700/50">
                  <h4 className="font-medium text-cyan-300 mb-2">Entrenamientos</h4>
                  <p className="text-sm text-cyan-400">
                    Enfócate en ejercicios de recepción y defensa para equilibrar las fortalezas ofensivas.
                  </p>
                </div>
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-700/50">
                  <h4 className="font-medium text-green-300 mb-2">Desarrollo</h4>
                  <p className="text-sm text-green-400">
                    Trabaja en la consistencia del saque para aumentar la presión sobre el equipo rival.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
