import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CheckCircle, BarChart3,
  Handshake, Wallet, Activity, LogOut, Shield,
} from 'lucide-react';
import { getAdminRole } from '../lib/storage';

const allNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de bord', end: true, roles: ['admin', 'financier'] },
  { to: '/clients', icon: Users, label: 'Tous les clients', roles: ['admin', 'percepteur'] },
  { to: '/clients-payes', icon: CheckCircle, label: 'Clients payés', roles: ['admin', 'financier'] },
  { to: '/assurances', icon: BarChart3, label: 'Assurances', roles: ['admin', 'financier'] },
  { to: '/partenaires', icon: Handshake, label: 'Partenaires', roles: ['admin'] },
  { to: '/budget', icon: Wallet, label: 'Budget', roles: ['admin', 'financier'] },
  { to: '/visiteurs', icon: Activity, label: 'Visiteurs', roles: ['admin'] },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const role = getAdminRole();
  const navItems = allNavItems.filter(item => item.roles.includes(role));

  const roleLabels: Record<string, string> = {
    admin: 'Administrateur', percepteur: 'Percepteur (Caissier)', financier: 'Financier'
  };
  const roleMails: Record<string, string> = {
    admin: 'admin@wairbdrc.com', percepteur: 'percepteur@wairbdrc.com', financier: 'financier@wairbdrc.com'
  };

  function handleLogout() {
    localStorage.removeItem('wairb_admin_auth');
    navigate('/login');
  }

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 16px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: 'var(--accent)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Shield size={20} color="#000" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              WAIRB
            </div>
            <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Administration
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '8px 8px 4px' }}>
          Navigation
        </div>
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          padding: '10px 12px',
          background: 'var(--bg-card)',
          borderRadius: 10,
          border: '1px solid var(--border)',
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, var(--accent), #0d9e6a)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#000',
            }}>{roleLabels[role]?.[0] || 'A'}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{roleLabels[role]}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{roleMails[role]}</div>
            </div>
          </div>
        </div>
        <button className="nav-item" onClick={handleLogout} style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <LogOut size={16} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
