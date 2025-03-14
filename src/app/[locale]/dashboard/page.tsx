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
import { useI18n } from "@/i18n/client"

export default function Dashboard() {
  const { t, formatNumber, locale } = useI18n();

  // Custom value formatters for different card types
  const formatCurrency = (value: number) =>
    locale === 'en'
      ? `$${formatNumber(value)}`
      : `R$${formatNumber(value)}`;

  const formatPercentage = (value: number) => `${formatNumber(value)}%`;

  // Handle card click
  const handleCardClick = (label: string) => {
    console.log(`View details for ${label}`);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {summaryCards.map((card, index) => (
          <SummaryCard
            key={index}
            label={t(card.labelKey)}
            value={card.type === 'currency'
              ? formatCurrency(card.rawValue)
              : formatPercentage(card.rawValue)}
            change={t(card.changeKey)}
            percentage={card.percentage}
            icon={card.icon}
            trend={card.trend}
            chartData={card.chartData.map(item => ({
              date: t(`dashboard.months.${item.monthKey}`),
              value: item.value
            }))}
            valueFormatter={card.type === 'percentage' ? formatPercentage : formatCurrency}
            onClick={() => handleCardClick(t(card.labelKey))}
          />
        ))}
      </div>
    </Layout>
  )
}

interface SummaryCardData {
  labelKey: string;
  rawValue: number;
  changeKey: string;
  percentage: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  chartData: {
    monthKey: string;
    value: number;
  }[];
  type: 'currency' | 'percentage';
}

const summaryCards: SummaryCardData[] = [
  {
    labelKey: 'dashboard.cards.netWorth.label',
    rawValue: 124571,
    changeKey: 'dashboard.cards.netWorth.change',
    percentage: '2.5',
    icon: <Wallet className="h-5 w-5 text-primary" />,
    trend: 'up',
    chartData: [
      { monthKey: 'jan', value: 110000 },
      { monthKey: 'feb', value: 115000 },
      { monthKey: 'mar', value: 112000 },
      { monthKey: 'apr', value: 118000 },
      { monthKey: 'may', value: 120000 },
      { monthKey: 'jun', value: 124571 }
    ],
    type: 'currency'
  },
  {
    labelKey: 'dashboard.cards.monthlyIncome.label',
    rawValue: 8250,
    changeKey: 'dashboard.cards.monthlyIncome.change',
    percentage: '5',
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    trend: 'up',
    chartData: [
      { monthKey: 'jan', value: 7200 },
      { monthKey: 'feb', value: 7500 },
      { monthKey: 'mar', value: 7800 },
      { monthKey: 'apr', value: 7600 },
      { monthKey: 'may', value: 7850 },
      { monthKey: 'jun', value: 8250 }
    ],
    type: 'currency'
  },
  {
    labelKey: 'dashboard.cards.monthlyExpenses.label',
    rawValue: 4125,
    changeKey: 'dashboard.cards.monthlyExpenses.change',
    percentage: '3',
    icon: <BanknoteIcon className="h-5 w-5 text-primary" />,
    trend: 'down',
    chartData: [
      { monthKey: 'jan', value: 4500 },
      { monthKey: 'feb', value: 4300 },
      { monthKey: 'mar', value: 4600 },
      { monthKey: 'apr', value: 4400 },
      { monthKey: 'may', value: 4250 },
      { monthKey: 'jun', value: 4125 }
    ],
    type: 'currency'
  },
  {
    labelKey: 'dashboard.cards.savingsRate.label',
    rawValue: 50,
    changeKey: 'dashboard.cards.savingsRate.change',
    percentage: '2',
    icon: <Target className="h-5 w-5 text-primary" />,
    trend: 'up',
    chartData: [
      { monthKey: 'jan', value: 45 },
      { monthKey: 'feb', value: 46 },
      { monthKey: 'mar', value: 44 },
      { monthKey: 'apr', value: 47 },
      { monthKey: 'may', value: 49 },
      { monthKey: 'jun', value: 50 }
    ],
    type: 'percentage'
  }
]