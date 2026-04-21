import { auth } from '@/lib/firebase';
import { Sun, Moon, Bell, Search, User } from 'lucide-react';

export default function Navbar({ user, theme, toggleTheme }) {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border-b border-[var(--border-card)]">
      <div className="flex items-center gap-4 bg-[var(--bg-card)] px-4 py-2 rounded-2xl glass flex-1 max-w-md">
        <Search className="text-[var(--text-muted)] w-5 h-5" />
        <input 
          type="text" 
          placeholder="Buscar transações..." 
          className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-main)]"
        />
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--secondary)] rounded-full border-2 border-[var(--bg-main)]"></span>
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
        >
          {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-[var(--border-card)]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">{user?.displayName}</p>
            <p className="text-xs text-[var(--text-muted)]">Admin Família</p>
          </div>
          <img 
            src={user?.photoURL || 'https://ui-avatars.com/api/?name=User'} 
            alt="Avatar" 
            className="w-10 h-10 rounded-xl border-2 border-[var(--primary)] shadow-glow"
          />
        </div>
      </div>
    </nav>
  );
}
