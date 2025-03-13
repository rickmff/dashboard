import { BarChart, PieChart, LineChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowRight, BarChart3, PieChartIcon, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for spending by category
const spendingByCategory = [
  { name: "Housing", value: 1200, color: "#0ea5e9" },
  { name: "Food", value: 450, color: "#10b981" },
  { name: "Transportation", value: 300, color: "#f59e0b" },
  { name: "Entertainment", value: 200, color: "#8b5cf6" },
  { name: "Shopping", value: 350, color: "#ec4899" },
  { name: "Utilities", value: 180, color: "#6366f1" },
  { name: "Other", value: 120, color: "#94a3b8" },
]

// Mock data for monthly spending
const monthlySpending = [
  { name: "Jan", current: 2500, previous: 2300 },
  { name: "Feb", current: 2400, previous: 2200 },
  { name: "Mar", current: 2600, previous: 2400 },
  { name: "Apr", current: 2300, previous: 2500 },
  { name: "May", current: 2800, previous: 2600 },
  { name: "Jun", current: 3000, previous: 2700 },
]

// Mock data for unusual transactions
const unusualTransactions = [
  {
    id: "1",
    title: "Large Purchase - Electronics Store",
    amount: "$1,299.00",
    date: "May 15, 2024",
    category: "Shopping",
    reason: "Amount is 350% higher than your average in this category",
    severity: "high",
  },
  {
    id: "2",
    title: "Recurring Subscription Increase",
    amount: "$29.99",
    date: "May 10, 2024",
    category: "Entertainment",
    reason: "Price increased by 50% from previous month",
    severity: "medium",
  },
  {
    id: "3",
    title: "Unusual Location - Restaurant",
    amount: "$85.45",
    date: "May 8, 2024",
    category: "Food",
    reason: "Transaction occurred in a different city than usual",
    severity: "low",
  },
]

export default function SpendingAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Spending Analysis</h2>
        <button className="text-sm text-gray-600 dark:text-gray-300 flex items-center hover:text-gray-900 dark:hover:text-white transition-colors">
          View detailed report <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <Tabs defaultValue="category" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="category" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            By Category
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Monthly Comparison
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Spending Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Spending by Category</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <PieChart
                    data={spendingByCategory}
                    index="name"
                    categories={["value"]}
                    valueFormatter={(value) => `$${value}`}
                    colors={spendingByCategory.map((item) => item.color)}
                    className="h-80"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Spending Categories</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {spendingByCategory
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 5)
                    .map((category, index) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-semibold">${category.value}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.round(
                              (category.value / spendingByCategory.reduce((acc, curr) => acc + curr.value, 0)) * 100,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Spending Tips</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Your highest spending category is Housing at{" "}
                    {Math.round(
                      (spendingByCategory[0].value / spendingByCategory.reduce((acc, curr) => acc + curr.value, 0)) *
                        100,
                    )}
                    % of total expenses. This is within the recommended 30% of income.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Month-to-Month Comparison</CardTitle>
              <CardDescription>Current year vs. previous year</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <BarChart
                  data={monthlySpending}
                  index="name"
                  categories={["current", "previous"]}
                  colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
                  valueFormatter={(value) => `$${value}`}
                  className="h-80"
                />
              </div>
              <div className="flex items-center justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
                  <span className="text-xs">Current Year</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
                  <span className="text-xs">Previous Year</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Spending Insights</CardTitle>
              <CardDescription>Analysis of your spending patterns</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Spending Trend</h3>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    Your spending has increased by 11% compared to last year. The biggest increase was in June (+11.1%).
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Positive Note</h3>
                  <p className="text-xs text-green-700 dark:text-green-400">
                    You spent less in April compared to the same month last year. Keep up the good work!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Spending Trends (6 Months)</CardTitle>
              <CardDescription>See how your spending evolves</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <LineChart
                  data={monthlySpending}
                  index="name"
                  categories={["current", "previous"]}
                  colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
                  valueFormatter={(value) => `$${value}`}
                  className="h-80"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Unusual Spending Patterns
              </CardTitle>
              <CardDescription>Transactions that deviate from your normal patterns</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {unusualTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={cn(
                      "p-3 rounded-lg border",
                      transaction.severity === "high"
                        ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20"
                        : transaction.severity === "medium"
                          ? "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20"
                          : "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20",
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{transaction.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {transaction.date} • {transaction.category}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          transaction.severity === "high"
                            ? "text-red-600 dark:text-red-400"
                            : transaction.severity === "medium"
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-blue-600 dark:text-blue-400",
                        )}
                      >
                        {transaction.amount}
                      </span>
                    </div>
                    <p className="text-xs mt-2 text-gray-700 dark:text-gray-300">{transaction.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

