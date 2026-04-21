import { Cpu, Terminal, Shield, Workflow, Sparkles } from 'lucide-react';

export default function AIDoc() {
  return (
    <section className="glass p-10 border-t-2 border-[var(--accent)] mt-20 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] transition-opacity group-hover:opacity-10 duration-1000">
        <Terminal size={180} />
      </div>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white rounded-2xl shadow-glow">
          <Cpu size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tighter font-heading">System DNA & SOTA Manifest</h2>
          <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-[0.3em] mt-1">Version 1.1.0 • Stitch Evolution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        <div className="lg:col-span-1 space-y-6">
          <p className="text-[var(--text-muted)] leading-relaxed font-medium">
            "Este manifesto técnico orienta a evolução do Nexus via IA, priorizando a estética 'Neon-Glass' e a soberania do dado individual."
          </p>
          
          <div className="bg-black/40 p-6 rounded-2xl font-mono text-[10px] border border-white/5 shadow-inner">
            <p className="text-[var(--secondary)] mb-3 flex items-center gap-2"><Sparkles size={12} /> Design Language: Nexus-Stitch</p>
            <ul className="space-y-2 text-[var(--text-main)] opacity-70">
              <li>• Mesh: Aurora Gradients (Primary/Secondary)</li>
              <li>• High-Blur: 60px Backdrop Filter</li>
              <li>• Grid: Orbital Dot Pattern (24px)</li>
              <li>• Typo: Space Grotesk (Headings)</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <Shield className="text-[var(--accent)] shrink-0 w-8 h-8" />
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider mb-2">Isolamento Quântico</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                As transações de escopo "personal" são isoladas por chave de contexto. Nenhum loop de consulta familiar herda permissões de leitura do proprietário individual.
              </p>
            </div>
          </div>
          
          <div className="flex gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <Workflow className="text-[var(--secondary)] shrink-0 w-8 h-8" />
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider mb-2">Escala PBI-SOTA</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                A renderização via Chart.js utiliza buffers de alta fidelidade e paletas neon de alto contraste, otimizados para visibilidade instantânea em multi-temas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
          System Operational: Nexus-Core-Active
        </div>
        <div className="flex items-center gap-4">
          <span>Stitch Protocol v1.1</span>
          <span className="text-[var(--accent)]">© 2026 Sovereign Agency</span>
        </div>
      </div>
    </section>
  );
}
