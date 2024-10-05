"use client"

import { useFinanceStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvestmentDashboard() {
  const { totalIncome, fixedExpenses, transactions, budgetAllocation } = useFinanceStore();

  const totalFixedExpenses = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const availableIncome = totalIncome - totalFixedExpenses;

  const savingsPercentage = budgetAllocation.savings || 0;
  const investmentBudget = (availableIncome * savingsPercentage) / 100;

  const totalInvested = transactions
    .filter(t => t.category === 'investment')
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingInvestmentBudget = investmentBudget - totalInvested;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Disponible para invertir este mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${investmentBudget.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total invertido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalInvested.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pendiente de invertir este mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${remainingInvestmentBudget.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}