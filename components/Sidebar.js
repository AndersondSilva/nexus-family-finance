import { LayoutDashboard, TrendingUp, TrendingDown, PiggyBank, CreditCard, LogOut, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ user, onLogout }) {
  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', active: true },
    { icon: <TrendingUp />, label: 'Receitas' },
    { icon: <TrendingDown />, label: 'Despesas' },
    { icon: <PiggyBank />, label: 'Poupanças' },
    { icon: <CreditCard />, label: 'Dívidas' },
    { icon: <ShoppingBag />, label: 'Desejos' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 glass m-4 mr-0 p-6 z-20">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-2 rounded-xl shadow-glow">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">NEXUS <span className="text-[var(--primary)]">FINANCE</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              item.active 
              ? 'bg-[var(--primary)] text-white shadow-glow' 
              : 'text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-main)]'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-[var(--border-card)]">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-medium"
        >
          <LogOut />
          Sair
        </button>
      </div>
    </aside>
  );
}
