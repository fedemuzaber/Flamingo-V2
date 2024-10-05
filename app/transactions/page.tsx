import Layout from '@/components/Layout';
import TransactionList from '@/components/TransactionList';

export default function TransactionsPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      <TransactionList />
    </Layout>
  );
}