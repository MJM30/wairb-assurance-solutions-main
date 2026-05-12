import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { setAdminRole, getAllUsers, type AdminRole, type WairbUser } from '../lib/storage';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const users = getAllUsers();
      const user = users.find(u => u.email === email && u.password === password);
      let role: AdminRole | null = user ? user.role : null;

      if (user && role) {
        localStorage.setItem('wairb_admin_auth', 'true');
        localStorage.setItem('wairb_user_id', user.id);
        setAdminRole(role);
        // By default send to dashboard. We will redirect in App.tsx if needed
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
      setLoading(false);
    }, 900);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, var(--info-bg) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />

      <div style={{
        width: '100%', maxWidth: 420,
        padding: 32,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)',
        position: 'relative',
        animation: 'fadeInUp 0.5s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: '100%',
            height: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <img src="/images/img_logo.jpeg" alt="WAIRB Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '60px' }} />
          </div>
          <h1 style={{
            fontSize: 22, fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>WAIRB Admin</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            Tableau de bord — Accès réservé
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Email */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Adresse email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{
                position: 'absolute', left: 12, top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }} />
              <input
                type="email"
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@wairbdrc.com"
                required
                style={{ width: '100%', paddingLeft: 36 }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{
                position: 'absolute', left: 12, top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }} />
              <input
                type={showPwd ? 'text' : 'password'}
                className="input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', paddingLeft: 36, paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: 'absolute', right: 10, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 12px',
              background: 'var(--danger-bg)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 8,
              fontSize: 12, color: 'var(--danger)',
            }}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%', justifyContent: 'center', height: 44,
              fontSize: 14, marginTop: 4,
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Credentials Hint */}
        <div style={{
          marginTop: 20,
          padding: '10px 14px',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          fontSize: 11,
          color: 'var(--text-muted)',
          display: 'flex', flexDirection: 'column', gap: 6
        }}>
          <div><strong style={{ color: 'var(--text-secondary)' }}>Admin :</strong> admin@wairbdrc.com / Wairb@2024</div>
          <div><strong style={{ color: 'var(--text-secondary)' }}>Percepteur :</strong> percepteur@wairbdrc.com / Wairb@2024</div>
          <div><strong style={{ color: 'var(--text-secondary)' }}>Financier :</strong> financier@wairbdrc.com / Wairb@2024</div>
        </div>
      </div>
    </div>
  );
}
