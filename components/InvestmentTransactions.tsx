"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFinanceStore } from '@/lib/store';

export default function InvestmentTransactions() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { addTransaction, transactions } = useFinanceStore();

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvestment = {
      id: Date.now(),
      amount: parseFloat(amount),
      category: 'investment',
      description: `${name}: ${description}`,
      date: new Date().toISOString(),
    };
    addTransaction(newInvestment);
    setAmount('');
    setName('');
    setDescription('');
  };

  const investmentTransactions = transactions.filter(t => t.category === 'investment');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Registro de Inversiones</h2>
      <form onSubmit={handleAddInvestment} className="space-y-4">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          required
          id="investment-amount"
        />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la inversión"
          required
          id="investment-name"
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          required
          id="investment-description"
        />
        <Button type="submit">Agregar Inversión</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investmentTransactions.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell>{new Date(investment.date).toLocaleDateString()}</TableCell>
              <TableCell>{investment.description.split(':')[0]}</TableCell>
              <TableCell>{investment.description.split(':')[1]}</TableCell>
              <TableCell>${investment.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}