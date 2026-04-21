import { useLocale } from '@/context/LocaleContext';
import { Sun, Moon, Bell, Search, Command, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ user, theme, toggleTheme }) {
  const { locale, setLocale, t } = useLocale();
  const [showLocales, setShowLocales] = useState(false);

  const languages = [
    { code: 'pt-BR', name: 'Brasil', flag: '🇧🇷' },
    { code: 'pt-PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'en-US', name: 'USA', flag: '🇺🇸' },
  ];

  return (
    <nav className="flex items-center justify-between px-10 py-8 z-30">
      <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl flex-1 max-w-lg shadow-xl group focus-within:border-[var(--primary)] transition-all">
        <Search className="text-[var(--text-muted)] w-5 h-5 group-focus-within:text-[var(--primary)]" />
        <input 
          type="text" 
          placeholder={`${t.dashboard}... (Alt + K)`}
          className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-main)] font-medium"
        />
        <div className="hidden sm:flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/10">
          <Command size={12} className="text-[var(--text-muted)]" />
          <span className="text-[10px] font-bold text-[var(--text-muted)]">K</span>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-10">
        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowLocales(!showLocales)}
            className="glass-interactive p-3 rounded-xl text-[var(--text-muted)] flex items-center gap-2"
          >
            <Globe size={20} />
            <span className="text-xs font-bold uppercase">{locale.split('-')[1]}</span>
          </button>
          
          {showLocales && (
            <div className="absolute top-full right-0 mt-2 w-48 glass p-2 z-50 animate-fade-in">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code);
                    setShowLocales(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-medium ${locale === lang.code ? 'text-[var(--accent)] bg-white/5' : ''}`}
                >
                  <span>{lang.flag} {lang.name}</span>
                  {locale === lang.code && <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-glow" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="glass-interactive p-3 rounded-xl text-[var(--text-muted)] relative">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[var(--secondary)] rounded-full ring-4 ring-[#0A0C11]"></span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="glass-interactive p-3 rounded-xl text-[var(--text-muted)] border-none"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <div className="h-10 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-4 bg-white/[0.03] p-1.5 pr-5 rounded-2xl border border-white/10 glass-interactive cursor-pointer">
          <img 
            src={user?.photoURL || 'https://ui-avatars.com/api/?name=User'} 
            alt="Avatar" 
            className="w-9 h-9 rounded-xl border border-white/10"
          />
          <div className="hidden md:block">
            <p className="text-sm font-bold leading-tight">{user?.displayName?.split(' ')[0]}</p>
            <p className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-tighter">Gold Member</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
