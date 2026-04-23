'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, TrendingUp, TrendingDown, PiggyBank, CreditCard, LogOut, Sun, Moon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DashboardView from '@/components/DashboardView';
import LoginScreen from '@/components/LoginScreen';
import TransactionModal from '@/components/TransactionModal';
import CalendarView from '@/components/CalendarView';
import AnnualProjection from '@/components/AnnualProjection';
import JuliusAdvisor from '@/components/JuliusAdvisor';
import SettingsView from '@/components/SettingsView';
import GoalsManager from '@/components/GoalsManager';
import SupportView from '@/components/SupportView';
import { addTransaction, getTransactions, getUserProfile, upsertUserProfile } from '@/lib/db';
import { useIdleTimer } from '@/lib/hooks';

export default function Home() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [scope, setScope] = useState('family');
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeView, setActiveView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch transactions logic
  const fetchTransactions = async (uid, familyId, currentScope) => {
    setDataLoading(true);
    try {
      const data = await getTransactions(uid, familyId || 'default', currentScope);
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const profile = await getUserProfile(session.user.id);
        setUserProfile(profile);
        if (profile) {
          fetchTransactions(session.user.id, profile.family_id, scope);
        }
      }
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        
        let profile;
        if (event === 'SIGNED_IN') {
          const profileData = {
            id: session.user.id,
            email: session.user.email,
            display_name: session.user.user_metadata.full_name || session.user.email.split('@')[0],
            photo_url: session.user.user_metadata.avatar_url,
            role: 'admin'
          };
          profile = await upsertUserProfile(profileData);
        } else {
          profile = await getUserProfile(session.user.id);
        }
        setUserProfile(profile);
        fetchTransactions(session.user.id, profile?.family_id, scope);
      } else {
        setUser(null);
        setUserProfile(null);
        setTransactions([]);
      }
      setLoading(false);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Listen for custom refresh events
    const handleRefresh = () => {
      if (user && userProfile) {
        fetchTransactions(user.id, userProfile.family_id, scope);
      }
    };
    window.addEventListener('transaction-added', handleRefresh);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('transaction-added', handleRefresh);
    };
  }, []);

  // Re-fetch when scope changes
  useEffect(() => {
    if (user && userProfile) {
      fetchTransactions(user.id, userProfile.family_id, scope);
    }
  }, [scope]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogin = async (providerName) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: providerName === 'google' ? 'google' : (providerName === 'apple' ? 'apple' : 'azure'),
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Automação: Desconexão por Ociosidade (Padrão 30 minutos)
  useIdleTimer(() => {
    if (user) {
      console.log("[Sovereign Guard] Ociosidade detectada. Desconectando...");
      handleLogout();
    }
  }, 30 * 60 * 1000);

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
                <DashboardView 
                  user={user} 
                  transactions={transactions}
                  scope={scope}
                  setScope={setScope}
                  loading={dataLoading}
                  onAddClick={() => setIsModalOpen(true)} 
                />
              </div>
              <div className="space-y-8">
                <JuliusAdvisor transactions={transactions} user={user} />
                <div className="glass p-8 border-l-4 border-[var(--accent)]">
                   <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Saúde do Mês</h3>
                   <p className={`text-3xl font-black font-heading ${transactions.reduce((acc, c) => c.type === 'income' ? acc + c.amount : acc - c.amount, 0) >= 0 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                     {transactions.reduce((acc, c) => c.type === 'income' ? acc + c.amount : acc - c.amount, 0) >= 0 ? 'NO AZUL' : 'NO VERMELHO'}
                   </p>
                   <p className="text-[10px] font-bold text-[var(--text-muted)] mt-1 uppercase">Projeção: R$ {transactions.reduce((acc, c) => c.type === 'income' ? acc + c.amount : acc - c.amount, 0).toFixed(2)}</p>
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
          {activeView === 'goals' && (
            <GoalsManager />
          )}
          {activeView === 'settings' && (
            <SettingsView user={user} />
          )}
          {activeView === 'support' && (
            <SupportView user={user} />
          )}
          {!['dashboard', 'calendar', 'analytics', 'goals', 'settings', 'support', 'expenses', 'savings', 'debts'].includes(activeView) && (
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
          user={user}
          onClose={() => setIsModalOpen(false)} 
          onAdd={async (data) => {
            try {
              await addTransaction(data, user.id, userProfile?.family_id || 'default');
              setIsModalOpen(false);
              // Recarregar dados
              window.dispatchEvent(new CustomEvent('transaction-added'));
            } catch (error) {
              alert("Erro ao salvar transação. Verifique sua conexão.");
            }
          }}
        />
      </div>
    </div>
  );
}
