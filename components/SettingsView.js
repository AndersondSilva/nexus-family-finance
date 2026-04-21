import { useState, useEffect } from 'react';
import { Settings, Globe, Users, Mail, CheckCircle2, XCircle, ChevronRight, Wallet, UserCircle, ShieldCheck } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion, query, collection, where, getDocs } from 'firebase/firestore';

export default function SettingsView({ user }) {
  const { locale, setLocale, t, formatCurrency } = useLocale();
  const [inviteEmail, setInviteEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, [user.uid]);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Find user by email
      const q = query(collection(db, 'users'), where('email', '==', inviteEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage({ type: 'error', text: 'Usuário não encontrado no Nexus.' });
      } else {
        const targetUserId = querySnapshot.docs[0].id;
        const targetRef = doc(db, 'users', targetUserId);
        
        // Add pending invite to target user
        await updateDoc(targetRef, {
          pendingInvites: arrayUnion({
            fromEmail: user.email,
            fromUid: user.uid,
            status: 'pending'
          })
        });
        
        setMessage({ type: 'success', text: `Convite enviado para ${inviteEmail}!` });
        setInviteEmail('');
      }
    } catch (error) {
      console.error("Link error:", error);
      setMessage({ type: 'error', text: 'Erro ao enviar convite.' });
    }
    setLoading(false);
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
          <p className="text-[var(--text-muted)] text-xs font-bold tracking-widest uppercase opacity-50">Nexus V1.5.0 Deployment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Preferências Regionais */}
        <section className="glass p-8 border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-[var(--primary)]" size={20} />
            <h2 className="text-xl font-bold font-heading">Regional Sovereignty</h2>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Manual Currency Override</label>
            <div className="grid grid-cols-1 gap-3">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setLocale(curr.locale)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    locale === curr.locale 
                    ? 'bg-[var(--primary)]/10 border-[var(--primary)] shadow-glow' 
                    : 'bg-white/5 border-white/5 opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className="font-bold">{curr.name}</span>
                  {locale === curr.locale && <CheckCircle2 size={18} className="text-[var(--primary)]" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gestão de Família */}
        <section className="glass p-8 border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-[var(--secondary)]" size={20} />
            <h2 className="text-xl font-bold font-heading">Family Link (Elo)</h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Vincule sua família pelo e-mail acadêmico ou pessoal para compartilhar o saldo familiar e relatórios conjuntos.
            </p>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-[var(--secondary)]/30 transition-all">
                <Mail size={18} className="text-[var(--text-muted)]" />
                <input 
                  type="email" 
                  placeholder="ex: familia@nexus.com"
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
                {loading ? 'Enviando...' : 'Convidar para Família'}
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

        {/* Convites Pendentes */}
        {profile?.pendingInvites?.length > 0 && (
          <section className="md:col-span-2 glass p-8 border-l-4 border-[var(--warning)] bg-[var(--warning)]/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-heading flex items-center gap-3">
                <ShieldCheck className="text-[var(--warning)]" /> Convites de Família
              </h3>
            </div>
            <div className="space-y-4">
              {profile.pendingInvites.map((invite, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl"><UserCircle size={24} /></div>
                    <div>
                      <p className="text-sm font-bold">{invite.fromEmail}</p>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium">Deseja unir o controle familiar</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-6 py-2 bg-[var(--success)]/20 text-[var(--success)] text-[10px] font-black uppercase rounded-lg hover:bg-[var(--success)]/30 transition-all">Aceitar</button>
                    <button className="px-6 py-2 bg-white/5 text-[var(--text-muted)] text-[10px] font-black uppercase rounded-lg hover:bg-white/10 transition-all">Recusar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
