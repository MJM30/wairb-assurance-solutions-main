import { useState, useMemo } from 'react';
import { CheckCircle, Search, Eye, Home, Car, Building2, AlertTriangle, Users, X, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { getAllClients, updateClientPayment, WairbClient } from '../lib/storage';

const COLORS: Record<string, string> = { habitation: '#16c784', auto: '#3b82f6', professionnelle: '#f59e0b', pvt: '#ef4444' };
const TYPE_ICONS: Record<string, React.ElementType> = { habitation: Home, auto: Car, professionnelle: Building2, pvt: AlertTriangle };

function PaidClientModal({ client, onClose, onRefresh }: { client: WairbClient; onClose: () => void; onRefresh: () => void }) {
  const [saving, setSaving] = useState(false);
  const Icon = TYPE_ICONS[client.typeAssurance] || Users;
  const color = COLORS[client.typeAssurance] || '#3b82f6';

  function cancelPayment() {
    setSaving(true);
    setTimeout(() => { updateClientPayment(client.id, false); setSaving(false); onRefresh(); onClose(); }, 600);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 520 }}>
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{client.nom}</h2>
              <span className="badge badge-green" style={{ marginTop: 2 }}><CheckCircle size={10} /> Paiement confirmé</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Matricule */}
          <div style={{ padding: '14px 16px', background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Numéro Matricule</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)', fontFamily: 'monospace' }}>{client.matricule}</p>
          </div>
          {/* Details */}
          {[
            { icon: Mail, label: 'Email', value: client.email },
            { icon: Phone, label: 'Téléphone', value: client.telephone },
            { icon: MapPin, label: 'Adresse', value: `${client.adressePhysique || '—'}, ${client.ville}` },
            { icon: Calendar, label: 'Date inscription', value: new Date(client.dateInscription).toLocaleDateString('fr-FR') },
            { icon: Calendar, label: 'Date paiement', value: client.datePaiement ? new Date(client.datePaiement).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '—' },
          ].map(({ icon: RI, label, value }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <RI size={13} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 120 }}>{label}</span>
              <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
          {/* Amount */}
          <div style={{ padding: '14px 16px', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>Montant payé</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{client.typeAssuranceLabel}</p>
            </div>
            <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>${client.montantPaye?.toLocaleString()} USD</p>
          </div>
          <button className="btn btn-outline" onClick={cancelPayment} disabled={saving} style={{ justifyContent: 'center', height: 40 }}>
            <CreditCard size={14} /> {saving ? 'Annulation...' : 'Annuler le paiement'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaidClients() {
  const [clients, setClients] = useState(() => getAllClients());
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<WairbClient | null>(null);

  const paidClients = useMemo(() => clients.filter(c => c.statut === 'paye'), [clients]);
  const filtered = useMemo(() => paidClients.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.matricule.toLowerCase().includes(search.toLowerCase())
  ), [paidClients, search]);

  const totalRevenue = useMemo(() => paidClients.reduce((s, c) => s + (c.montantPaye ?? 0), 0), [paidClients]);

  function refresh() {
    setClients(getAllClients());
    setSelected(null);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'Clients payés', value: paidClients.length, color: '#16c784' },
          { label: 'Revenus totaux', value: `$${totalRevenue.toLocaleString()} USD`, color: '#a855f7' },
          { label: 'Moyenne par client', value: `$${paidClients.length ? Math.round(totalRevenue / paidClients.length) : 0} USD`, color: '#3b82f6' },
        ].map(card => (
          <div key={card.label} className="stat-card">
            <p style={{ fontSize: 24, fontWeight: 800, color: card.color }}>{card.value}</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Clients ayant payé <span style={{ color: 'var(--accent)', marginLeft: 6 }}>{filtered.length}</span>
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Paiements confirmés par l'administration</p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30, width: 200, height: 36 }} />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Type d'assurance</th>
              <th>Matricule</th>
              <th>Date de paiement</th>
              <th>Montant</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(client => {
              const Icon = TYPE_ICONS[client.typeAssurance] || Users;
              const color = COLORS[client.typeAssurance] || '#3b82f6';
              return (
                <tr key={client.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(client)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color }}>{client.nom[0]}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{client.nom}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon size={13} color={color} /><span style={{ fontSize: 12 }}>{client.typeAssuranceLabel}</span></div></td>
                  <td><code style={{ fontSize: 11, color: 'var(--accent)', background: 'var(--accent-bg)', padding: '2px 6px', borderRadius: 4 }}>{client.matricule}</code></td>
                  <td style={{ fontSize: 12 }}>
                    {client.datePaiement ? new Date(client.datePaiement).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>${client.montantPaye?.toLocaleString()} USD</td>
                  <td><button className="btn btn-ghost" style={{ padding: '4px 8px' }}><Eye size={14} /></button></td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Aucun client payé trouvé</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {selected && <PaidClientModal client={selected} onClose={() => setSelected(null)} onRefresh={refresh} />}
    </div>
  );
}
