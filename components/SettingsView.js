import { useState, useEffect } from 'react';
import { Settings, Globe, Users, Mail, CheckCircle2, XCircle, ChevronRight, Wallet, UserCircle, ShieldCheck } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { supabase } from '@/lib/supabase';
import { createInvitation, getPendingInvitations, acceptInvitation, resetUserData, getUserProfile } from '@/lib/db';

export default function SettingsView({ user }) {
  const { locale, setLocale, t, formatCurrency } = useLocale();
  const [inviteEmail, setInviteEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profile, setProfile] = useState(null);
  const [incomingInvites, setIncomingInvites] = useState([]);

  useEffect(() => {
    // Buscar perfil inicial
    const fetchProfile = async () => {
      const data = await getUserProfile(user.id);
      setProfile(data);
    };
    fetchProfile();

    // Escutar convites pendentes (Supabase Realtime)
    const fetchInvites = async () => {
      const data = await getPendingInvitations(user.email);
      setIncomingInvites(data);
    };
    fetchInvites();

    // Inscrever para mudanças em convites
    const channel = supabase
      .channel('invitations-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invitations',
        filter: `to_email=eq.${user.email.toLowerCase()}`
      }, () => {
        fetchInvites();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user.id, user.email]);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    const emailToInvite = inviteEmail.toLowerCase().trim();
    
    if (emailToInvite === user.email.toLowerCase()) {
      setMessage({ type: 'error', text: 'Você não pode convidar a si mesmo.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Criar convite no Supabase
      await createInvitation(user.email, user.id, emailToInvite);

      // 2. Disparar e-mail automático via API Sota
      try {
        await fetch('/api/invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toEmail: emailToInvite, fromEmail: user.email })
        });
      } catch (e) {
        console.error("Auto-email failure, but DB saved:", e);
      }
      
      setMessage({ type: 'success', text: `Sucesso! Convite enviado automaticamente para ${emailToInvite}.` });
      setInviteEmail('');
    } catch (error) {
      console.error("Invite error:", error);
      setMessage({ type: 'error', text: `Erro ao enviar: ${error.message || error.details || 'Falha desconhecida'}` });
    }
    setLoading(false);
  };

  const handleAcceptInvite = async (invite) => {
    try {
      await acceptInvitation(invite.id, user.id, invite.from_uid);
      setMessage({ type: 'success', text: 'Vínculo familiar estabelecido com sucesso!' });
      // Forçar refresh do perfil local
      const newProfile = await getUserProfile(user.id);
      setProfile(newProfile);
    } catch (error) {
      console.error("Accept error:", error);
      setMessage({ type: 'error', text: 'Erro ao aceitar convite.' });
    }
  };

  const handleResetAccount = async () => {
    if (!confirm("AVISO: Isso apagará TODAS as suas transações e removerá seu vínculo familiar. Esta ação é irreversível. Deseja continuar?")) {
      return;
    }

    setLoading(true);
    try {
      await resetUserData(user.id);
      setMessage({ type: 'success', text: 'Sua conta foi zerada com sucesso. Reiniciando soberania...' });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error("Reset error:", error);
      setMessage({ type: 'error', text: 'Erro ao zerar dados.' });
    } finally {
      setLoading(false);
    }
  };

  const currencies = [
    { code: 'BRL', name: 'Real (R$)', locale: 'pt-BR' },
    { code: 'EUR', name: 'Euro (€)', locale: 'pt-PT' },
    { code: 'USD', name: 'Dollar ($)', locale: 'en-US' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-glow">
          <Settings className="text-[var(--accent)]" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black font-heading tracking-tighter uppercase italic">Sovereign Settings</h1>
          <p className="text-[var(--text-muted)] text-xs font-bold tracking-widest uppercase opacity-50">Nexus V1.6.2 Deployment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Preferências de Idioma e Moeda */}
        <section className="glass p-8 border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-[var(--primary)]" size={20} />
            <h2 className="text-xl font-bold font-heading">Idioma e Moeda</h2>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Selecione seu Locale</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
                { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
                { code: 'pt-PT', name: 'Português (Portugal)', flag: '🇵🇹' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code, user.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    locale === lang.code 
                    ? 'bg-[var(--primary)]/10 border-[var(--primary)] shadow-glow' 
                    : 'bg-white/5 border-white/5 opacity-50 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-bold">{lang.name}</span>
                  </div>
                  {locale === lang.code && <CheckCircle2 size={18} className="text-[var(--primary)]" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gestão de Família */}
        <section className="glass p-8 border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-[var(--secondary)]" size={20} />
            <h2 className="text-xl font-bold font-heading">Gestão Familiar (Elo)</h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Vincule sua família para compartilhar o saldo familiar e relatórios conjuntos.
            </p>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-[var(--secondary)]/30 transition-all">
                <Mail size={18} className="text-[var(--text-muted)]" />
                <input 
                  type="email" 
                  placeholder="familia@nexus.com"
                  className="bg-transparent border-none outline-none w-full text-sm font-semibold"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <button 
                onClick={handleInvite}
                disabled={loading}
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? 'Transmitindo...' : 'Convidar para Família'}
              </button>
            </div>

            {message.text && (
              <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                message.type === 'success' ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--danger)]/10 text-[var(--danger)]'
              }`}>
                {message.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {message.text}
              </div>
            )}
          </div>
        </section>

        {/* Segurança Soberana */}
        <section className="glass p-8 border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-[var(--accent)]" size={20} />
            <h2 className="text-xl font-bold font-heading">Segurança</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-2xl">
              <div>
                <p className="text-sm font-bold">Auto-Logout Ativo</p>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Desconexão automática (30min)</p>
              </div>
              <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse shadow-glow" />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] italic leading-relaxed">
              Proteção ativa contra ociosidade para garantir a soberania dos seus dados.
            </p>
          </div>
        </section>

        {/* Convites Pendentes */}
        {incomingInvites.length > 0 && (
          <section className="md:col-span-2 glass p-8 border-l-4 border-[var(--warning)] bg-[var(--warning)]/5">
            <h3 className="text-xl font-bold font-heading flex items-center gap-3 mb-6">
              <UserCircle className="text-[var(--warning)]" /> Convites Recebidos
            </h3>
            <div className="space-y-4">
              {incomingInvites.map((invite, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-sm font-bold">{invite.from_email}</p>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Deseja unir o controle familiar</p>
                  </div>
                  <button 
                    onClick={() => handleAcceptInvite(invite)}
                    className="px-6 py-2 bg-[var(--success)]/20 text-[var(--success)] text-[10px] font-black uppercase rounded-lg hover:bg-[var(--success)]/30 transition-all"
                  >
                    Aceitar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Zona de Perigo (Danger Zone) */}
        <section className="md:col-span-2 glass p-8 border-l-4 border-[var(--danger)] bg-[var(--danger)]/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="text-[var(--danger)]" size={20} />
            <h2 className="text-xl font-bold font-heading">Zona de Perigo (Danger Zone)</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-sm font-bold text-[var(--danger)]">Zerar Banco de Dados</p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md">
                Esta ação apagará permanentemente **todas** as suas transações, categorias personalizadas e removerá vínculos familiares. **Esta operação não pode ser desfeita.**
              </p>
            </div>
            <button 
              onClick={handleResetAccount}
              disabled={loading}
              className="w-full sm:w-auto px-12 py-4 bg-[var(--danger)]/20 text-[var(--danger)] border border-[var(--danger)]/30 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[var(--danger)] transition-all hover:text-white disabled:opacity-50 shadow-glow-danger"
            >
              Zerar Agora
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
