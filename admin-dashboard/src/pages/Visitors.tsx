import { useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, TrendingUp, Calendar, Users } from 'lucide-react';
import { getVisitorHistory, getTodayVisitors, getTodayKey } from '../lib/storage';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: 'var(--accent)', fontWeight: 600 }}>{p.name}: {p.value} visiteurs</p>
      ))}
    </div>
  );
};

export default function Visitors() {
  const visitors = useMemo(() => getVisitorHistory(), []);
  const today = getTodayVisitors();

  const totalVisitors = useMemo(() => visitors.reduce((s, v) => s + v.count, 0), [visitors]);
  const avgDaily = useMemo(() => Math.round(totalVisitors / Math.max(visitors.length, 1)), [totalVisitors, visitors]);
  const maxDay = useMemo(() => visitors.reduce((max, v) => v.count > max.count ? v : max, visitors[0] || { date: '', count: 0 }), [visitors]);

  const chartData = useMemo(() => visitors.map(v => ({
    date: new Date(v.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
    visiteurs: v.count,
    isToday: v.date === getTodayKey(),
  })), [visitors]);

  // Weekly aggregation
  const weeklyData = useMemo(() => {
    const weeks: Record<string, number> = {};
    visitors.forEach(v => {
      const d = new Date(v.date);
      const wNum = `Sem. ${Math.ceil(d.getDate() / 7)}/${d.toLocaleDateString('fr-FR', { month: 'short' })}`;
      weeks[wNum] = (weeks[wNum] || 0) + v.count;
    });
    return Object.entries(weeks).slice(-6).map(([semaine, total]) => ({ semaine, total }));
  }, [visitors]);

  // Today vs yesterday
  const todayIdx = visitors.findIndex(v => v.date === getTodayKey());
  const yesterday = todayIdx > 0 ? visitors[todayIdx - 1].count : 0;
  const diff = today - yesterday;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPIs */}
      <div className="grid-4">
        {[
          { icon: Eye, label: "Visiteurs aujourd'hui", value: today, sub: diff !== 0 ? `${diff > 0 ? '+' : ''}${diff} vs hier` : 'Identique à hier', color: '#16c784', subColor: diff > 0 ? '#16c784' : diff < 0 ? '#ef4444' : '#94a3b8' },
          { icon: Calendar, label: 'Total 30 derniers jours', value: totalVisitors, color: '#3b82f6' },
          { icon: TrendingUp, label: 'Moyenne journalière', value: avgDaily, color: '#f59e0b' },
          { icon: Users, label: 'Pic maximum', value: maxDay.count, sub: maxDay.date ? new Date(maxDay.date).toLocaleDateString('fr-FR') : '', color: '#a855f7' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={s.color} />
                </div>
                {s.label === "Visiteurs aujourd'hui" && <span className="live-dot" style={{ marginTop: 6 }} />}
              </div>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{s.label}</p>
                {s.sub && <p style={{ fontSize: 11, color: (s as any).subColor || 'var(--text-muted)', marginTop: 3, fontWeight: 600 }}>{s.sub}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Area chart — 30 days */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p className="section-title">Évolution des visiteurs — 30 derniers jours</p>
            <p className="section-subtitle">Trafic quotidien sur le site WAIRB</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Temps réel · <strong style={{ color: 'var(--accent)' }}>{today}</strong> visiteurs aujourd'hui
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="vGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval={4} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="visiteurs" name="Visiteurs" stroke="var(--accent)" fill="url(#vGrad2)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: 'var(--accent)', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <p className="section-title" style={{ marginBottom: 4 }}>Visiteurs par semaine</p>
          <p className="section-subtitle" style={{ marginBottom: 16 }}>Agrégation hebdomadaire</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="semaine" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Visiteurs" fill="var(--info)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats table */}
        <div className="card" style={{ padding: 20 }}>
          <p className="section-title" style={{ marginBottom: 12 }}>Top 5 journées</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...visitors].sort((a, b) => b.count - a.count).slice(0, 5).map((v, i) => (
              <div key={v.date} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 10px', borderRadius: 8,
                background: i === 0 ? 'var(--accent-bg)' : 'var(--bg-primary)',
                border: `1px solid ${i === 0 ? 'var(--accent-border)' : 'var(--border)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6,
                    background: i === 0 ? 'var(--accent)' : 'var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800, color: i === 0 ? '#000' : 'var(--text-muted)',
                    flexShrink: 0,
                  }}>#{i+1}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {new Date(v.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--text-primary)' }}>
                  {v.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
