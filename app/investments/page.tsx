import Layout from '@/components/Layout';
import InvestmentDashboard from '@/components/InvestmentDashboard';
import InvestmentTransactions from '@/components/InvestmentTransactions';

export default function InvestmentsPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Inversiones</h1>
      <InvestmentDashboard />
      <InvestmentTransactions />
    </Layout>
  );
}