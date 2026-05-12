import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, Clock, ArrowRight, Sun, Moon, 
  User, Camera, X, Mail, Phone, MapPin, Key 
} from 'lucide-react';
import { getAllClients, getTodayVisitors, getAdminRole, getCurrentUser, saveUser, type WairbUser } from '../lib/storage';

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
  const role = getAdminRole();
  const [currentUser, setCurrentUser] = useState<WairbUser | null>(getCurrentUser());
  const userName = currentUser?.name || (role === 'admin' ? 'Fleury Ngoma' : role === 'percepteur' ? 'Moïse Kapend' : 'Chantal Mboyo');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('wairb_admin_theme') === 'dark');

  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('wairb_admin_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('wairb_admin_theme', 'light');
    }
  }, [isDark]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...currentUser, avatar: reader.result as string };
        saveUser(updatedUser);
        setCurrentUser(updatedUser);
        // Also update local users list if needed? saveUser already does it.
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && role === 'admin') {
      saveUser(currentUser);
      setShowProfileModal(false);
    }
  };

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

        {/* Theme Toggle */}
        <button 
          className="btn btn-ghost" 
          style={{ 
            width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', 
            justifyContent: 'center', borderRadius: 8,
          }}
          onClick={() => setIsDark(!isDark)}
          title={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

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

        {/* User Profile */}
        <div 
          onClick={() => {
            const user = getCurrentUser();
            if (user) {
              setCurrentUser(user);
              setShowProfileModal(true);
            } else {
              alert("Erreur: Impossible de charger le profil. Veuillez vous reconnecter.");
            }
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            paddingLeft: 12, borderLeft: '1px solid var(--border)',
            marginLeft: 4, cursor: 'pointer'
          }}
        >
          <div style={{ textAlign: 'right', display: 'block' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{userName}</p>
            <p style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600, textTransform: 'capitalize' }}>{role}</p>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'var(--accent-bg)',
            border: '1px solid var(--accent-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: 'var(--accent)',
            flexShrink: 0, overflow: 'hidden'
          }}>
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              userName[0]
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && currentUser && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-box" style={{ maxWidth: 450, padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Mon Profil</h3>
              <button onClick={() => setShowProfileModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 12px' }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    background: 'var(--accent-bg)', border: '2px solid var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: 40, fontWeight: 800, color: 'var(--accent)' }}>{userName[0]}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--accent)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid var(--bg-card)', cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                    title="Changer de photo"
                  >
                    <Camera size={16} />
                  </button>
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarChange} />
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 800 }}>{currentUser.name}</h4>
                <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase' }}>{currentUser.role}</p>
              </div>

              <form onSubmit={handleUpdateUser} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6, display: 'block' }}>NOM COMPLET</label>
                  <input 
                    type="text" className="input" style={{ width: '100%' }}
                    value={currentUser.name}
                    onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                    disabled={role !== 'admin'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6, display: 'block' }}>EMAIL</label>
                  <input 
                    type="email" className="input" style={{ width: '100%' }}
                    value={currentUser.email}
                    onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                    disabled={role !== 'admin'}
                  />
                </div>
                {role === 'admin' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6, display: 'block' }}>TÉLÉPHONE</label>
                        <input type="text" className="input" style={{ width: '100%' }} value={currentUser.phone || ''} onChange={e => setCurrentUser({...currentUser, phone: e.target.value})} />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6, display: 'block' }}>MOT DE PASSE</label>
                        <input type="password" className="input" style={{ width: '100%' }} value={currentUser.password} onChange={e => setCurrentUser({...currentUser, password: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                      Enregistrer les modifications
                    </button>
                  </>
                )}
                {role !== 'admin' && (
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', marginTop: 8 }}>
                    Seul l'administrateur peut modifier vos informations personnelles.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
