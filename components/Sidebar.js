import { LayoutDashboard, TrendingUp, TrendingDown, PiggyBank, CreditCard, LogOut, ShoppingBag, Settings, HelpCircle, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function Sidebar({ user, onLogout, activeView, setActiveView }) {
  const { t, locale } = useLocale();

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: t.dashboard },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendário' },
    { id: 'analytics', icon: <TrendingUp size={20} />, label: 'Analytics' },
    { id: 'goals', icon: <Sparkles size={20} />, label: 'Meus Sonhos' },
    { id: 'expenses', icon: <TrendingDown size={20} />, label: t.expenses },
    { id: 'savings', icon: <PiggyBank size={20} />, label: t.savings },
    { id: 'debts', icon: <CreditCard size={20} />, label: t.debts },
  ];

  const secondaryMenu = [
    { id: 'settings', icon: <Settings size={18} />, label: 'Configurações' },
    { id: 'support', icon: <HelpCircle size={18} />, label: 'Suporte' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-80 glass m-6 border-none p-8 z-20 shadow-2xl overflow-y-auto">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-2 rounded-xl shadow-glow">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight font-heading text-white">NEXUS</span>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 px-4 font-heading">Sovereign Menu</p>
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
              activeView === item.id 
              ? 'btn-neon-sota shadow-glow' 
              : 'text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-[var(--text-main)]'
            }`}
          >
            <span className={`${activeView === item.id ? 'text-white' : 'group-hover:text-[var(--accent)]'} transition-colors`}>
              {item.icon}
            </span>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 px-4 font-heading">Intelligence</p>
        {secondaryMenu.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all text-sm font-medium ${
              activeView === item.id 
              ? 'text-white bg-white/5' 
              : 'text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-[var(--text-main)]'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 mb-6 px-2 bg-white/5 p-3 rounded-2xl border border-white/5">
          <img 
            src={user?.photoURL || 'https://ui-avatars.com/api/?name=User'} 
            className="w-10 h-10 rounded-xl border border-white/20 shadow-lg"
            alt="User avatar"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-white uppercase tracking-tight">{user?.displayName}</p>
            <p className="text-[10px] text-[var(--text-muted)] truncate font-mono">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-red-100 bg-red-500/20 hover:bg-red-500/40 border border-red-500/20 hover:border-red-500/40 transition-all font-bold text-sm shadow-lg group"
        >
          <LogOut size={18} className="group-hover:scale-110 transition-transform" />
          {locale === 'en-US' ? 'Secure Logout' : 'Sair com Segurança'}
        </button>
      </div>
    </aside>
  );
}
