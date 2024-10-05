"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFinanceStore } from '@/lib/store';

export default function TransactionList() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const { addTransaction, transactions } = useFinanceStore();

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    };
    addTransaction(newTransaction);
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Transactions</h2>
      <form onSubmit={handleAddTransaction} className="space-y-4">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          id="transaction-amount"
        />
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="supermarket">Supermarket</SelectItem>
            <SelectItem value="outings">Outings</SelectItem>
            <SelectItem value="savings">Savings/Investments</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          id="transaction-description"
        />
        <Button type="submit">Add Transaction</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell className="capitalize">{transaction.category}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}