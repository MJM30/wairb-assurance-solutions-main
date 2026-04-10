import { useState } from 'react';
import { Building2, Globe, Phone, Mail, CheckCircle, XCircle, Star } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  specialty: string;
  country: string;
  phone: string;
  email: string;
  active: boolean;
  rating: number;
  since: string;
  types: string[];
  logo: string;
}

const PARTNERS: Partner[] = [
  {
    id: 'axa',
    name: 'AXA Assurances',
    specialty: 'Assurance générale & vie',
    country: 'France / RDC',
    phone: '+33 1 40 75 57 00',
    email: 'partenariats@axa.cd',
    active: true,
    rating: 5,
    since: '2020',
    types: ['Auto', 'Habitation', 'Vie'],
    logo: 'AXA',
  },
  {
    id: 'sonas',
    name: 'SONAS',
    specialty: 'Société Nationale d\'Assurances',
    country: 'RDC',
    phone: '+243 81 555 0001',
    email: 'contact@sonas.cd',
    active: true,
    rating: 4,
    since: '2019',
    types: ['Auto', 'Habitation', 'PVT'],
    logo: 'SN',
  },
  {
    id: 'activa',
    name: 'Activa Assurances',
    specialty: 'Assurances multirisques',
    country: 'Afrique Centrale',
    phone: '+237 222 22 22 22',
    email: 'info@activa.cd',
    active: true,
    rating: 4,
    since: '2021',
    types: ['Professionnelle', 'PVT'],
    logo: 'AC',
  },
  {
    id: 'sanlam',
    name: 'Sanlam Pan Africa',
    specialty: 'Assurance vie & épargne',
    country: 'Afrique du Sud / RDC',
    phone: '+27 21 947 9111',
    email: 'africa@sanlam.com',
    active: true,
    rating: 5,
    since: '2022',
    types: ['Vie', 'Épargne'],
    logo: 'SA',
  },
  {
    id: 'allianz',
    name: 'Allianz Africa',
    specialty: 'Leader mondial de l\'assurance',
    country: 'Allemagne / Afrique',
    phone: '+49 89 3800 0',
    email: 'africa@allianz.com',
    active: false,
    rating: 4,
    since: '2023',
    types: ['Auto', 'Professionnelle'],
    logo: 'AL',
  },
  {
    id: 'prudential',
    name: 'Prudential Africa',
    specialty: 'Assurance vie & santé',
    country: 'UK / Afrique',
    phone: '+44 207 220 7588',
    email: 'africa@prudential.com',
    active: false,
    rating: 3,
    since: '2023',
    types: ['Santé', 'Vie'],
    logo: 'PR',
  },
];

const COLORS = ['#16c784', '#3b82f6', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4'];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} fill={i <= count ? '#f59e0b' : 'transparent'} color={i <= count ? '#f59e0b' : 'var(--text-muted)'} />
      ))}
    </div>
  );
}

export default function Partners() {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = PARTNERS.filter(p =>
    filter === 'all' ? true : filter === 'active' ? p.active : !p.active
  );

  const active = PARTNERS.filter(p => p.active).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { label: 'Total partenaires', value: PARTNERS.length, color: '#3b82f6' },
          { label: 'Partenaires actifs', value: active, color: '#16c784' },
          { label: 'Partenaires inactifs', value: PARTNERS.length - active, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <p style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Header + filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Assureurs Partenaires</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Réseau de partenaires de WAIRB DRC</p>
        </div>
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 3 }}>
          {(['all', 'active', 'inactive'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              border: 'none', cursor: 'pointer',
              background: filter === f ? 'var(--accent)' : 'transparent',
              color: filter === f ? '#000' : 'var(--text-muted)',
              transition: 'all 0.15s',
            }}>
              {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : 'Inactifs'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map((p, i) => (
          <div key={p.id} className="card" style={{ padding: 20, opacity: p.active ? 1 : 0.7 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${COLORS[i % COLORS.length]}20`,
                  border: `1px solid ${COLORS[i % COLORS.length]}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: COLORS[i % COLORS.length],
                }}>{p.logo}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</p>
                  <Stars count={p.rating} />
                </div>
              </div>
              <span className={`badge ${p.active ? 'badge-green' : 'badge-red'}`}>
                {p.active ? <><CheckCircle size={10} /> Actif</> : <><XCircle size={10} /> Inactif</>}
              </span>
            </div>
            {/* Specialty */}
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{p.specialty}</p>
            {/* Info rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                { icon: Globe, value: p.country },
                { icon: Phone, value: p.phone },
                { icon: Mail, value: p.email },
              ].map(({ icon: Icon, value }) => (
                <div key={value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{value}</span>
                </div>
              ))}
            </div>
            {/* Types */}
            <div style={{ marginTop: 12, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {p.types.map(t => (
                <span key={t} style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 8px',
                  borderRadius: 99,
                  background: `${COLORS[i % COLORS.length]}15`,
                  color: COLORS[i % COLORS.length],
                  border: `1px solid ${COLORS[i % COLORS.length]}25`,
                }}>{t}</span>
              ))}
              <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>Depuis {p.since}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
