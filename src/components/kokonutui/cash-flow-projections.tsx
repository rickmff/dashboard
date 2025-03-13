"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { LineChart } from "@/components/ui/chart"
import { SimpleCalendar } from "@/components/ui/simple-calendar"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  ChevronDown,
  CheckCircle,
  CreditCard,
  DollarSign,
  Download,
  HelpCircle,
  Info,
  Lightbulb,
  Plus,
  RefreshCw,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { format } from "date-fns"

// Mock data for income sources
const incomeData = [
  {
    id: "1",
    name: "Salary",
    amount: 4500,
    frequency: "monthly",
    nextDate: "2024-05-25",
  },
  {
    id: "2",
    name: "Freelance Work",
    amount: 1200,
    frequency: "monthly",
    nextDate: "2024-05-15",
  },
  {
    id: "3",
    name: "Dividend Payment",
    amount: 350,
    frequency: "quarterly",
    nextDate: "2024-06-10",
  },
]

// Mock data for recurring expenses
const expenseData = [
  {
    id: "1",
    name: "Rent",
    amount: 1500,
    dueDate: "2024-05-01",
    category: "Housing",
    isPaid: true,
  },
  {
    id: "2",
    name: "Car Payment",
    amount: 350,
    dueDate: "2024-05-15",
    category: "Transportation",
    isPaid: false,
  },
  {
    id: "3",
    name: "Electricity Bill",
    amount: 120,
    dueDate: "2024-05-18",
    category: "Utilities",
    isPaid: false,
  },
  {
    id: "4",
    name: "Internet",
    amount: 80,
    dueDate: "2024-05-22",
    category: "Utilities",
    isPaid: false,
  },
  {
    id: "5",
    name: "Phone Bill",
    amount: 65,
    dueDate: "2024-05-25",
    category: "Utilities",
    isPaid: false,
  },
  {
    id: "6",
    name: "Streaming Services",
    amount: 45,
    dueDate: "2024-05-10",
    category: "Entertainment",
    isPaid: false,
  },
  {
    id: "7",
    name: "Gym Membership",
    amount: 50,
    dueDate: "2024-05-05",
    category: "Health",
    isPaid: true,
  },
  {
    id: "8",
    name: "Credit Card Payment",
    amount: 500,
    dueDate: "2024-05-20",
    category: "Debt",
    isPaid: false,
  },
]

// Mock data for cash flow projection
const generateProjectionData = (
  startingBalance: number,
  months: number,
  additionalExpense = 0,
  additionalIncome = 0,
  monthOfPurchase = 1,
) => {
  const today = new Date()
  const data = []
  let balance = startingBalance

  // Calculate monthly net income (income - expenses)
  const monthlyIncome = incomeData.reduce((sum, income) => {
    if (income.frequency === "monthly") return sum + income.amount
    if (income.frequency === "quarterly") return sum + income.amount / 3
    return sum
  }, 0)

  const monthlyExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0)
  const monthlyNet = monthlyIncome - monthlyExpenses

  // Generate projection data
  for (let i = 0; i < months; i++) {
    const date = new Date(today)
    date.setMonth(today.getMonth() + i)

    // Add monthly net income/expenses
    balance += monthlyNet

    // Add additional income/expense in the specified month
    if (i === monthOfPurchase - 1) {
      balance = balance - additionalExpense + additionalIncome
    }

    data.push({
      date: format(date, "MMM yyyy"),
      balance: Math.round(balance),
    })
  }

  return data
}

// Generate 6 months of projection data
const projectionData = generateProjectionData(8500, 6)

