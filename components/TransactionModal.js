import { useState } from 'react';
import { X, DollarSign, Tag, Users, User, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    scope: 'family',
    type: 'expense'
  });

  const categories = [
    'Carro (Combustível, Pneus, Mecânico, Prestação)',
    'Casa (Internet, Luz, Gás)',
    'Saúde (Remédios)',
    'Alimentação',
    'Roupas',
    'Lazer',
    'Telefone (Individual)',
    'Extras'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass w-full max-w-lg p-8 relative neon-border"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <DollarSign className="text-[var(--accent)]" /> Novo Lançamento
        </h2>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Descrição</label>
            <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[var(--border-card)]">
              <FileText size={18} className="text-[var(--primary)]" />
              <input 
                type="text" 
                placeholder="Ex: Supermercado Semanal"
                className="bg-transparent border-none outline-none w-full"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Valor R$</label>
              <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[var(--border-card)]">
                <span className="font-bold text-[var(--success)]">R$</span>
                <input 
                  type="number" 
                  placeholder="0,00"
                  className="bg-transparent border-none outline-none w-full"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Categoria</label>
              <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[var(--border-card)]">
                <Tag size={18} className="text-[var(--secondary)]" />
                <select 
                  className="bg-transparent border-none outline-none w-full text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Visibilidade (Escopo)</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, scope: 'family'})}
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                  formData.scope === 'family' 
                  ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-glow' 
                  : 'bg-[rgba(255,255,255,0.05)] border-[var(--border-card)] text-[var(--text-muted)]'
                }`}
              >
                <Users size={18} /> Família
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, scope: 'personal'})}
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                  formData.scope === 'personal' 
                  ? 'bg-[var(--secondary)] border-[var(--secondary)] text-white shadow-glow' 
                  : 'bg-[rgba(255,255,255,0.05)] border-[var(--border-card)] text-[var(--text-muted)]'
                }`}
              >
                <User size={18} /> Pessoal (Privado)
              </button>
            </div>
          </div>

          <button 
            type="button"
            className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold py-4 rounded-2xl shadow-glow hover:scale-[1.02] transition-all mt-4"
          >
            Confirmar Lançamento
          </button>
        </form>
      </motion.div>
    </div>
  );
}
