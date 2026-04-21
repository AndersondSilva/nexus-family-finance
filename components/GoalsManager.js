import { useState, useEffect } from 'react';
import { Target, Star, Rocket, GraduationCap, Plane, Car, Home, TrendingUp, Plus, Sparkles, Trophy } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';

export default function GoalsManager() {
  const { t, formatCurrency } = useLocale();
  const [goals, setGoals] = useState([
    { id: 1, title: 'Viagem Japão 2027', category: 'travel', target: 25000, current: 8500, icon: <Plane /> },
    { id: 2, title: 'Especialização IA SOTA', category: 'study', target: 12000, current: 4000, icon: <GraduationCap /> },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: '', category: 'other' });

  const categories = [
    { id: 'travel', icon: <Plane size={18} />, label: 'Viagem' },
    { id: 'study', icon: <GraduationCap size={18} />, label: 'Estudos' },
    { id: 'car', icon: <Car size={18} />, label: 'Automóvel' },
    { id: 'home', icon: <Home size={18} />, label: 'Imóvel' },
    { id: 'investment', icon: <TrendingUp size={18} />, label: 'Investimento' },
    { id: 'other', icon: <Target size={18} />, label: 'Outro' },
  ];

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;
    const goal = {
      id: Date.now(),
      title: newGoal.title,
      target: parseFloat(newGoal.target),
      current: 0,
      category: newGoal.category,
      icon: categories.find(c => c.id === newGoal.category)?.icon || <Star />
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', target: '', category: 'other' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tighter uppercase italic flex items-center gap-3">
             <Sparkles className="text-[var(--accent)]" /> Realizador de Sonhos
          </h2>
          <p className="text-[var(--text-muted)] text-xs font-bold tracking-widest uppercase mt-1">Sovereign Goals V1.5.0</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.05] transition-all shadow-glow"
        >
          <Plus size={16} /> Novo Sonho
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div key={goal.id} className="glass p-8 border-white/5 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {goal.icon}
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg text-[var(--accent)]">
                  {goal.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight text-white">{goal.title}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Acumulado</p>
                    <p className="text-lg font-black font-heading">{formatCurrency(goal.current)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Meta</p>
                    <p className="text-sm font-bold opacity-60">{formatCurrency(goal.target)}</p>
                  </div>
                </div>

                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] shadow-glow transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-[var(--accent)]">{progress.toFixed(0)}% Concluído</span>
                  {progress >= 100 ? (
                    <span className="flex items-center gap-1 text-[var(--success)]"><Trophy size={12} /> Realizado!</span>
                  ) : (
                    <span className="text-[var(--text-muted)]">Faltam {formatCurrency(goal.target - goal.current)}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass w-full max-w-lg p-8 border-white/10 relative">
            <h3 className="text-2xl font-black font-heading mb-8 uppercase italic">Qual o seu próximo objetivo?</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Nome do Sonho</label>
                <input 
                  type="text" 
                  placeholder="Ex: Eurotrip 2026"
                  className="w-full bg-white/5 p-4 rounded-xl border border-white/5 text-sm font-bold outline-none focus:border-[var(--accent)]/30 transition-all"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Valor Alvo</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-white/5 p-4 rounded-xl border border-white/5 text-sm font-bold outline-none"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Categoria</label>
                  <select 
                    className="w-full bg-white/5 p-4 rounded-xl border border-white/5 text-sm font-bold outline-none appearance-none"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c.id} value={c.id} className="bg-[#0A0C11]">{c.label}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-[var(--text-muted)] hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleAddGoal}
                  className="flex-1 px-8 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-[1.05] transition-all"
                >
                  Confirmar Soberania
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
