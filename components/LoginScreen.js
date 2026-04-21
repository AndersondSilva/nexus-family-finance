import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { LayoutDashboard, Moon, Sun, ArrowRight, Shield, Zap, Heart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function LoginScreen({ onLogin, theme, toggleTheme }) {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 overflow-x-hidden relative">
      
      {/* Navbar Minimalista */}
      <nav className="w-full max-w-7xl flex justify-between items-center z-50 mb-20 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-2 rounded-xl shadow-glow">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
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

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onLogin}
              className="bg-white text-black px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.05] transition-all shadow-2xl active:scale-95"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
              Login with Google
            </button>
            <button className="glass px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all text-white">
              Watch Demo
            </button>
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
