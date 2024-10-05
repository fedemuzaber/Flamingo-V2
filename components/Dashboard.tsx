"use client"

import { useFinanceStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const { totalIncome, fixedExpenses, budgetAllocation, transactions } = useFinanceStore();

  const totalFixedExpenses = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const availableIncome = totalIncome - totalFixedExpenses;

  const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const remainingBudget = availableIncome - totalSpent;

  const categorySpending = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available for Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${availableIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${remainingBudget.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">Budget Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(budgetAllocation).map(([category, percentage]) => (
            <Card key={category}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(availableIncome * percentage / 100).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Spent: ${(categorySpending[category] || 0).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}