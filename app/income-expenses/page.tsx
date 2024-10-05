import Layout from '@/components/Layout';
import IncomeForm from '@/components/IncomeForm';
import FixedExpenses from '@/components/FixedExpenses';
import BudgetAllocation from '@/components/BudgetAllocation';


export default function IncomeExpensesPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Income and Expenses</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <IncomeForm />
          <FixedExpenses />
        </div>
        <div className="space-y-6">
          <BudgetAllocation />
        </div>
      </div>
    </Layout>
  );
}