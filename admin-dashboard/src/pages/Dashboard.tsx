import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  Users, CheckCircle, Clock, DollarSign,
  TrendingUp, Eye, ArrowRight, Home, Car, Building2, AlertTriangle, Download,
} from 'lucide-react';
import { getAllClients, getVisitorHistory, getTodayVisitors, getMontantByType } from '../lib/storage';
import ExportModal from '../components/ExportModal';

const COLORS: Record<string, string> = {
  habitation: '#16c784',
  auto: '#3b82f6',
  professionnelle: '#f59e0b',
  pvt: '#ef4444',
};
const TYPE_ICONS: Record<string, React.ElementType> = {
  habitation: Home,
  auto: Car,
  professionnelle: Building2,
  pvt: AlertTriangle,
};

function StatCard({ icon: Icon, label, value, sub, color, onClick }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string;
  color: string; onClick?: () => void;
}) {
  return (
    <div className="stat-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${color}30`,
        }}>
          <Icon size={20} color={color} />
        </div>
        {onClick && (
          <ArrowRight size={14} style={{ color: 'var(--text-muted)', marginTop: 4 }} />
        )}
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          {value}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, marginTop: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '8px 12px', fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || 'var(--accent)', fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState(false);
  const clients = useMemo(() => getAllClients(), []);
  const visitors = useMemo(() => getVisitorHistory(), []);
  const todayVisitors = getTodayVisitors();

  const paid = clients.filter(c => c.statut === 'paye');
  const pending = clients.filter(c => c.statut === 'en_attente');
  const totalRevenue = paid.reduce((sum, c) => sum + (c.montantPaye ?? 0), 0);

  // Inscriptions par mois (6 derniers mois)
  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};
    clients.forEach(c => {
      const d = new Date(c.dateInscription);
      const key = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).slice(-6).map(([mois, inscriptions]) => ({ mois, inscriptions }));
  }, [clients]);

  // Répartition par type
  const typeData = useMemo(() => {
    const map: Record<string, number> = {};
    clients.forEach(c => { map[c.typeAssurance] = (map[c.typeAssurance] || 0) + 1; });
    return Object.entries(map).map(([id, count]) => ({
      id, count,
      label: id === 'pvt' ? 'PVT' : id === 'habitation' ? 'Habitation' : id === 'auto' ? 'Auto' : 'Professionnelle',
      color: COLORS[id] || '#94a3b8',
    }));
  }, [clients]);

  // Visitors last 14 days
  const visitorData = useMemo(() => visitors.slice(-14).map(v => ({
    date: new Date(v.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
    visiteurs: v.count,
  })), [visitors]);

  // Recent clients (last 5)
  const recentClients = useMemo(() => [...clients]
    .sort((a, b) => new Date(b.dateInscription).getTime() - new Date(a.dateInscription).getTime())
    .slice(0, 5), [clients]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: -8 }}>
        <button className="btn btn-outline" style={{ background: 'var(--bg-card)', height: 38 }} onClick={() => setShowExport(true)}>
          <Download size={15} /> Exporter Rapport PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <StatCard
          icon={Users} label="Total clients" value={clients.length}
          sub={`+${recentClients.length} cette semaine`}
          color="#3b82f6" onClick={() => navigate('/clients')}
        />
        <StatCard
          icon={CheckCircle} label="Clients payés" value={paid.length}
          sub={`${Math.round((paid.length / clients.length) * 100)}% du total`}
          color="#16c784" onClick={() => navigate('/clients-payes')}
        />
        <StatCard
          icon={Clock} label="En attente" value={pending.length}
          sub="Paiements en cours"
          color="#f59e0b"
        />
        <StatCard
          icon={DollarSign} label="Revenus collectés" value={`$${totalRevenue.toLocaleString()}`}
          sub="USD cumulés"
          color="#a855f7"
        />
      </div>

      {/* Row 2: Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Inscriptions chart */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <p className="section-title">Inscriptions par mois</p>
            <p className="section-subtitle">Nombre de nouvelles demandes</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mois" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="inscriptions" name="Inscriptions" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart types */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <p className="section-title">Par type d'assurance</p>
            <p className="section-subtitle">Répartition des clients</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={typeData} dataKey="count" nameKey="label" cx="50%" cy="50%" outerRadius={60} innerRadius={30}>
                {typeData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {typeData.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{t.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Visitors + Recent clients */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Visitors */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p className="section-title">Visiteurs (14 derniers jours)</p>
              <p className="section-subtitle">Trafic sur le site WAIRB</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="live-dot" />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{todayVisitors}</strong> aujourd'hui
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={visitorData}>
              <defs>
                <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="visiteurs" name="Visiteurs" stroke="var(--accent)" fill="url(#vGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent clients */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p className="section-title">Derniers clients</p>
              <p className="section-subtitle">5 inscriptions récentes</p>
            </div>
            <button className="btn btn-ghost" style={{ fontSize: 11 }} onClick={() => navigate('/clients')}>
              Voir tout <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentClients.map(client => {
              const Icon = TYPE_ICONS[client.typeAssurance] || Users;
              return (
                <div key={client.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 8,
                  background: 'var(--bg-primary)',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `${COLORS[client.typeAssurance] || '#3b82f6'}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={14} color={COLORS[client.typeAssurance] || '#3b82f6'} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {client.nom}
                    </p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      {client.typeAssuranceLabel}
                    </p>
                  </div>
                  <span className={`badge ${client.statut === 'paye' ? 'badge-green' : 'badge-yellow'}`}>
                    {client.statut === 'paye' ? 'Payé' : 'En attente'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 4: Type stats */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <p className="section-title">Performance par type d'assurance</p>
          <p className="section-subtitle">Taux de paiement et revenus par produit</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {typeData.map(t => {
            const typeClients = clients.filter(c => c.typeAssurance === t.id);
            const typePaid = typeClients.filter(c => c.statut === 'paye');
            const pct = typeClients.length > 0 ? Math.round((typePaid.length / typeClients.length) * 100) : 0;
            const revenue = typePaid.reduce((s, c) => s + (c.montantPaye ?? 0), 0);
            const Icon = TYPE_ICONS[t.id] || Users;
            const isPerformant = pct >= 60;
            return (
              <div key={t.id} style={{
                padding: 16, borderRadius: 10,
                background: 'var(--bg-primary)',
                border: `1px solid ${isPerformant ? t.color + '30' : 'var(--border)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `${t.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} color={t.color} />
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px',
                    borderRadius: 99,
                    background: isPerformant ? 'var(--accent-bg)' : 'var(--danger-bg)',
                    color: isPerformant ? 'var(--accent)' : 'var(--danger)',
                    border: `1px solid ${isPerformant ? 'var(--accent-border)' : 'rgba(239,68,68,0.2)'}`,
                  }}>
                    {isPerformant ? '▲ Performant' : '▼ Faible'}
                  </span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{t.label}</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{typeClients.length} clients</p>
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Payés</span>
                    <span style={{ color: t.color, fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: t.color }} />
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>
                    Revenus: <strong style={{ color: 'var(--text-secondary)' }}>${revenue.toLocaleString()}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  );
}
