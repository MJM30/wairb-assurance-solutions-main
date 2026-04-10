import { useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
} from 'recharts';
import { Home, Car, Building2, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { getAllClients, getMontantByType } from '../lib/storage';

const TYPE_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType; tarif: number }> = {
  habitation:     { label: 'Assurance Habitation',           color: '#16c784', icon: Home,          tarif: 450  },
  auto:           { label: 'Assurance Automobile',           color: '#3b82f6', icon: Car,           tarif: 380  },
  professionnelle:{ label: 'Multirisque Professionnelle',    color: '#f59e0b', icon: Building2,     tarif: 1200 },
  pvt:            { label: 'Violence Politique & Terrorisme', color: '#ef4444', icon: AlertTriangle, tarif: 2500 },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.fill || 'var(--accent)', fontWeight: 600 }}>{p.name}: {p.value}{p.unit || ''}</p>
      ))}
    </div>
  );
};

export default function Insurance() {
  const clients = useMemo(() => getAllClients(), []);

  const typeStats = useMemo(() => {
    return Object.entries(TYPE_CONFIG).map(([id, cfg]) => {
      const typeClients = clients.filter(c => c.typeAssurance === id);
      const paid = typeClients.filter(c => c.statut === 'paye');
      const pending = typeClients.filter(c => c.statut === 'en_attente');
      const revenue = paid.reduce((s, c) => s + (c.montantPaye ?? 0), 0);
      const pct = typeClients.length > 0 ? Math.round((paid.length / typeClients.length) * 100) : 0;
      const isPerformant = pct >= 60;
      return { id, ...cfg, total: typeClients.length, paid: paid.length, pending: pending.length, revenue, pct, isPerformant };
    });
  }, [clients]);

  const chartData = typeStats.map(t => ({
    name: t.id === 'professionnelle' ? 'Pro.' : t.id === 'pvt' ? 'PVT' : t.id.charAt(0).toUpperCase() + t.id.slice(1),
    clients: t.total,
    payés: t.paid,
    enAttente: t.pending,
    fill: t.color,
  }));

  const pieData = typeStats.map(t => ({ name: t.label.split(' ')[1] || t.label, value: t.total, color: t.color }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Type cards */}
      <div className="grid-4">
        {typeStats.map(t => {
          const Icon = t.icon;
          return (
            <div key={t.id} className="stat-card" style={{ borderColor: t.isPerformant ? `${t.color}30` : 'var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${t.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={t.color} />
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 10, fontWeight: 700,
                  color: t.isPerformant ? 'var(--accent)' : 'var(--danger)',
                }}>
                  {t.isPerformant ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {t.isPerformant ? 'Performant' : 'Faible'}
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{t.label}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginTop: 4, letterSpacing: '-0.03em' }}>{t.total}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>clients</p>
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Taux de paiement</span>
                  <span style={{ color: t.color, fontWeight: 700 }}>{t.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${t.pct}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}cc)` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11 }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)' }}>{t.paid}</span> payés · <span style={{ color: '#f59e0b' }}>{t.pending}</span> attente
                  </span>
                  <span style={{ color: t.color, fontWeight: 700 }}>${t.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        {/* Bar chart */}
        <div className="card" style={{ padding: 20 }}>
          <p className="section-title" style={{ marginBottom: 4 }}>Clients par type — Payés vs En attente</p>
          <p className="section-subtitle" style={{ marginBottom: 16 }}>Comparaison des statuts de paiement</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barGap={4} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
              <Bar dataKey="payés" name="Payés" radius={[4,4,0,0]}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
              <Bar dataKey="enAttente" name="En attente" fill="#374151" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card" style={{ padding: 20 }}>
          <p className="section-title" style={{ marginBottom: 4 }}>Répartition globale</p>
          <p className="section-subtitle" style={{ marginBottom: 16 }}>Part de marché par produit</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {typeStats.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.id === 'professionnelle' ? 'Professionnelle' : t.id === 'habitation' ? 'Habitation' : t.id === 'auto' ? 'Auto' : 'PVT'}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {clients.length > 0 ? Math.round((t.total / clients.length) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p className="section-title">Détail par type d'assurance</p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Total clients</th>
              <th>Payés</th>
              <th>En attente</th>
              <th>Taux paiement</th>
              <th>Tarif</th>
              <th>Revenus</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {typeStats.map(t => {
              const Icon = t.icon;
              return (
                <tr key={t.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 7, background: `${t.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={13} color={t.color} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{t.label}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{t.total}</td>
                  <td style={{ color: '#16c784', fontWeight: 600 }}>{t.paid}</td>
                  <td style={{ color: '#f59e0b', fontWeight: 600 }}>{t.pending}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ flex: 1, maxWidth: 80 }}>
                        <div className="progress-fill" style={{ width: `${t.pct}%`, background: t.color }} />
                      </div>
                      <span style={{ fontSize: 12, color: t.color, fontWeight: 700 }}>{t.pct}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>${t.tarif}/an</td>
                  <td style={{ fontSize: 13, fontWeight: 700, color: t.color }}>${t.revenue.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${t.isPerformant ? 'badge-green' : 'badge-red'}`}>
                      {t.isPerformant ? '▲ Performant' : '▼ Non performant'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
