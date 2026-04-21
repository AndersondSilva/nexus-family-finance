import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { LayoutDashboard, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginScreen({ onLogin, theme, toggleTheme }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--bg-main)] overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary)] filter blur-[120px] opacity-20 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--secondary)] filter blur-[120px] opacity-20 rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 max-w-md w-full text-center relative z-10 neon-border"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-3 rounded-2xl shadow-glow">
            <LayoutDashboard className="text-white w-8 h-8" />
          </div>
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-xl hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>

        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">FINANCE</span>
        </h1>
        <p className="text-[var(--text-muted)] mb-10 text-lg">
          O controle financeiro do futuro para você e sua família.
        </p>

        <button 
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-4 bg-[var(--text-main)] text-[var(--bg-main)] py-4 px-6 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          Entrar com Google
        </button>

        <div className="mt-8 text-sm text-[var(--text-muted)]">
          <p>Seja bem-vindo ao sistema de gestão 11/10.</p>
        </div>
      </motion.div>
    </div>
  );
}
