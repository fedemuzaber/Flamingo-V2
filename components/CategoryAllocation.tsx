"use client"

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function CategoryAllocation() {
  const [allocations, setAllocations] = useState({
    supermarket: 33,
    outings: 33,
    savings: 34,
  });

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

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-semibold">Category Allocation</h2>
      {Object.entries(allocations).map(([category, value]) => (
        <div key={category} className="space-y-2">
          <Label htmlFor={category} className="capitalize">
            {category}: {value}%
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