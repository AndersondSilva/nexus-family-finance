import { LayoutDashboard, Moon, Sun, ArrowRight, Shield, Zap, Heart, Globe, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function LoginScreen({ onLogin, theme, toggleTheme }) {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 overflow-x-hidden relative">
      
      {/* Navbar Minimalista */}
      <nav className="w-full max-w-7xl flex justify-between items-center z-50 mb-20 animate-fade-in">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Nexus Logo" className="w-10 h-10 object-contain" />
          <span className="text-lg font-bold tracking-tight font-heading uppercase text-white">NEXUS</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="glass p-3 rounded-xl hover:scale-110 transition-all text-white"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(0,242,255,0.1)] border border-[rgba(0,242,255,0.2)] px-4 py-2 rounded-full text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} /> New: SOTA 2026 Release
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-[0.9] tracking-tighter text-white">
            {t.newEntry.split(' ')[1]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] animate-gradient flex items-center gap-4">
              Intelligence <ArrowRight className="text-white w-12 h-12 md:w-20 md:h-20" />
            </span>
          </h1>
          <p className="text-[var(--text-muted)] mb-10 text-xl md:text-2xl max-w-lg leading-relaxed">
            {t.loginMsg}
          </p>

          <div className="flex flex-col gap-4 max-w-sm">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Acesso Direto</label>
                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-[var(--primary)]/30 transition-all">
                  <Mail size={18} className="text-[var(--text-muted)]" />
                  <input 
                    id="email-input"
                    type="email" 
                    placeholder="seu@email.com"
                    className="bg-transparent border-none outline-none w-full text-sm font-semibold text-white"
                  />
                </div>
              </div>
              <button 
                onClick={() => {
                  const email = document.getElementById('email-input').value;
                  if (email) onLogin('email', email);
                  else alert("Por favor, insira um e-mail válido.");
                }}
                className="w-full bg-[var(--primary)] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-glow active:scale-95"
              >
                Entrar com Link Mágico
              </button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-[var(--bg-main)] px-2 text-[var(--text-muted)]">Ou via SSO</span></div>
            </div>

            <button 
              onClick={() => onLogin('google')}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-all border border-white/10"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onLogin('apple')}
                className="bg-[#000000] text-white px-4 py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black/80 transition-all border border-white/10"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-4 h-4 invert" />
                Apple
              </button>
              <button 
                onClick={() => onLogin('microsoft')}
                className="bg-[#2F2F2F] text-white px-4 py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#3F3F3F] transition-all border border-white/10"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-4 h-4" />
                Microsoft
              </button>
            </div>
            <button className="glass px-8 py-3 rounded-2xl font-bold text-xs hover:bg-white/5 transition-all text-[#94a3b8] uppercase tracking-widest">
              Watch Demo
            </button>
            
            {/* Cláusula de Soberania de Dados */}
            <div className="mt-6 p-4 rounded-2xl bg-[var(--primary)]/5 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)]">
                <Shield size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sovereign Retention Clause</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed font-bold italic">
                "Para manter a pureza e integridade do Nexus, registros inativos por mais de 180 sóis (6 meses) serão devolvidos ao vácuo e apagados permanentemente."
              </p>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-8 text-[var(--text-muted)] text-sm">
            <div className="flex items-center gap-2"><Shield size={16} /> {t.personal}</div>
            <div className="flex items-center gap-2"><Heart size={16} /> {t.family}</div>
            <div className="flex items-center gap-2"><Globe size={16} /> International</div>
          </div>
        </motion.div>

        {/* Floating UI Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="glass p-8 border border-white/10 shadow-2xl relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="h-4 w-32 bg-white/5 rounded-full" />
              <div className="h-10 w-10 bg-[var(--primary)] rounded-full opacity-20" />
            </div>
            <div className="space-y-6">
              <div className="h-20 w-full bg-gradient-to-r from-[var(--primary)] to-transparent rounded-2xl opacity-20" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 w-full glass rounded-2xl border-none bg-white/[0.02]" />
                <div className="h-32 w-full glass rounded-2xl border-none bg-white/[0.02]" />
              </div>
              <div className="h-12 w-full glass rounded-full border-none bg-white/[0.02]" />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 5s linear infinite;
        }
      `}</style>
    </div>
  );
}
