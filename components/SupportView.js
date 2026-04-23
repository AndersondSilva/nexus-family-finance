import { useState, useEffect } from 'react';
import { HelpCircle, Send, MessageSquare, Mail, MessageCircle, ChevronRight, CheckCircle2, Zap, Clock } from 'lucide-react';
import { saveFeedback, getUserFeedback } from '@/lib/db';

export default function SupportView({ user }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const data = await getUserFeedback(user.id);
      setFeedbacks(data);
    };
    fetchFeedbacks();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await saveFeedback(user.id, message);
      setSuccess(true);
      setMessage('');
      
      // Refresh list
      const data = await getUserFeedback(user.id);
      setFeedbacks(data);
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const supportChannels = [
    {
      title: "WhatsApp Direto",
      desc: "Fale com o desenvolvedor em tempo real.",
      icon: <MessageCircle className="text-[#25D366]" />,
      link: "https://wa.me/351912345678", // Exemplo de link
      color: "bg-[#25D366]/10"
    },
    {
      title: "E-mail Oficial",
      desc: "Para questões formais e parcerias.",
      icon: <Mail className="text-[var(--primary)]" />,
      link: "mailto:andersonjdasilva@gmail.com",
      color: "bg-[var(--primary)]/10"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-glow">
          <HelpCircle className="text-[var(--accent)]" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black font-heading tracking-tighter uppercase italic">Sovereign Support</h1>
          <p className="text-[var(--text-muted)] text-xs font-bold tracking-widest uppercase opacity-50">Nexus Intelligence Hub</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna da Esquerda: Canais de Contato */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-6">Canais Rápidos</h3>
          {supportChannels.map((channel, idx) => (
            <a 
              key={idx}
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass p-6 border-white/5 hover:border-white/20 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {channel.icon}
              </div>
              <h4 className="font-bold text-sm mb-1">{channel.title}</h4>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">{channel.desc}</p>
            </a>
          ))}

          <div className="glass p-6 border-[var(--accent)]/20 bg-[var(--accent)]/5">
            <div className="flex items-center gap-2 mb-2 text-[var(--accent)]">
              <Zap size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">SOTA Roadmap</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed italic">
              "Em breve: Consultoria automática do Julius v2.0 com análise preditiva de faturas."
            </p>
          </div>
        </div>

        {/* Coluna da Direita: Formulário de Feedback */}
        <div className="md:col-span-2 space-y-8">
          <section className="glass p-8 border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-black font-heading mb-2">Mensagem ao Desenvolvedor</h2>
              <p className="text-sm text-[var(--text-muted)] mb-8">
                Sugestões, bugs ou ideias para a próxima versão? Sua voz é o motor da evolução do Nexus.
              </p>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-scale-in">
                  <div className="w-16 h-16 bg-[var(--success)]/20 text-[var(--success)] rounded-full flex items-center justify-center shadow-glow">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="font-bold text-[var(--success)]">Feedback enviado com sucesso!</p>
                  <p className="text-xs text-[var(--text-muted)] text-center">Obrigado por ajudar a tornar o Nexus mais soberano.</p>
                  <button onClick={() => setSuccess(false)} className="text-[10px] uppercase tracking-widest font-black opacity-50 hover:opacity-100">Enviar outra mensagem</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm min-h-[200px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-white/20 font-medium"
                      placeholder="Descreva sua experiência ou relate um problema..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <MessageSquare size={18} className="absolute top-6 right-6 text-white/10" />
                  </div>
                  <button 
                    disabled={loading || !message.trim()}
                    className="w-full btn-neon-sota py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? 'Transmitindo...' : (
                      <>
                        Enviar Mensagem Soberana <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] rounded-full"></div>
          </section>

          {/* Histórico de Feedbacks */}
          <div className="space-y-4 animate-slide-up">
            <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
              <Clock size={14} /> Seu Histórico de Feedback
            </h3>
            <div className="space-y-3">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, idx) => (
                  <div key={idx} className="glass p-5 border-white/5 bg-white/[0.02]">
                    <p className="text-sm text-white/80 leading-relaxed mb-3">{fb.message}</p>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-tighter">
                      <CheckCircle2 size={12} className="text-[var(--success)]" /> Enviado em {new Date(fb.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass p-8 border-white/5 border-dashed text-center opacity-40">
                   <p className="text-xs font-bold uppercase tracking-widest">Nenhuma mensagem enviada ainda.</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 border-white/5 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-white">4.9/5</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">User Satisfaction</span>
            </div>
            <div className="glass p-6 border-white/5 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-[var(--accent)]">v1.7.5</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Current Build</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
