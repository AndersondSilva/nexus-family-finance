'use client';

import { useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { LayoutDashboard, TrendingUp, TrendingDown, PiggyBank, CreditCard, LogOut, Sun, Moon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DashboardView from '@/components/DashboardView';
import LoginScreen from '@/components/LoginScreen';
import TransactionModal from '@/components/TransactionModal';
import CalendarView from '@/components/CalendarView';
import AnnualProjection from '@/components/AnnualProjection';
import FinancialTips from '@/components/FinancialTips';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [activeView, setActiveView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg-main)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
      <Sidebar 
        user={user} 
        onLogout={handleLogout} 
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar user={user} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeView === 'dashboard' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <DashboardView user={user} onAddClick={() => setIsModalOpen(true)} />
              </div>
              <div className="space-y-8">
                <FinancialTips />
                <div className="glass p-8 border-l-4 border-[var(--accent)]">
                   <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Saúde do Mês</h3>
                   <p className="text-3xl font-black font-heading text-[var(--danger)]">NO VERMELHO</p>
                   <p className="text-[10px] font-bold text-[var(--text-muted)] mt-1 uppercase">Projeção: -R$ 450,00</p>
                </div>
              </div>
            </div>
          )}
          {activeView === 'calendar' && (
            <CalendarView user={user} />
          )}
          {activeView === 'analytics' && (
             <div className="h-full space-y-8">
               <AnnualProjection />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass p-8">
                    <h3 className="text-xl font-black mb-4 font-heading">Estimativa Total 2026</h3>
                    <p className="text-4xl font-black text-[var(--accent)]">R$ 48.850,00</p>
                  </div>
                  <div className="glass p-8">
                    <h3 className="text-xl font-black mb-4 font-heading">Dívidas em Aberto</h3>
                    <p className="text-4xl font-black text-[var(--danger)]">R$ 12.400,00</p>
                  </div>
               </div>
             </div>
          )}
          {!['dashboard', 'calendar', 'analytics'].includes(activeView) && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 animate-fade-in opacity-50">
              <div className="p-8 rounded-full bg-white/5 border border-white/10">
                <LayoutDashboard size={48} className="text-[var(--accent)]" />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-tighter">Vista em Desenvolvimento</h2>
              <p className="text-[var(--text-muted)]">A seção <span className="text-white font-bold">{activeView.toUpperCase()}</span> estará disponível na v1.5.0</p>
              <button 
                onClick={() => setActiveView('dashboard')}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-xs uppercase"
              >
                Voltar ao Dashboard
              </button>
            </div>
          )}
        </main>

        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdd={(data) => {
            console.log("New Transaction:", data);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}
