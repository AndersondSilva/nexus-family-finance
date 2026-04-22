import { Zap, AlertTriangle, TrendingUp, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JuliusAdvisor({ transactions, user }) {
  // Lógica de Análise SOTA Real
  const calculateAnalysis = () => {
    if (!transactions || transactions.length === 0) {
      return {
        topCategory: "Nenhum dado",
        percentageOver: 0,
        savingTip: "Comece a lançar suas transações para que eu possa analisar seu comportamento financeiro.",
        goalProgress: 0,
        status: "safe"
      };
    }

    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');
    const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);
    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);

    // Agrupar por categoria
    const categoryTotals = expenses.reduce((acc, t) => {
      const catName = t.category || 'Outros';
      acc[catName] = (acc[catName] || 0) + t.amount;
      return acc;
    }, {});

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const topCat = sortedCategories[0] || ["Nenhuma", 0];

    // Dica dinâmica baseada no balanço
    let tip = "Seu balanço está saudável. Considere investir o excedente em ativos de baixo risco.";
    if (totalExpenses > totalIncome * 0.8) {
      tip = `Atenção: Seus gastos representam ${( (totalExpenses / (totalIncome || 1)) * 100).toFixed(0)}% da sua renda. Reduzir em '${topCat[0]}' pode ajudar.`;
    } else if (totalExpenses === 0 && totalIncome > 0) {
      tip = "Excelente! Você ainda não teve gastos este mês. Mantenha o foco!";
    }

    return {
      topCategory: topCat[0],
      percentageOver: totalIncome > 0 ? ((topCat[1] / totalIncome) * 100).toFixed(1) : 0,
      savingTip: tip,
      goalProgress: totalIncome > 0 ? Math.min(100, (( (totalIncome - totalExpenses) / (totalIncome * 0.2 || 1) ) * 100).toFixed(0)) : 0,
      status: totalExpenses > totalIncome ? "critical" : (totalExpenses > totalIncome * 0.7 ? "attention" : "safe")
    };
  };

  const analysis = calculateAnalysis();
  const statusColors = {
    safe: "var(--accent)",
    attention: "var(--secondary)",
    critical: "var(--danger)"
  };

  return (
    <div className={`glass p-8 relative overflow-hidden border-l-4`} style={{ borderColor: statusColors[analysis.status] }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${statusColors[analysis.status]}20`, color: statusColors[analysis.status] }}>
          <Sparkles size={20} className="animate-pulse" />
        </div>
        <h3 className="text-xl font-black font-heading tracking-tight uppercase italic">Julius Advisor <span className="text-[10px] not-italic opacity-50 ml-2">v2.1 SOTA</span></h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
          <AlertTriangle className="shrink-0 mt-1" size={18} style={{ color: statusColors[analysis.status] }} />
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Concentração de Gastos</p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Você destinou <span className="text-white font-black">{analysis.percentageOver}%</span> da renda para <span className="font-black" style={{ color: statusColors[analysis.status] }}>{analysis.topCategory}</span>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
          <Zap className="text-[var(--accent)] shrink-0 mt-1" size={18} />
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Insight Soberano</p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {analysis.savingTip}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">
              <Target size={12} /> Saúde Financeira
            </div>
            <span className="text-xl font-black" style={{ color: statusColors[analysis.status] }}>{analysis.goalProgress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${analysis.goalProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r shadow-glow"
              style={{ backgroundImage: `linear-gradient(to right, var(--primary), ${statusColors[analysis.status]})` }}
            />
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.03] filter blur-3xl" style={{ backgroundColor: statusColors[analysis.status] }} />
    </div>
  );
}
