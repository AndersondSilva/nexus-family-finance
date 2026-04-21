import { Cpu, Terminal, Shield, Workflow } from 'lucide-react';

export default function AIDoc() {
  return (
    <section className="glass p-8 border-t-2 border-[var(--accent)] mt-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Terminal size={120} />
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[var(--accent)] text-black rounded-xl shadow-glow">
          <Cpu size={24} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">System DNA & AI Manifest</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
          <p className="text-[var(--text-muted)] leading-relaxed italic">
            "Este manifesto serve como guia técnico e contextual para agentes de IA que venham a colaborar ou modificar este sistema no futuro."
          </p>
          
          <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded-xl font-mono text-xs border border-[var(--border-card)]">
            <p className="text-[var(--accent)] mb-2">// Core Architecture</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-main)] opacity-80">
              <li>Framework: Next.js 14+ (App Router)</li>
              <li>Data Logic: Dual-Scope Isolation (Personal/Family)</li>
              <li>Auth: Firebase Google OAuth 2.0</li>
              <li>Design: Neon-Glassmorphism SOTA UI</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <Shield className="text-[var(--secondary)] shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Privacidade Nível Zero</h4>
              <p className="text-xs text-[var(--text-muted)]">O escopo "Personal" é criptografado por contexto via logic layer, garantindo que membros da família só vejam o que é explicitamente compartilhado.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Workflow className="text-[var(--success)] shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Escalabilidade Familiar</h4>
              <p className="text-xs text-[var(--text-muted)]">Sistema de permissões RBAC (Admin, Editor, Viewer) aplicado em sub-coleções de transações e metas.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-card)] flex justify-between items-center text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        <span>Protocol: NEXUS-SOTA-2026</span>
        <span>Maturity: Level 11/10</span>
      </div>
    </section>
  );
}
