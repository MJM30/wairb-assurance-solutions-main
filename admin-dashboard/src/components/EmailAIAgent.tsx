import { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Mail, Check, RotateCw, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { type WairbClient, getInsurerEmail, saveInsurerEmail } from '../lib/storage';

interface EmailAIAgentProps {
  client: WairbClient;
  onClose: () => void;
}

export default function EmailAIAgent({ client, onClose }: EmailAIAgentProps) {
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState<'formel' | 'detaille'>('formel');
  const [copied, setCopied] = useState(false);
  const [content, setContent] = useState('');
  const [insurerEmail, setInsurerEmail] = useState(() => getInsurerEmail());
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const generateEmail = (v: 'formel' | 'detaille') => {
    const dateStr = client.datePaiement ? new Date(client.datePaiement).toLocaleDateString('fr-FR') : 'ce jour';
    
    if (v === 'formel') {
      return `Objet : Confirmation de paiement - ${client.nom} (Matricule : ${client.matricule})

Madame, Monsieur,

Nous vous informons par la présente que notre client, M./Mme ${client.nom}, a procédé au règlement de sa prime d'assurance pour le contrat "${client.typeAssuranceLabel}".

Détails de l'opération :
- Matricule : ${client.matricule}
- Date du paiement : ${dateStr}
- Montant : $${client.montantPaye?.toLocaleString()} USD

Le dossier est désormais complet et validé par nos services.

Cordialement,
L'équipe WAIRB Administration`;
    } else {
      return `Objet : Notification de validation de contrat et transfert de fonds - ${client.nom}

À l'attention du service des adhésions,

Nous avons le plaisir de vous confirmer que le client ${client.nom}, identifié sous le matricule ${client.matricule}, a finalisé le processus de paiement pour son assurance "${client.typeAssuranceLabel}".

Le paiement d'un montant de $${client.montantPaye?.toLocaleString()} USD a été reçu et validé en date du ${dateStr}. 

Conformément à nos accords de partenariat, nous vous prions de bien vouloir mettre à jour le statut du contrat dans votre base de données et de procéder à l'émission définitive des documents de police si nécessaire.

Informations complémentaires du client :
- Email : ${client.email}
- Téléphone : ${client.telephone}
- Ville : ${client.ville}

Nous restons à votre disposition pour toute information complémentaire.

Bien cordialement,
Direction Financière WAIRB`;
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setContent(generateEmail(version));
      setLoading(false);
    }, 1500); // Simulate AI thinking
    return () => clearTimeout(timer);
  }, [version, client]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    // Save current email as default before sending
    saveInsurerEmail(insurerEmail);
    
    const lines = content.split('\n');
    const subjectLine = lines.find(l => l.startsWith('Objet : '));
    const subject = subjectLine ? subjectLine.replace('Objet : ', '') : `Confirmation de paiement - ${client.nom}`;
    const body = lines.filter(l => !l.startsWith('Objet : ')).join('\n').trim();
    
    window.location.href = `mailto:${insurerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const toggleEmailEdit = () => {
    if (isEditingEmail) {
      saveInsurerEmail(insurerEmail);
    }
    setIsEditingEmail(!isEditingEmail);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 600, border: '1px solid var(--accent-border)' }}>
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid var(--border)', 
          background: 'linear-gradient(90deg, var(--bg-card) 0%, var(--accent-bg) 100%)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ 
              width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Sparkles size={18} color="#000" />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Agent AI WAIRB</h2>
              <p style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase' }}>Rédaction Automatisée</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <div style={{ padding: 24 }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: 4, borderRadius: 10, marginBottom: 20 }}>
            <button 
              onClick={() => setVersion('formel')}
              style={{ 
                flex: 1, padding: '8px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600,
                background: version === 'formel' ? 'var(--bg-card)' : 'transparent',
                color: version === 'formel' ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              Version Formelle
            </button>
            <button 
              onClick={() => setVersion('detaille')}
              style={{ 
                flex: 1, padding: '8px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600,
                background: version === 'detaille' ? 'var(--bg-card)' : 'transparent',
                color: version === 'detaille' ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              Version Détaillée
            </button>
          </div>

          {loading ? (
            <div style={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <RotateCw size={32} className="animate-spin" style={{ color: 'var(--accent)' }} />
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>L'IA analyse le dossier et rédige le brouillon...</p>
            </div>
          ) : (
            <div className="animate-in">
              <div style={{ position: 'relative' }}>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ 
                    width: '100%', height: 300, background: 'var(--bg-primary)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: 16, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6,
                    resize: 'none', outline: 'none', fontFamily: 'inherit'
                  }}
                />
                <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: 8 }}>
                   <button 
                    onClick={handleCopy}
                    style={{ 
                      padding: '6px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)',
                      borderRadius: 6, color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6
                    }}
                  >
                    {copied ? <Check size={12} color="var(--accent)" /> : <Copy size={12} />}
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, marginRight: 16 }}>
                    <p style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Destinataire (Assureur)</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {isEditingEmail ? (
                        <input 
                          value={insurerEmail}
                          onChange={(e) => setInsurerEmail(e.target.value)}
                          onBlur={toggleEmailEdit}
                          autoFocus
                          style={{ 
                            background: 'var(--bg-card)', border: '1px solid var(--accent)', borderRadius: 4,
                            padding: '2px 8px', color: 'var(--text-primary)', fontSize: 13, width: '100%', outline: 'none'
                          }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={toggleEmailEdit}>
                          <p style={{ fontSize: 13, fontWeight: 600 }}>{insurerEmail}</p>
                          <Edit2 size={12} color="var(--text-muted)" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button onClick={handleSend} style={{ gap: 8 }}>
                    <Mail size={16} /> Envoyer via Email
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
