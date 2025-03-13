import type React from "react"

interface ChartData {
  [key: string]: number | string
}

interface ChartProps {
  data: ChartData[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export const BarChart: React.FC<ChartProps> = ({ index, categories, className }) => {
  return (
    <div className={className}>
      {/* Placeholder for BarChart */}
      BarChart: {index}, {categories.join(", ")}
    </div>
  )
}

export const PieChart: React.FC<ChartProps> = ({ index, categories, className }) => {
  return (
    <div className={className}>
      {/* Placeholder for PieChart */}
      PieChart: {index}, {categories.join(", ")}
    </div>
  )
}

export const LineChart: React.FC<ChartProps> = ({ index, categories, className }) => {
  return (
    <div className={className}>
      {/* Placeholder for LineChart */}
      LineChart: {index}, {categories.join(", ")}
    </div>
  )
}

