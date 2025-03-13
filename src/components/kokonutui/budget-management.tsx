"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Edit, Plus, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for budget categories
const initialBudgets = [
  {
    id: "1",
    category: "Housing",
    budgeted: 1500,
    spent: 1200,
    icon: "🏠",
    color: "bg-blue-500",
  },
  {
    id: "2",
    category: "Food",
    budgeted: 600,
    spent: 450,
    icon: "🍔",
    color: "bg-green-500",
  },
  {
    id: "3",
    category: "Transportation",
    budgeted: 400,
    spent: 300,
    icon: "🚗",
    color: "bg-yellow-500",
  },
  {
    id: "4",
    category: "Entertainment",
    budgeted: 200,
    spent: 250,
    icon: "🎬",
    color: "bg-purple-500",
  },
  {
    id: "5",
    category: "Shopping",
    budgeted: 300,
    spent: 350,
    icon: "🛍️",
    color: "bg-pink-500",
  },
  {
    id: "6",
    category: "Utilities",
    budgeted: 250,
    spent: 180,
    icon: "💡",
    color: "bg-indigo-500",
  },
  {
    id: "7",
    category: "Healthcare",
    budgeted: 200,
    spent: 120,
    icon: "🏥",
    color: "bg-red-500",
  },
  {
    id: "8",
    category: "Savings",
    budgeted: 500,
    spent: 500,
    icon: "💰",
    color: "bg-emerald-500",
  },
]

// Budget summary data
const budgetSummary = {
  totalBudgeted: 3950,
  totalSpent: 3350,
  remainingDays: 12,
  monthProgress: 60, // Percentage of month completed
}

