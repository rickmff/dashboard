"use client";

import Layout from "@/components/kokonutui/layout"
import List01 from "@/components/kokonutui/list-01"
import List02 from "@/components/kokonutui/list-02"
import List03 from "@/components/kokonutui/list-03"
import SpendingAnalysis from "@/components/kokonutui/spending-analysis"
import BudgetManagement from "@/components/kokonutui/budget-management"
import CashFlowProjections from "@/components/kokonutui/cash-flow-projections"
import { Wallet, Target, TrendingUp, BanknoteIcon } from "lucide-react"
import { SummaryCard, type ChartDataPoint } from "@/components/kokonutui/summary-card"

export default function Dashboard() {
  // Custom value formatters for different card types
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value}%`;

  // Handle card click
  const handleCardClick = (label: string) => {
    console.log(`View details for ${label}`);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {summaryCards.map((card, index) => (
          <SummaryCard
            key={index}
            label={card.label}
            value={card.value}
            change={card.change}
            percentage={card.percentage}
            icon={card.icon}
            trend={card.trend}
            chartData={card.chartData}
            valueFormatter={card.type === 'percentage' ? formatPercentage : formatCurrency}
            onClick={() => handleCardClick(card.label)}
          />
        ))}
      </div>
    </Layout>
  )
}

interface SummaryCardData {
  label: string;
  value: string;
  change: string;
  percentage: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  chartData: ChartDataPoint[];
  type: 'currency' | 'percentage';
}

const summaryCards: SummaryCardData[] = [
  {
    label: 'Net Worth',
    value: '$124,571',
    change: '+2.5% from last month',
    percentage: '2.5',
    icon: <Wallet className="h-5 w-5 text-primary" />,
    trend: 'up',
    chartData: [
      { date: 'Jan', value: 110000 },
      { date: 'Feb', value: 115000 },
      { date: 'Mar', value: 112000 },
      { date: 'Apr', value: 118000 },
      { date: 'May', value: 120000 },
      { date: 'Jun', value: 124571 }
    ],
    type: 'currency'
  },
  {
    label: 'Monthly Income',
    value: '$8,250',
    change: '+5% from last month',
    percentage: '5',
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    trend: 'up',
    chartData: [
      { date: 'Jan', value: 7200 },
      { date: 'Feb', value: 7500 },
      { date: 'Mar', value: 7800 },
      { date: 'Apr', value: 7600 },
      { date: 'May', value: 7850 },
      { date: 'Jun', value: 8250 }
    ],
    type: 'currency'
  },
  {
    label: 'Monthly Expenses',
    value: '$4,125',
    change: '-3% from last month',
    percentage: '3',
    icon: <BanknoteIcon className="h-5 w-5 text-primary" />,
    trend: 'down',
    chartData: [
      { date: 'Jan', value: 4500 },
      { date: 'Feb', value: 4300 },
      { date: 'Mar', value: 4600 },
      { date: 'Apr', value: 4400 },
      { date: 'May', value: 4250 },
      { date: 'Jun', value: 4125 }
    ],
    type: 'currency'
  },
  {
    label: 'Savings Rate',
    value: '50%',
    change: '+2% from last month',
    percentage: '2',
    icon: <Target className="h-5 w-5 text-primary" />,
    trend: 'up',
    chartData: [
      { date: 'Jan', value: 45 },
      { date: 'Feb', value: 46 },
      { date: 'Mar', value: 44 },
      { date: 'Apr', value: 47 },
      { date: 'May', value: 49 },
      { date: 'Jun', value: 50 }
    ],
    type: 'percentage'
  }
]