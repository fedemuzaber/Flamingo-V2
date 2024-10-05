import { create } from 'zustand';

interface FixedExpense {
  name: string;
  amount: number;
}

interface InstallmentPayment {
  name: string;
  totalAmount: number;
  installments: number;
}

interface Transaction {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface FinanceStore {
  totalIncome: number;
  fixedExpenses: FixedExpense[];
  budgetAllocation: Record<string, number>;
  installmentPayments: InstallmentPayment[];
  transactions: Transaction[];
  addIncome: (amount: number) => void;
  addFixedExpense: (expense: FixedExpense) => void;
  updateBudgetAllocation: (allocation: Record<string, number>) => void;
  addInstallmentPayment: (payment: InstallmentPayment) => void;
  addTransaction: (transaction: Transaction) => void;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  totalIncome: 0,
  fixedExpenses: [],
  budgetAllocation: {
    supermarket: 33,
    outings: 33,
    savings: 34,
  },
  installmentPayments: [],
  transactions: [],
  addIncome: (amount) => set((state) => ({ totalIncome: state.totalIncome + amount })),
  addFixedExpense: (expense) => set((state) => ({ fixedExpenses: [...state.fixedExpenses, expense] })),
  updateBudgetAllocation: (allocation) => set({ budgetAllocation: allocation }),
  addInstallmentPayment: (payment) => set((state) => ({ installmentPayments: [...state.installmentPayments, payment] })),
  addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
}));