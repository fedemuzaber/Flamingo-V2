"use client"

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useFinanceStore } from '@/lib/store';

export default function BudgetAllocation() {
  const { totalIncome, fixedExpenses, updateBudgetAllocation } = useFinanceStore();
  const [allocations, setAllocations] = useState({
    supermarket: 33,
    outings: 33,
    savings: 34,
  });

  useEffect(() => {
    updateBudgetAllocation(allocations);
  }, [allocations, updateBudgetAllocation]);

  const handleAllocationChange = (category: keyof typeof allocations, value: number[]) => {
    const newValue = value[0];
    const otherCategories = Object.keys(allocations).filter(
      (key) => key !== category
    ) as (keyof typeof allocations)[];
    
    const remaining = 100 - newValue;
    const otherTotal = otherCategories.reduce(
      (sum, key) => sum + allocations[key],
      0
    );

    const newAllocations = { ...allocations, [category]: newValue };
    otherCategories.forEach((key) => {
      newAllocations[key] = Math.round(
        (allocations[key] / otherTotal) * remaining
      );
    });

    setAllocations(newAllocations);
  };

  const availableIncome = totalIncome - fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Budget Allocation</h2>
      <p>Available for allocation: ${availableIncome.toFixed(2)}</p>
      {Object.entries(allocations).map(([category, value]) => (
        <div key={category} className="space-y-2">
          <Label htmlFor={category} className="capitalize">
            {category}: {value}% (${(availableIncome * value / 100).toFixed(2)})
          </Label>
          <Slider
            id={category}
            min={0}
            max={100}
            step={1}
            value={[value]}
            onValueChange={(newValue) =>
              handleAllocationChange(category as keyof typeof allocations, newValue)
            }
          />
        </div>
      ))}
    </div>
  );
}