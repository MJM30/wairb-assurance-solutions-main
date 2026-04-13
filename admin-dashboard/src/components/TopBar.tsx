import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Clock, ArrowRight } from 'lucide-react';
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
  const navigate = useNavigate();
  const title = titles[pathname] ?? 'WAIRB Admin';
  const clients = getAllClients();
  const pendingClients = clients.filter(c => c.statut === 'en_attente');
  const pending = pendingClients.length;
  const todayVisitors = getTodayVisitors();

  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button 
            className="btn btn-ghost" 
            style={{ 
              width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', 
              justifyContent: 'center', borderRadius: 8, 
              background: showNotifs ? 'var(--bg-card-hover)' : 'transparent' 
            }}
            onClick={() => setShowNotifs(!showNotifs)}
          >
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
              pointerEvents: 'none',
            }}>{pending}</div>
          )}

          {showNotifs && (
            <div className="card" style={{
              position: 'absolute', top: 46, right: 0, width: 320, zIndex: 100,
              boxShadow: '0 12px 32px rgba(0,0,0,0.4)', padding: 0,
              animation: 'fadeInUp 0.15s ease',
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</span>
                <span className="badge badge-yellow">{pending} en attente</span>
              </div>
              
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {pendingClients.length > 0 ? pendingClients.slice(0, 5).map(current => (
                  <div key={current.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s' }} 
                       onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                       onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                       onClick={() => { setShowNotifs(false); navigate('/clients'); }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--warning)' }}>
                        <Clock size={14} />
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Paiement en attente</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>M./Mme <strong style={{color: 'var(--text-secondary)'}}>{current.nom}</strong> est en attente de paiement ({current.typeAssuranceLabel}).</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
                    Aucune notification pour le moment.
                  </div>
                )}
              </div>
              
              {pendingClients.length > 0 && (
                <div style={{ padding: 10, borderTop: '1px solid var(--border)' }}>
                  <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }} onClick={() => { setShowNotifs(false); navigate('/clients'); }}>
                    Consulter les clients <ArrowRight size={14} style={{ marginLeft: 4 }} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