export default function CashFlowProjections() {
  const [startingBalance, setStartingBalance] = useState(8500)
  const [projectionMonths, setProjectionMonths] = useState(6)
  const [purchaseAmount, setPurchaseAmount] = useState(0)
  const [purchaseMonth, setPurchaseMonth] = useState(1)
  const [additionalIncome, setAdditionalIncome] = useState(0)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [whatIfData, setWhatIfData] = useState(projectionData)
  const [showPaidBills, setShowPaidBills] = useState(false)

  // Function to update what-if scenario data
  const updateWhatIfScenario = () => {
    const newData = generateProjectionData(
      startingBalance,
      projectionMonths,
      purchaseAmount,
      additionalIncome,
      purchaseMonth,
    )
    setWhatIfData(newData)
  }

  // Get upcoming bills (due in the next 30 days)
  const upcomingBills = expenseData
    .filter((bill) => {
      if (bill.isPaid && !showPaidBills) return false
      const dueDate = new Date(bill.dueDate)
      const today = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(today.getDate() + 30)
      return dueDate >= today && dueDate <= thirtyDaysFromNow
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  // Calculate total upcoming expenses
  const totalUpcoming = upcomingBills.reduce((sum, bill) => sum + bill.amount, 0)

  // Calculate estimated balance after bills
  const estimatedBalance = startingBalance - totalUpcoming

  // Function to get bill dates for the calendar
  const getBillDates = () => {
    return expenseData.map((bill) => new Date(bill.dueDate))
  }

  // Function to get bills for a specific date
  const getBillsForDate = (date: Date) => {
    return expenseData.filter((bill) => {
      const billDate = new Date(bill.dueDate)
      return (
        billDate.getDate() === date.getDate() &&
        billDate.getMonth() === date.getMonth() &&
        billDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Selected date bills
  const selectedDateBills = date ? getBillsForDate(date) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cash Flow Projections</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <Tabs defaultValue="projections" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="projections">Balance Projections</TabsTrigger>
          <TabsTrigger value="bills">Bill Reminders</TabsTrigger>
          <TabsTrigger value="whatif">What-If Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="projections" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">6-Month Balance Projection</CardTitle>
                <CardDescription>Based on your recurring income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={projectionData}
                    index="date"
                    categories={["balance"]}
                    colors={["hsl(var(--chart-1))"]}
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                    className="h-80"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Projection Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Current Balance</span>
                      <span className="font-medium">${startingBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Projected (3 months)</span>
                      <span className="font-medium">${projectionData[2].balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Projected (6 months)</span>
                      <span className="font-medium">${projectionData[5].balance.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <h3 className="text-sm font-medium">Monthly Cash Flow</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Income</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        +$
                        {incomeData
                          .reduce((sum, income) => {
                            if (income.frequency === "monthly") return sum + income.amount
                            if (income.frequency === "quarterly") return sum + income.amount / 3
                            return sum
                          }, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Expenses</span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        -${expenseData.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-1 border-t">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">Net Cash Flow</span>
                      <span
                        className={cn(
                          "font-medium",
                          incomeData.reduce((sum, income) => {
                            if (income.frequency === "monthly") return sum + income.amount
                            if (income.frequency === "quarterly") return sum + income.amount / 3
                            return sum
                          }, 0) -
                            expenseData.reduce((sum, expense) => sum + expense.amount, 0) >=
                            0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        $
                        {(
                          incomeData.reduce((sum, income) => {
                            if (income.frequency === "monthly") return sum + income.amount
                            if (income.frequency === "quarterly") return sum + income.amount / 3
                            return sum
                          }, 0) - expenseData.reduce((sum, expense) => sum + expense.amount, 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {incomeData.reduce((sum, income) => {
                    if (income.frequency === "monthly") return sum + income.amount
                    if (income.frequency === "quarterly") return sum + income.amount / 3
                    return sum
                  }, 0) -
                    expenseData.reduce((sum, expense) => sum + expense.amount, 0) >=
                  0 ? (
                    <p>
                      Your positive cash flow of $
                      {(
                        incomeData.reduce((sum, income) => {
                          if (income.frequency === "monthly") return sum + income.amount
                          if (income.frequency === "quarterly") return sum + income.amount / 3
                          return sum
                        }, 0) - expenseData.reduce((sum, expense) => sum + expense.amount, 0)
                      ).toLocaleString()}{" "}
                      per month will grow your savings by approximately $
                      {(
                        (incomeData.reduce((sum, income) => {
                          if (income.frequency === "monthly") return sum + income.amount
                          if (income.frequency === "quarterly") return sum + income.amount / 3
                          return sum
                        }, 0) -
                          expenseData.reduce((sum, expense) => sum + expense.amount, 0)) *
                        6
                      ).toLocaleString()}{" "}
                      over the next 6 months.
                    </p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400">
                      Warning: Your expenses exceed your income by $
                      {Math.abs(
                        incomeData.reduce((sum, income) => {
                          if (income.frequency === "monthly") return sum + income.amount
                          if (income.frequency === "quarterly") return sum + income.amount / 3
                          return sum
                        }, 0) - expenseData.reduce((sum, expense) => sum + expense.amount, 0),
                      ).toLocaleString()}{" "}
                      per month. Consider reducing expenses or increasing income.
                    </p>
                  )}

                  <p>
                    Based on your current spending patterns, you could reach a balance of $
                    {(
                      startingBalance +
                      (incomeData.reduce((sum, income) => {
                        if (income.frequency === "monthly") return sum + income.amount
                        if (income.frequency === "quarterly") return sum + income.amount / 3
                        return sum
                      }, 0) -
                        expenseData.reduce((sum, expense) => sum + expense.amount, 0)) *
                        12
                    ).toLocaleString()}{" "}
                    in 12 months.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Income Sources</CardTitle>
              <CardDescription>Your recurring income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeData.map((income) => (
                  <div key={income.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium">{income.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {income.frequency.charAt(0).toUpperCase() + income.frequency.slice(1)} • Next:{" "}
                        {format(new Date(income.nextDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +${income.amount.toLocaleString()}
                    </span>
                  </div>
                ))}

                <Button variant="outline" className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Income Source
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-base">Bill Calendar</CardTitle>
                    <CardDescription>View and manage upcoming bills</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="show-paid" checked={showPaidBills} onCheckedChange={setShowPaidBills} />
                    <Label htmlFor="show-paid" className="text-xs">
                      Show Paid Bills
                    </Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <SimpleCalendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      modifiers={{
                        hasBill: getBillDates(),
                      }}
                      modifiersClassNames={{
                        hasBill: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-medium",
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="border rounded-md p-4 h-full">
                      <h3 className="text-sm font-medium mb-3">
                        {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                      </h3>

                      {selectedDateBills.length > 0 ? (
                        <div className="space-y-3">
                          {selectedDateBills.map((bill) => (
                            <div
                              key={bill.id}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md"
                            >
                              <div>
                                <h4 className="text-sm font-medium">{bill.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{bill.category}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">${bill.amount.toLocaleString()}</span>
                                <span
                                  className={cn(
                                    "text-xs px-1.5 py-0.5 rounded-full",
                                    bill.isPaid
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                                  )}
                                >
                                  {bill.isPaid ? "Paid" : "Due"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)] text-center">
                          <CalendarIcon className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {date ? "No bills due on this date" : "Select a date to view bills"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Upcoming Bills</CardTitle>
                <CardDescription>Due in the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingBills.length > 0 ? (
                    <>
                      {upcomingBills.map((bill) => (
                        <div key={bill.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <h3 className="text-sm font-medium">{bill.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Due: {format(new Date(bill.dueDate), "MMM d")}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium">${bill.amount.toLocaleString()}</span>
                            <span
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded-full",
                                bill.isPaid
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                              )}
                            >
                              {bill.isPaid ? "Paid" : "Due"}
                            </span>
                          </div>
                        </div>
                      ))}

                      <div className="pt-3 border-t mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500 dark:text-gray-400">Total Upcoming</span>
                          <span className="font-medium">${totalUpcoming.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500 dark:text-gray-400">Current Balance</span>
                          <span className="font-medium">${startingBalance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm pt-1 border-t">
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            Estimated Balance After Bills
                          </span>
                          <span
                            className={cn(
                              "font-medium",
                              estimatedBalance >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400",
                            )}
                          >
                            ${estimatedBalance.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming bills in the next 30 days</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bill
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="whatif" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">What-If Scenario Simulator</CardTitle>
                <CardDescription>See how future financial decisions impact your balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={whatIfData}
                    index="date"
                    categories={["balance"]}
                    colors={["hsl(var(--chart-1))"]}
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                    className="h-80"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Scenario Parameters</CardTitle>
                <CardDescription>Adjust values to simulate different scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="starting-balance">Starting Balance</Label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <Input
                        id="starting-balance"
                        type="number"
                        value={startingBalance}
                        onChange={(e) => setStartingBalance(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projection-months">Projection Months</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="projection-months"
                        type="number"
                        min={1}
                        max={24}
                        value={projectionMonths}
                        onChange={(e) => setProjectionMonths(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <Collapsible className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Major Purchase or Expense</Label>
                      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                        <span>Details</span>
                        <ChevronDown className="h-3 w-3" />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="purchase-amount">Amount</Label>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <Input
                            id="purchase-amount"
                            type="number"
                            value={purchaseAmount}
                            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="purchase-month">Month of Purchase</Label>
                          <span className="text-xs text-gray-500">{purchaseMonth}</span>
                        </div>
                        <Slider
                          id="purchase-month"
                          min={1}
                          max={projectionMonths}
                          step={1}
                          value={[purchaseMonth]}
                          onValueChange={(value: number[]) => setPurchaseMonth(value[0])}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Additional Income</Label>
                      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                        <span>Details</span>
                        <ChevronDown className="h-3 w-3" />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="income-amount">Amount</Label>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <Input
                            id="income-amount"
                            type="number"
                            value={additionalIncome}
                            onChange={(e) => setAdditionalIncome(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Button onClick={updateWhatIfScenario} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Projection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Major Purchase Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Scenario Analysis</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      {purchaseAmount > 0 ? (
                        <>
                          A purchase of ${purchaseAmount.toLocaleString()} in month {purchaseMonth} would reduce your
                          projected balance from $
                          {(whatIfData[whatIfData.length - 1].balance + purchaseAmount).toLocaleString()} to $
                          {whatIfData[whatIfData.length - 1].balance.toLocaleString()} after {projectionMonths} months.
                        </>
                      ) : (
                        <>Enter a purchase amount and month to see how it would impact your future balance.</>
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Common Scenarios</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPurchaseAmount(30000)
                          setPurchaseMonth(1)
                          updateWhatIfScenario()
                        }}
                      >
                        New Car ($30,000)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPurchaseAmount(5000)
                          setPurchaseMonth(2)
                          updateWhatIfScenario()
                        }}
                      >
                        Vacation ($5,000)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPurchaseAmount(2000)
                          setPurchaseMonth(1)
                          updateWhatIfScenario()
                        }}
                      >
                        New Laptop ($2,000)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPurchaseAmount(10000)
                          setPurchaseMonth(3)
                          updateWhatIfScenario()
                        }}
                      >
                        Home Renovation ($10,000)
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Financial Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseAmount > 0 && (
                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        whatIfData[whatIfData.length - 1].balance < 0
                          ? "bg-red-50 dark:bg-red-900/20"
                          : whatIfData[whatIfData.length - 1].balance < 1000
                            ? "bg-yellow-50 dark:bg-yellow-900/20"
                            : "bg-green-50 dark:bg-green-900/20",
                      )}
                    >
                      <h3
                        className={cn(
                          "text-sm font-medium mb-1",
                          whatIfData[whatIfData.length - 1].balance < 0
                            ? "text-red-800 dark:text-red-300"
                            : whatIfData[whatIfData.length - 1].balance < 1000
                              ? "text-yellow-800 dark:text-yellow-300"
                              : "text-green-800 dark:text-green-300",
                        )}
                      >
                        {whatIfData[whatIfData.length - 1].balance < 0
                          ? "Not Recommended"
                          : whatIfData[whatIfData.length - 1].balance < 1000
                            ? "Proceed with Caution"
                            : "Financially Viable"}
                      </h3>
                      <p
                        className={cn(
                          "text-sm",
                          whatIfData[whatIfData.length - 1].balance < 0
                            ? "text-red-700 dark:text-red-400"
                            : whatIfData[whatIfData.length - 1].balance < 1000
                              ? "text-yellow-700 dark:text-yellow-400"
                              : "text-green-700 dark:text-green-400",
                        )}
                      >
                        {whatIfData[whatIfData.length - 1].balance < 0
                          ? `This purchase would put you in a negative balance of $${Math.abs(whatIfData[whatIfData.length - 1].balance).toLocaleString()} after ${projectionMonths} months. Consider postponing or reducing the purchase amount.`
                          : whatIfData[whatIfData.length - 1].balance < 1000
                            ? `This purchase would leave you with only $${whatIfData[whatIfData.length - 1].balance.toLocaleString()} after ${projectionMonths} months, which is below the recommended emergency fund amount.`
                            : `This purchase appears financially viable. You'll still have $${whatIfData[whatIfData.length - 1].balance.toLocaleString()} after ${projectionMonths} months.`}
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="text-sm font-medium mb-1">General Advice</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      For major purchases, consider the 50/30/20 rule: 50% of income for needs, 30% for wants, and 20%
                      for savings. Ensure your purchase doesn't compromise your savings goals.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                      <Popover>
                        <PopoverTrigger className="flex items-center gap-1 underline decoration-dotted">
                          <span>Emergency Fund Recommendation</span>
                          <HelpCircle className="h-3 w-3" />
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <p className="text-xs">
                            An emergency fund should cover 3-6 months of essential expenses. Based on your monthly
                            expenses of $
                            {expenseData.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}, aim for $
                            {(expenseData.reduce((sum, expense) => sum + expense.amount, 0) * 3).toLocaleString()} to $
                            {(expenseData.reduce((sum, expense) => sum + expense.amount, 0) * 6).toLocaleString()}.
                          </p>
                        </PopoverContent>
                      </Popover>
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Maintain a minimum balance of $
                      {(expenseData.reduce((sum, expense) => sum + expense.amount, 0) * 3).toLocaleString()} for
                      emergencies before making large discretionary purchases.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

