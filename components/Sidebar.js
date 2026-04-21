import { LayoutDashboard, TrendingUp, TrendingDown, PiggyBank, CreditCard, LogOut, ShoppingBag, Settings, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ user, onLogout }) {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
    { icon: <TrendingUp size={20} />, label: 'Analytics' },
    { icon: <TrendingDown size={20} />, label: 'Expenses' },
    { icon: <PiggyBank size={20} />, label: 'Savings' },
    { icon: <CreditCard size={20} />, label: 'Debts' },
    { icon: <ShoppingBag size={20} />, label: 'Wishlist' },
  ];

  const secondaryMenu = [
    { icon: <Settings size={18} />, label: 'Settings' },
    { icon: <HelpCircle size={18} />, label: 'Support' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-80 glass m-6 border-none p-8 z-20 shadow-2xl">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-2 rounded-xl shadow-glow">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight font-heading">NEXUS</span>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 px-4">Menu Principal</p>
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
              item.active 
              ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-glow' 
              : 'text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-[var(--text-main)]'
            }`}
          >
            <span className={`${item.active ? 'text-white' : 'group-hover:text-[var(--accent)]'} transition-colors`}>
              {item.icon}
            </span>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 px-4">Preferências</p>
        {secondaryMenu.map((item, idx) => (
          <button 
            key={idx}
            className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-[var(--text-main)] transition-all text-sm font-medium"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 mb-6 px-2">
          <img 
            src={user?.photoURL || 'https://ui-avatars.com/api/?name=User'} 
            className="w-10 h-10 rounded-xl border border-white/10"
            alt="User avatar"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.displayName}</p>
            <p className="text-[10px] text-[var(--text-muted)] truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-bold text-sm"
        >
          <LogOut size={18} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
}
