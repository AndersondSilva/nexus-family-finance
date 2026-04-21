import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, PiggyBank, CreditCard, 
  Plus, Filter, Users, User as UserIcon,
  Activity, ArrowUpRight, ArrowDownRight, Zap
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import AIDoc from '@/components/AIDoc';
import { useLocale } from '@/context/LocaleContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function DashboardView({ user, onAddClick }) {
  const [scope, setScope] = useState('family'); 
  const { t, formatCurrency } = useLocale();

  const kpis = [
    { title: t.balance, rawValue: 15420, icon: <TrendingUp size={20} />, color: 'var(--accent)', trend: '+12%', up: true },
    { title: t.expenses, rawValue: 4120.45, icon: <TrendingDown size={20} />, color: 'var(--danger)', trend: '-5%', up: false },
    { title: t.savings, rawValue: 45000, icon: <PiggyBank size={20} />, color: 'var(--success)', trend: '+R$ 2k', up: true },
    { title: t.debts, rawValue: 2400, icon: <CreditCard size={20} />, color: 'var(--secondary)', trend: 'Estável', up: true },
  ];

  const lineData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: t.balance,
        data: [12000, 15000, 13000, 17000, 14000, 15420],
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00f2ff',
        pointBorderColor: '#fff',
      },
      {
        label: t.expenses,
        data: [8000, 9500, 7000, 11000, 8500, 4120],
        borderColor: '#ff00d6',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ]
  };

  const donutData = {
    labels: ['Carro', 'Casa', 'Alimentação', 'Lazer', 'Saúde'],
    datasets: [{
      data: [35, 25, 20, 10, 10],
      backgroundColor: [
        '#00f2ff',
        '#ff00d6',
        '#adff2f',
        '#3b82f6',
        '#ffaa00',
      ],
      borderWidth: 0,
      hoverOffset: 20
    }]
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Header com Switch Minimalista */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-white/[0.05]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
            <Zap size={14} /> Dashboard Analytics
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter font-heading sm:text-5xl">{t.overview}</h1>
          <p className="text-[var(--text-muted)] mt-2 font-medium">
            Gerenciando fluxos para <span className="text-[var(--text-main)] font-bold">{scope === 'family' ? 'Família Silva' : user?.displayName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button 
            onClick={() => setScope('family')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${scope === 'family' ? 'bg-white text-black shadow-2xl' : 'text-[var(--text-muted)] hover:text-white'}`}
          >
            <Users size={16} />
            <span className="font-bold text-xs uppercase tracking-wider">{t.family}</span>
          </button>
          <button 
            onClick={() => setScope('personal')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${scope === 'personal' ? 'bg-white text-black shadow-2xl' : 'text-[var(--text-muted)] hover:text-white'}`}
          >
            <UserIcon size={16} />
            <span className="font-bold text-xs uppercase tracking-wider">{t.personal}</span>
          </button>
        </div>
      </header>

      {/* KPI Blocks (Enhanced Glow) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass p-8 relative overflow-hidden group cursor-default"
          >
            <div className="flex justify-between items-start mb-6">
              <div 
                className="p-3.5 rounded-2xl transition-transform group-hover:scale-110 duration-500" 
                style={{ backgroundColor: `${kpi.color}15`, color: kpi.color, boxShadow: `0 0 20px ${kpi.color}20` }}
              >
                {kpi.icon}
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${kpi.up ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--danger)]/10 text-[var(--danger)]'}`}>
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">{kpi.title}</p>
            <h3 className="text-3xl font-black mt-2 font-heading tracking-tight">{formatCurrency(kpi.rawValue)}</h3>
            
            {/* dynamic background glow */}
            <div 
              className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-[0.05] filter blur-3xl transition-opacity group-hover:opacity-20 duration-700"
              style={{ backgroundColor: kpi.color }}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Main Area Chart */}
        <div className="xl:col-span-2 glass p-10 relative group">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black font-heading tracking-tight flex items-center gap-3">
              <Activity className="text-[var(--accent)]" /> Performance de Fluxo
            </h2>
            <div className="flex gap-3">
              <button className="glass-interactive p-3 rounded-xl text-[var(--text-muted)]"><Filter size={18} /></button>
              <button 
                onClick={onAddClick}
                data-tooltip="Criar uma nova receita ou despesa no sistema."
                className="btn-neon-sota px-6 py-3 rounded-xl shadow-glow font-black text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
              >
                <Plus size={18} /> {t.newEntry}
              </button>
            </div>
          </div>
          <div className="h-[350px]">
            <Line 
              data={lineData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#64748b', font: { weight: 'bold', size: 10 } } },
                  x: { grid: { display: false }, ticks: { color: '#64748b', font: { weight: 'bold', size: 10 } } }
                }
              }} 
            />
          </div>
        </div>

        {/* Categories (Donut) */}
        <div className="glass p-10 flex flex-col">
          <h2 className="text-2xl font-black font-heading tracking-tight mb-10">{t.categories}</h2>
          <div className="flex-1 relative min-h-[300px]">
            <Doughnut 
              data={donutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', usePointStyle: true, font: { size: 11, weight: 'bold' }, padding: 25 } } },
                cutout: '80%'
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Concentração</p>
              <p className="text-3xl font-black font-heading tracking-tight text-[var(--accent)]">84%</p>
            </div>
          </div>
        </div>
      </div>

      <AIDoc />
    </div>
  );
}
