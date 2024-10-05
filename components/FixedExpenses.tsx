"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFinanceStore } from '@/lib/store';

export default function FixedExpenses() {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const { toast } = useToast();
  const { fixedExpenses, addFixedExpense } = useFinanceStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number for the expense amount.",
        variant: "destructive",
      });
      return;
    }
    addFixedExpense({ name: expenseName, amount });
    toast({
      title: "Fixed Expense Added",
      description: `${expenseName}: $${amount.toFixed(2)} has been added to fixed expenses.`,
    });
    setExpenseName('');
    setExpenseAmount('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Fixed Expenses</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="Expense name"
          required
          id="expense-name"
        />
        <Input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="Amount"
          required
          id="expense-amount"
        />
        <Button type="submit">Add Fixed Expense</Button>
      </form>
      <ul className="list-disc pl-5">
        {fixedExpenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}