"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFinanceStore } from '@/lib/store';

export default function InstallmentPayments() {
  const [itemName, setItemName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const { toast } = useToast();
  const { addInstallmentPayment, installmentPayments } = useFinanceStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(totalAmount);
    const numberOfInstallments = parseInt(installments);
    if (isNaN(amount) || isNaN(numberOfInstallments)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for amount and installments.",
        variant: "destructive",
      });
      return;
    }
    addInstallmentPayment({ name: itemName, totalAmount: amount, installments: numberOfInstallments });
    toast({
      title: "Installment Payment Added",
      description: `${itemName}: $${amount.toFixed(2)} in ${numberOfInstallments} installments has been added.`,
    });
    setItemName('');
    setTotalAmount('');
    setInstallments('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Cuotas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          required
        />
        <Input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          placeholder="Total amount"
          required
        />
        <Input
          type="number"
          value={installments}
          onChange={(e) => setInstallments(e.target.value)}
          placeholder="Number of installments"
          required
        />
        <Button type="submit">Add Installment Payment</Button>
      </form>
      <ul className="list-disc pl-5">
        {installmentPayments.map((payment, index) => (
          <li key={index}>
            {payment.name}: ${payment.totalAmount.toFixed(2)} in {payment.installments} installments
            (${(payment.totalAmount / payment.installments).toFixed(2)} per installment)
          </li>
        ))}
      </ul>
    </div>
  );
}