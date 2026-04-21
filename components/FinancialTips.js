import { Lightbulb, TrendingDown, Target, ShieldCheck, Zap } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';

export default function FinancialTips() {
  const { t } = useLocale();

  const tips = [
    {
      icon: <Zap size={18} />,
      title: 'Regra 50/30/20',
      text: 'Aloque 50% para necessidades, 30% para desejos e 20% para poupança/dívidas. Você está usando 65% em necessidades.',
      priority: 'high'
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Reserva de Emergência',
      text: 'Sua reserva cobre apenas 2 meses. O ideal para sua estabilidade é 6 meses (R$ 30.000).',
      priority: 'medium'
    },
    {
      icon: <TrendingDown size={18} />,
      title: 'Análise de Assinaturas',
      text: 'Detectamos 5 serviços de streaming. Cancelar 2 pode economizar R$ 1.200 por ano.',
      priority: 'low'
    },
    {
      icon: <Target size={18} />,
      title: 'Organização de Cartão',
      text: 'Evite o ciclo "pagar e Reusar". Isso mantém seu limite sempre no teto e gera juros ocultos.',
      priority: 'critical'
    }
  ];

  return (
    <div className="glass p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[var(--warning)]/10 rounded-lg">
          <Lightbulb className="text-[var(--warning)]" size={20} />
        </div>
        <h2 className="text-xl font-black font-heading tracking-tight">{t.savingsTips || 'Nexus Advisor'}</h2>
      </div>

      <div className="space-y-4 flex-1">
        {tips.map((tip, idx) => (
          <div 
            key={idx} 
            className={`p-5 rounded-2xl border transition-all hover:bg-white/5 cursor-default ${
              tip.priority === 'critical' ? 'border-red-500/20 bg-red-500/5' : 'border-white/5 bg-white/0'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`${
                tip.priority === 'critical' ? 'text-red-400' :
                tip.priority === 'high' ? 'text-[var(--accent)]' :
                'text-[var(--text-muted)]'
              }`}>
                {tip.icon}
              </span>
              <h4 className="text-xs font-black uppercase tracking-widest text-white">{tip.title}</h4>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">
              {tip.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
          Gerar Relatório Completo PDF
        </button>
      </div>
    </div>
  );
}
