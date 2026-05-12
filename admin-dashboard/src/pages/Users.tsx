import { useState, useRef } from 'react';
import { UserPlus, Mail, Shield, Trash2, X, AlertCircle, Key, Phone, MapPin, Camera, Eye, User } from 'lucide-react';
import { getAllUsers, saveUser, deleteUser, type WairbUser, type AdminRole } from '../lib/storage';

export default function Users() {
  const [users, setUsers] = useState<WairbUser[]>(getAllUsers());
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<WairbUser | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'percepteur' as AdminRole,
    phone: '',
    address: '',
    avatar: ''
  });

  function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (users.some(u => u.email === formData.email)) {
      setError('Cet email est déjà utilisé par un autre compte.');
      return;
    }

    const newUser: WairbUser = {
      id: `usr_${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString()
    };

    saveUser(newUser);
    setUsers(getAllUsers());
    setShowModal(false);
    resetForm();
  }

  function resetForm() {
    setFormData({ 
      name: '', email: '', password: '', role: 'percepteur', 
      phone: '', address: '', avatar: '' 
    });
  }

  function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const adminCount = users.filter(u => u.role === 'admin').length;
    const userToDelete = users.find(u => u.id === id);
    
    if (userToDelete?.role === 'admin' && adminCount <= 1) {
      alert("Impossible de supprimer le dernier administrateur.");
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      deleteUser(id);
      setUsers(getAllUsers());
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 className="section-title">Gestion des comptes utilisateur</h2>
          <p className="section-subtitle">Gérez les accès des percepteurs et des financiers</p>
        </div>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          <UserPlus size={18} />
          Nouveau compte
        </button>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'var(--accent-bg)', color: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 13, overflow: 'hidden',
                      border: '1px solid var(--accent-border)'
                    }}>
                      {user.avatar ? (
                        <img src={user.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        user.name[0]
                      )}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone || '-'}</td>
                <td>
                  <span className={`badge ${
                    user.role === 'admin' ? 'badge-blue' : 
                    user.role === 'percepteur' ? 'badge-yellow' : 'badge-green'
                  }`}>
                    {user.role === 'admin' ? 'Administrateur' : 
                     user.role === 'percepteur' ? 'Percepteur' : 'Financier'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button className="btn btn-ghost" style={{ padding: 6 }}>
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn btn-ghost" 
                      style={{ color: 'var(--danger)', padding: 6 }}
                      onClick={(e) => handleDelete(user.id, e)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Fiche de l'employé (Détails) */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-box" style={{ 
            maxWidth: 480, 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border)',
            overflow: 'hidden'
          }} onClick={e => e.stopPropagation()}>
            
            {/* Header Banner */}
            <div style={{ 
              height: 100, 
              background: 'linear-gradient(135deg, var(--accent), #15803d)', 
              position: 'relative' 
            }}>
              <button 
                onClick={() => setSelectedUser(null)}
                style={{ 
                  position: 'absolute', top: 12, right: 12, 
                  background: 'rgba(0,0,0,0.2)', border: 'none', borderRadius: '50%',
                  width: 28, height: 28, cursor: 'pointer', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Profile Info */}
            <div style={{ padding: '0 32px 40px', textAlign: 'center', marginTop: -50 }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                background: 'var(--bg-card)', padding: 5,
                margin: '0 auto 16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 10
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', border: '2px solid var(--bg-card)'
                }}>
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent)' }}>
                      {selectedUser.name[0]}
                    </span>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>{selectedUser.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span className={`badge ${
                  selectedUser.role === 'admin' ? 'badge-blue' : 
                  selectedUser.role === 'percepteur' ? 'badge-yellow' : 'badge-green'
                }`} style={{ padding: '4px 12px', fontSize: 12 }}>
                  {selectedUser.role === 'admin' ? 'Administrateur' : 
                   selectedUser.role === 'percepteur' ? 'Percepteur' : 'Financier'}
                </span>
              </div>

              <div style={{ marginTop: 40, display: 'grid', gap: 24, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ 
                    width: 40, height: 40, borderRadius: 12, 
                    background: 'var(--accent-bg)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: 'var(--accent)', flexShrink: 0
                  }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Professionnel</label>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedUser.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ 
                    width: 40, height: 40, borderRadius: 12, 
                    background: 'var(--info-bg)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: 'var(--info)', flexShrink: 0
                  }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Téléphone</label>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedUser.phone || 'Non renseigné'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ 
                    width: 40, height: 40, borderRadius: 12, 
                    background: 'var(--warning-bg)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: 'var(--warning)', flexShrink: 0
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Adresse Physique</label>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedUser.address || 'Non renseignée'}</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                  Compte actif depuis le {new Date(selectedUser.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouveau Compte (Formulaire étendu) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 550 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Créer un nouveau compte</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser} style={{ padding: 24 }}>
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: 'var(--danger-bg)', borderRadius: 8, color: 'var(--danger)', fontSize: 12, marginBottom: 16 }}>
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                {/* Avatar Upload */}
                <div style={{ textAlign: 'center' }}>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width: 100, height: 100, borderRadius: 20, 
                      background: 'var(--bg-primary)', border: '2px dashed var(--border)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', overflow: 'hidden', position: 'relative'
                    }}
                  >
                    {formData.avatar ? (
                      <img src={formData.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <Camera size={24} color="var(--text-muted)" />
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Photo</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label className="section-subtitle" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Nom complet</label>
                    <input 
                      type="text" className="input" style={{ width: '100%' }} required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="ex: Jean Mukendi"
                    />
                  </div>
                  <div>
                    <label className="section-subtitle" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Rôle</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <button 
                        type="button" className="btn"
                        style={{ 
                          fontSize: 12, height: 36, justifyContent: 'center',
                          background: formData.role === 'percepteur' ? 'var(--accent-bg)' : 'var(--bg-primary)',
                          border: `1px solid ${formData.role === 'percepteur' ? 'var(--accent)' : 'var(--border)'}`,
                          color: formData.role === 'percepteur' ? 'var(--accent)' : 'var(--text-secondary)'
                        }}
                        onClick={() => setFormData({...formData, role: 'percepteur'})}
                      >Percepteur</button>
                      <button 
                        type="button" className="btn"
                        style={{ 
                          fontSize: 12, height: 36, justifyContent: 'center',
                          background: formData.role === 'financier' ? 'var(--accent-bg)' : 'var(--bg-primary)',
                          border: `1px solid ${formData.role === 'financier' ? 'var(--accent)' : 'var(--border)'}`,
                          color: formData.role === 'financier' ? 'var(--accent)' : 'var(--text-secondary)'
                        }}
                        onClick={() => setFormData({...formData, role: 'financier'})}
                      >Financier</button>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="section-subtitle" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Email</label>
                  <input 
                    type="email" className="input" style={{ width: '100%' }} required
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="email@wairbdrc.com"
                  />
                </div>
                <div>
                  <label className="section-subtitle" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Mot de passe</label>
                  <input 
                    type="text" className="input" style={{ width: '100%' }} required
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="Wairb@2024"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="section-subtitle" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Téléphone</label>
                  <input 
                    type="text" className="input" style={{ width: '100%' }} 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+243 ..."
                  />
                </div>
                <div>
                  <label className="section-subtitle" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Adresse</label>
                  <input 
                    type="text" className="input" style={{ width: '100%' }} 
                    value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Quartier, Commune"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Créer le compte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
