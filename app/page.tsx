import { Suspense } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Financial Overview</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </Layout>
  );
}