import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLocale } from '@/context/LocaleContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnnualProjection({ transactions = [] }) {
  const { t, formatCurrency } = useLocale();

  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // Mock data for annual projection (Paid vs Estimated)
  const data = {
    labels,
    datasets: [
      {
        label: t.paid || 'Pago',
        data: [4200, 3800, 4500, 2100, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#00f2ff',
        borderRadius: 8,
      },
      {
        label: t.futureEstimate || 'Projetado',
        data: [0, 0, 0, 2500, 4100, 3900, 4000, 4100, 4050, 4200, 4500, 5000],
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { weight: 'bold', size: 11 } }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw)}`
        }
      }
    },
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { color: '#64748b', font: { weight: 'bold' } } },
      y: { stacked: true, grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#64748b', font: { weight: 'bold' } } }
    }
  };

  return (
    <div className="glass p-8 h-full min-h-[400px] flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-black font-heading tracking-tight">{t.annualProjection}</h2>
          <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">Custo de Vida Estimado 2026</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Est. Ano</p>
          <p className="text-2xl font-black text-[var(--accent)] font-heading">{formatCurrency(48850)}</p>
        </div>
      </div>
      <div className="flex-1">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
