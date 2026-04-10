import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { getAllClients, getTodayVisitors } from '../lib/storage';

const titles: Record<string, string> = {
  '/': 'Tableau de bord',
  '/clients': 'Tous les clients',
  '/clients-payes': 'Clients payés',
  '/assurances': 'Statistiques des assurances',
  '/partenaires': 'Assureurs partenaires',
  '/budget': 'Progression du budget',
  '/visiteurs': 'Visiteurs du site',
};

export default function TopBar() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? 'WAIRB Admin';
  const clients = getAllClients();
  const pending = clients.filter(c => c.statut === 'en_attente').length;
  const todayVisitors = getTodayVisitors();

  return (
    <header style={{
      height: 60,
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>
      <div>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h1>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Today visitors */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 8, padding: '5px 12px',
          fontSize: 12,
        }}>
          <span className="live-dot" />
          <span style={{ color: 'var(--text-muted)' }}>Visiteurs aujourd'hui :</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{todayVisitors}</span>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button className="btn btn-ghost" style={{ width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
            <Bell size={18} />
          </button>
          {pending > 0 && (
            <div style={{
              position: 'absolute', top: -4, right: -4,
              width: 18, height: 18,
              background: 'var(--danger)',
              borderRadius: '50%',
              fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}>{pending}</div>
          )}
        </div>
      </div>
    </header>
  );
}
