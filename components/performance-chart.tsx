import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PerformanceData {
  month: string
  points: number
  kills: number
  blocks: number
}

interface PerformanceChartProps {
  data: PerformanceData[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="points" stroke="#3B82F6" strokeWidth={2} name="Puntos" />
          <Line type="monotone" dataKey="kills" stroke="#F97316" strokeWidth={2} name="Remates" />
          <Line type="monotone" dataKey="blocks" stroke="#10B981" strokeWidth={2} name="Bloqueos" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
