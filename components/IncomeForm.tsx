"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFinanceStore } from '@/lib/store';

export default function IncomeForm() {
  const [income, setIncome] = useState('');
  const { toast } = useToast();
  const addIncome = useFinanceStore(state => state.addIncome);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeAmount = parseFloat(income);
    if (isNaN(incomeAmount)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number for income.",
        variant: "destructive",
      });
      return;
    }
    addIncome(incomeAmount);
    toast({
      title: "Income Recorded",
      description: `Income of $${incomeAmount.toFixed(2)} has been recorded.`,
    });
    setIncome('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold">Record Income</h2>
      <Input
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        placeholder="Enter your income"
        required
        id="income-input"
      />
      <Button type="submit">Record Income</Button>
    </form>
  );
}