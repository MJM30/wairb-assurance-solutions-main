import { useState, useMemo } from 'react';
import {
  Search, Filter, Eye, Home, Car, Building2, AlertTriangle,
  Users, X, Mail, Phone, MapPin, Calendar, CreditCard, CheckCircle, Clock
} from 'lucide-react';
import { getAllClients, updateClientPayment, WairbClient, getMontantByType } from '../lib/storage';

const COLORS: Record<string, string> = {
  habitation: '#16c784', auto: '#3b82f6', professionnelle: '#f59e0b', pvt: '#ef4444',
};
const TYPE_ICONS: Record<string, React.ElementType> = {
  habitation: Home, auto: Car, professionnelle: Building2, pvt: AlertTriangle,
};

function ClientModal({ client, onClose, onRefresh }: { client: WairbClient; onClose: () => void; onRefresh: () => void }) {
  const [saving, setSaving] = useState(false);
  const Icon = TYPE_ICONS[client.typeAssurance] || Users;
  const color = COLORS[client.typeAssurance] || '#3b82f6';

  function togglePayment() {
    setSaving(true);
    setTimeout(() => {
      updateClientPayment(client.id, client.statut !== 'paye');
      setSaving(false);
      onRefresh();
    }, 600);
  }

  const infoRows = [
    { icon: Mail, label: 'Adresse email', value: client.email },
    { icon: Phone, label: 'Téléphone', value: client.telephone },
    { icon: MapPin, label: 'Adresse physique', value: client.adressePhysique || '—' },
    { icon: MapPin, label: 'Adresse postale', value: client.adressePostale || '—' },
    { icon: Building2, label: "Domaine d'activité", value: client.domaineActivite || '—' },
    { icon: MapPin, label: 'Ville / Pays', value: `${client.ville}, ${client.pays}` },
    { icon: Calendar, label: "Date d'inscription", value: new Date(client.dateInscription).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) },
  ];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 580 }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: `${color}18`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{client.nom}</h2>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{client.typeAssuranceLabel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, borderRadius: 6 }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Matricule + Statut */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: '14px 16px', background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Numéro Matricule
              </p>
              <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', fontFamily: 'monospace' }}>{client.matricule}</p>
            </div>
            <div style={{ padding: '14px 16px', background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                Statut de paiement
              </p>
              <span className={`badge ${client.statut === 'paye' ? 'badge-green' : 'badge-yellow'}`} style={{ fontSize: 12 }}>
                {client.statut === 'paye' ? <><CheckCircle size={11} /> Payé</> : <><Clock size={11} /> En attente</>}
              </span>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {infoRows.map(({ icon: RowIcon, label, value }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0', borderBottom: '1px solid var(--border)',
              }}>
                <RowIcon size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 140, flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Paiement info */}
          {client.statut === 'paye' && client.datePaiement && (
            <div style={{
              padding: '12px 16px', borderRadius: 10,
              background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <p style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginBottom: 2 }}>Paiement reçu</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {new Date(client.datePaiement).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)' }}>
                ${(client.montantPaye ?? getMontantByType(client.typeAssurance)).toLocaleString()} USD
              </p>
            </div>
          )}

          {/* Action button */}
          <button
            className={`btn ${client.statut === 'paye' ? 'btn-outline' : 'btn-primary'}`}
            onClick={togglePayment}
            disabled={saving}
            style={{ justifyContent: 'center', height: 42 }}
          >
            <CreditCard size={15} />
            {saving ? 'Mise à jour...' : client.statut === 'paye' ? 'Annuler le paiement' : `Marquer comme payé — $${getMontantByType(client.typeAssurance)} USD`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const [clients, setClients] = useState(() => getAllClients());
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'paye' | 'en_attente'>('all');
  const [selected, setSelected] = useState<WairbClient | null>(null);

  function refresh() {
    setClients(getAllClients());
    if (selected) {
      const updated = getAllClients().find(c => c.id === selected.id);
      setSelected(updated ?? null);
    }
  }

  const filtered = useMemo(() => clients.filter(c => {
    const matchSearch = c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.matricule.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.statut === filter;
    return matchSearch && matchFilter;
  }), [clients, search, filter]);

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'paye', label: 'Payés' },
    { key: 'en_attente', label: 'En attente' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Tous les clients <span style={{ color: 'var(--accent)', marginLeft: 8 }}>{filtered.length}</span>
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            Clientèle complète de WAIRB Assurances
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 30, width: 200, height: 36 }}
            />
          </div>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 3 }}>
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  background: filter === f.key ? 'var(--accent)' : 'transparent',
                  color: filter === f.key ? '#000' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Type d'assurance</th>
                <th>Matricule</th>
                <th>Ville</th>
                <th>Date</th>
                <th>Statut</th>
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
                        <div style={{
                          width: 34, height: 34, borderRadius: 9,
                          background: `${color}18`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color }}>{client.nom[0]}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{client.nom}</p>
                          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon size={13} color={color} />
                        <span style={{ fontSize: 12 }}>{client.typeAssuranceLabel}</span>
                      </div>
                    </td>
                    <td>
                      <code style={{ fontSize: 11, color: 'var(--accent)', background: 'var(--accent-bg)', padding: '2px 6px', borderRadius: 4 }}>
                        {client.matricule}
                      </code>
                    </td>
                    <td style={{ fontSize: 12 }}>{client.ville}</td>
                    <td style={{ fontSize: 11 }}>
                      {new Date(client.dateInscription).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <span className={`badge ${client.statut === 'paye' ? 'badge-green' : 'badge-yellow'}`}>
                        {client.statut === 'paye' ? 'Payé' : 'En attente'}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, fontWeight: 600, color: client.montantPaye ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {client.montantPaye ? `$${client.montantPaye}` : '—'}
                    </td>
                    <td>
                      <button className="btn btn-ghost" style={{ padding: '4px 8px' }} onClick={e => { e.stopPropagation(); setSelected(client); }}>
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                    Aucun client trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ClientModal client={selected} onClose={() => setSelected(null)} onRefresh={refresh} />
      )}
    </div>
  );
}
