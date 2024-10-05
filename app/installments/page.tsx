import Layout from '@/components/Layout';
import InstallmentPayments from '@/components/InstallmentPayments';

export default function InstallmentsPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Cuotas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <InstallmentPayments />
        </div>
      </div>
    </Layout>
  );
}


