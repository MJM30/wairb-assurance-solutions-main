import { useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign, Target, TrendingUp, Award } from 'lucide-react';
import { getAllClients } from '../lib/storage';

const BUDGET_TARGET = 50000; // USD target annuel

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || 'var(--accent)', fontWeight: 600 }}>{p.name}: ${Number(p.value).toLocaleString()}</p>
      ))}
    </div>
  );
};

export default function Budget() {
  const clients = useMemo(() => getAllClients(), []);

  const paid = useMemo(() => clients.filter(c => c.statut === 'paye'), [clients]);
  const totalCollected = useMemo(() => paid.reduce((s, c) => s + (c.montantPaye ?? 0), 0), [paid]);
  const remaining = Math.max(0, BUDGET_TARGET - totalCollected);
  const pct = Math.min(100, Math.round((totalCollected / BUDGET_TARGET) * 100));

  // Monthly revenue
  const monthlyRevenue = useMemo(() => {
    const map: Record<string, number> = {};
    paid.forEach(c => {
      if (!c.datePaiement) return;
      const d = new Date(c.datePaiement);
      const key = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
      map[key] = (map[key] || 0) + (c.montantPaye ?? 0);
    });
    return Object.entries(map).map(([mois, montant]) => ({ mois, montant }));
  }, [paid]);

  // Revenue by type
  const byType = useMemo(() => {
    const map: Record<string, { label: string; revenue: number; color: string }> = {
      habitation: { label: 'Habitation', revenue: 0, color: '#16c784' },
      auto: { label: 'Auto', revenue: 0, color: '#3b82f6' },
      professionnelle: { label: 'Professionnelle', revenue: 0, color: '#f59e0b' },
      pvt: { label: 'PVT', revenue: 0, color: '#ef4444' },
    };
    paid.forEach(c => {
      if (map[c.typeAssurance]) map[c.typeAssurance].revenue += (c.montantPaye ?? 0);
    });
    return Object.values(map);
  }, [paid]);

  // Cumulative chart
  const cumulativeData = useMemo(() => {
    const sorted = [...paid].sort((a, b) =>
      new Date(a.datePaiement ?? 0).getTime() - new Date(b.datePaiement ?? 0).getTime()
    );
    let cumul = 0;
    return sorted.map(c => {
      cumul += c.montantPaye ?? 0;
      return {
        date: new Date(c.datePaiement!).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        collecté: cumul,
        objectif: BUDGET_TARGET,
      };
    });
  }, [paid]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPIs */}
      <div className="grid-4">
        {[
          { icon: DollarSign, label: 'Revenus collectés', value: `$${totalCollected.toLocaleString()}`, color: '#16c784' },
          { icon: Target, label: 'Objectif annuel', value: `$${BUDGET_TARGET.toLocaleString()}`, color: '#3b82f6' },
          { icon: TrendingUp, label: 'Taux de réalisation', value: `${pct}%`, color: '#f59e0b' },
          { icon: Award, label: 'Restant à collecter', value: `$${remaining.toLocaleString()}`, color: '#a855f7' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={s.color} />
              </div>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Big progress bar */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div>
            <p className="section-title">Progression du budget annuel</p>
            <p className="section-subtitle">Objectif : ${BUDGET_TARGET.toLocaleString()} USD</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{pct}%</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>de l'objectif atteint</p>
          </div>
        </div>
        <div style={{ height: 16, background: 'var(--border)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: pct >= 80 ? 'linear-gradient(90deg, #16c784, #1ee89a)' : pct >= 50 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #ef4444, #f87171)',
            borderRadius: 99,
            transition: 'width 1s ease',
            position: 'relative',
          }}>
            {pct >= 15 && <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 9, fontWeight: 800, color: '#000' }}>{pct}%</span>}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
          <span>$0</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>${totalCollected.toLocaleString()} collectés</span>
          <span>${BUDGET_TARGET.toLocaleString()}</span>
        </div>
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Cumulative */}
        <div className="card" style={{ padding: 20 }}>
          <p className="section-title" style={{ marginBottom: 4 }}>Progression cumulée</p>
          <p className="section-subtitle" style={{ marginBottom: 16 }}>Collecte vs objectif dans le temps</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cumulativeData}>
              <defs>
                <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="collecté" name="Collecté" stroke="var(--accent)" fill="url(#cGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="objectif" name="Objectif" stroke="#3b82f6" fill="transparent" strokeWidth={1} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* By type */}
        <div className="card" style={{ padding: 20 }}>
          <p className="section-title" style={{ marginBottom: 4 }}>Revenus par type</p>
          <p className="section-subtitle" style={{ marginBottom: 16 }}>Contribution de chaque produit</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={byType} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="label" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenus" radius={[0, 4, 4, 0]}>
                {byType.map((entry, i) => (
                  <Bar key={i} dataKey="revenue" fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {byType.map(t => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="progress-bar" style={{ width: 60 }}>
                    <div className="progress-fill" style={{ width: `${totalCollected > 0 ? Math.round((t.revenue / totalCollected) * 100) : 0}%`, background: t.color }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.color }}>${t.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly revenue */}
      {monthlyRevenue.length > 0 && (
        <div className="card" style={{ padding: 20 }}>
          <p className="section-title" style={{ marginBottom: 4 }}>Revenus mensuels</p>
          <p className="section-subtitle" style={{ marginBottom: 16 }}>Performance mois par mois</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyRevenue} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mois" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="montant" name="Revenus" fill="var(--accent)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
