"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, DollarSign, CreditCard, History, TrendingUp } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Ingresos y egresos', href: '/income-expenses', icon: DollarSign },
  { name: 'Cuotas', href: '/installments', icon: CreditCard },
  { name: 'Transacciones', href: '/transactions', icon: History },
  { name: 'Inversiones', href: '/investments', icon: TrendingUp },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Flamingo Finance</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700 ${
                pathname === item.href ? 'bg-gray-200 text-gray-700' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}