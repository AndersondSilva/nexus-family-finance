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

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
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
    <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <Navbar user={user} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <DashboardView user={user} onAddClick={() => setIsModalOpen(true)} />
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