export default function BudgetManagement() {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [editingBudget, setEditingBudget] = useState<any>(null)
  const [newBudget, setNewBudget] = useState({
    category: "",
    budgeted: 0,
    spent: 0,
    icon: "💰",
    color: "bg-blue-500",
  })

  // Calculate total budgeted and spent
  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const overallPercentage = Math.round((totalSpent / totalBudgeted) * 100)

  const handleSaveBudget = () => {
    if (editingBudget) {
      setBudgets(budgets.map((budget) => (budget.id === editingBudget.id ? { ...editingBudget } : budget)))
      setEditingBudget(null)
    }
  }

  const handleCreateBudget = () => {
    if (newBudget.category && newBudget.budgeted > 0) {
      setBudgets([
        ...budgets,
        {
          id: (budgets.length + 1).toString(),
          ...newBudget,
        },
      ])
      setNewBudget({
        category: "",
        budgeted: 0,
        spent: 0,
        icon: "💰",
        color: "bg-blue-500",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Budget Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Budget</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>Set up a new budget category to track your spending.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  Icon
                </Label>
                <Input
                  id="icon"
                  value={newBudget.icon}
                  onChange={(e) => setNewBudget({ ...newBudget, icon: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Budget Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newBudget.budgeted || ""}
                  onChange={(e) => setNewBudget({ ...newBudget, budgeted: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateBudget}>Create Budget</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Budget Overview</CardTitle>
                <CardDescription>{budgetSummary.remainingDays} days remaining in this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Overall Budget</span>
                      <span className="text-sm font-medium">
                        ${totalSpent.toLocaleString()} of ${totalBudgeted.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={overallPercentage}
                      className={cn(
                        "h-2",
                        overallPercentage > 100 ? "bg-red-200 dark:bg-red-950" : "bg-gray-200 dark:bg-gray-800",
                      )}
                      indicatorClassName={cn(
                        overallPercentage > 100
                          ? "bg-red-500"
                          : overallPercentage > 90
                            ? "bg-yellow-500"
                            : "bg-green-500",
                      )}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Month Progress</span>
                      <span className="text-sm font-medium">{budgetSummary.monthProgress}%</span>
                    </div>
                    <Progress value={budgetSummary.monthProgress} className="h-2 bg-gray-200 dark:bg-gray-800" />
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Remaining Budget</h3>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${(totalBudgeted - totalSpent).toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-lg",
                        overallPercentage > budgetSummary.monthProgress
                          ? "bg-yellow-50 dark:bg-yellow-900/20"
                          : "bg-blue-50 dark:bg-blue-900/20",
                      )}
                    >
                      <h3
                        className={cn(
                          "text-sm font-medium",
                          overallPercentage > budgetSummary.monthProgress
                            ? "text-yellow-800 dark:text-yellow-300"
                            : "text-blue-800 dark:text-blue-300",
                        )}
                      >
                        Spending Pace
                      </h3>
                      <p
                        className={cn(
                          "text-2xl font-bold",
                          overallPercentage > budgetSummary.monthProgress
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-blue-600 dark:text-blue-400",
                        )}
                      >
                        {overallPercentage > budgetSummary.monthProgress ? "Ahead" : "On Track"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Budget Status</CardTitle>
                <CardDescription>Quick view of your budget categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgets
                    .sort((a, b) => b.spent / b.budgeted - a.spent / a.budgeted)
                    .slice(0, 4)
                    .map((budget) => {
                      const percentage = Math.round((budget.spent / budget.budgeted) * 100)
                      return (
                        <div key={budget.id} className="space-y-1">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{budget.icon}</span>
                              <span className="text-sm font-medium">{budget.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">
                                ${budget.spent.toLocaleString()} / ${budget.budgeted.toLocaleString()}
                              </span>
                              <span
                                className={cn(
                                  "text-xs px-1.5 py-0.5 rounded-full",
                                  percentage > 100
                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                    : percentage > 90
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                                )}
                              >
                                {percentage}%
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={percentage > 100 ? 100 : percentage}
                            className={cn(
                              "h-2",
                              percentage > 100 ? "bg-red-100 dark:bg-red-950" : "bg-gray-100 dark:bg-gray-800",
                            )}
                            indicatorClassName={cn(
                              percentage > 100 ? "bg-red-500" : percentage > 90 ? "bg-yellow-500" : "bg-green-500",
                            )}
                          />
                        </div>
                      )
                    })}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <TabsTrigger value="categories" className="w-full">
                    View All Categories
                  </TabsTrigger>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => {
              const percentage = Math.round((budget.spent / budget.budgeted) * 100)
              return (
                <Card key={budget.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{budget.icon}</span>
                        <CardTitle className="text-base">{budget.category}</CardTitle>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Budget</DialogTitle>
                            <DialogDescription>Update your budget for {budget.category}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-amount" className="text-right">
                                Budget Amount
                              </Label>
                              <Input
                                id="edit-amount"
                                type="number"
                                defaultValue={budget.budgeted}
                                onChange={(e) =>
                                  setEditingBudget({
                                    ...budget,
                                    budgeted: Number(e.target.value),
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-spent" className="text-right">
                                Spent Amount
                              </Label>
                              <Input
                                id="edit-spent"
                                type="number"
                                defaultValue={budget.spent}
                                onChange={(e) =>
                                  setEditingBudget({
                                    ...budget,
                                    spent: Number(e.target.value),
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleSaveBudget}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          ${budget.spent.toLocaleString()} of ${budget.budgeted.toLocaleString()}
                        </span>
                        <span
                          className={cn(
                            "font-medium",
                            percentage > 100
                              ? "text-red-600 dark:text-red-400"
                              : percentage > 90
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-green-600 dark:text-green-400",
                          )}
                        >
                          {percentage}%
                        </span>
                      </div>
                      <Progress
                        value={percentage > 100 ? 100 : percentage}
                        className={cn(
                          "h-2",
                          percentage > 100 ? "bg-red-100 dark:bg-red-950" : "bg-gray-100 dark:bg-gray-800",
                        )}
                        indicatorClassName={cn(
                          percentage > 100 ? "bg-red-500" : percentage > 90 ? "bg-yellow-500" : "bg-green-500",
                        )}
                      />
                    </div>
                  </CardContent>
                  <div
                    className={cn(
                      "px-6 py-2 text-xs font-medium",
                      percentage > 100
                        ? "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : percentage > 90
                          ? "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : percentage > 75
                            ? "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                    )}
                  >
                    {percentage > 100 ? (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Over budget by ${(budget.spent - budget.budgeted).toLocaleString()}</span>
                      </div>
                    ) : percentage > 90 ? (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Approaching limit (${(budget.budgeted - budget.spent).toLocaleString()} left)</span>
                      </div>
                    ) : percentage > 75 ? (
                      <div className="flex items-center gap-1">
                        <Wallet className="h-3 w-3" />
                        <span>
                          ${(budget.budgeted - budget.spent).toLocaleString()} remaining ({100 - percentage}%)
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Well under budget (${(budget.budgeted - budget.spent).toLocaleString()} left)</span>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Insights</CardTitle>
              <CardDescription>Recommendations and insights based on your spending habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Entertainment over budget */}
                {budgets.some((budget) => budget.category === "Entertainment" && budget.spent > budget.budgeted) && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
                      Entertainment Budget Alert
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      You&apos;ve exceeded your entertainment budget by{" "}
                      {Math.round(
                        ((budgets.find((b) => b.category === "Entertainment")?.spent || 0) /
                          (budgets.find((b) => b.category === "Entertainment")?.budgeted || 1)) *
                          100 -
                          100,
                      )}
                      %. Consider reducing spending in this category for the rest of the month.
                    </p>
                  </div>
                )}

                {/* Shopping over budget */}
                {budgets.some((budget) => budget.category === "Shopping" && budget.spent > budget.budgeted) && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">Shopping Budget Alert</h3>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      You&apos;ve exceeded your shopping budget by{" "}
                      {Math.round(
                        ((budgets.find((b) => b.category === "Shopping")?.spent || 0) /
                          (budgets.find((b) => b.category === "Shopping")?.budgeted || 1)) *
                          100 -
                          100,
                      )}
                      %. Consider postponing non-essential purchases.
                    </p>
                  </div>
                )}

                {/* Utilities under budget */}
                {budgets.some(
                  (budget) =>
                    budget.category === "Utilities" &&
                    budget.spent < budget.budgeted * 0.8 &&
                    budgetSummary.monthProgress > 80,
                ) && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Utilities Savings</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      You&apos;re under budget on utilities by{" "}
                      {Math.round(
                        100 -
                          ((budgets.find((b) => b.category === "Utilities")?.spent || 0) /
                            (budgets.find((b) => b.category === "Utilities")?.budgeted || 1)) *
                            100,
                      )}
                      %. Consider transferring some of these savings to your emergency fund.
                    </p>
                  </div>
                )}

                {/* Overall budget status */}
                <div
                  className={cn(
                    "p-4 rounded-lg",
                    overallPercentage > budgetSummary.monthProgress
                      ? "bg-yellow-50 dark:bg-yellow-900/20"
                      : "bg-green-50 dark:bg-green-900/20",
                  )}
                >
                  <h3
                    className={cn(
                      "text-sm font-medium mb-1",
                      overallPercentage > budgetSummary.monthProgress
                        ? "text-yellow-800 dark:text-yellow-300"
                        : "text-green-800 dark:text-green-300",
                    )}
                  >
                    Overall Budget Status
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      overallPercentage > budgetSummary.monthProgress
                        ? "text-yellow-700 dark:text-yellow-400"
                        : "text-green-700 dark:text-green-400",
                    )}
                  >
                    {overallPercentage > budgetSummary.monthProgress
                      ? `You're spending at a faster rate (${overallPercentage}%) than the month is progressing (${budgetSummary.monthProgress}%). Consider reducing discretionary spending.`
                      : `You're on track with your overall budget. You've spent ${overallPercentage}% of your budget with ${budgetSummary.monthProgress}% of the month elapsed.`}
                  </p>
                </div>

                {/* Savings recommendation */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Savings Opportunity</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Based on your current spending patterns, you could potentially save an additional $
                    {Math.round(
                      (totalBudgeted - totalSpent) * (1 - budgetSummary.monthProgress / 100) * 0.5,
                    ).toLocaleString()}{" "}
                    this month by maintaining your current spending habits.
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

