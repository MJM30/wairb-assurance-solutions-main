import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, Download, CheckCircle, Clock } from 'lucide-react';
import { getAllClients } from '../lib/storage';

const BUDGET_TARGET = 50000;

export default function ExportModal({ onClose }: { onClose: () => void }) {
  const [period, setPeriod] = useState<number>(30);

  const periods = [
    { label: 'Hebdomadaire', days: 7 },
    { label: 'Mensuel', days: 30 },
    { label: 'Trimestriel', days: 90 },
    { label: 'Semestriel', days: 180 },
    { label: 'Annuel', days: 365 }
  ];

  // Calculs sur base de la période
  const allClients = getAllClients();
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - period);
  
  const relevantClients = allClients.filter(c => 
    new Date(c.dateInscription) >= threshold || (c.datePaiement && new Date(c.datePaiement) >= threshold)
  );

  const paid = relevantClients.filter(c => c.statut === 'paye');
  const pending = relevantClients.filter(c => c.statut === 'en_attente');
  const revenue = paid.reduce((s, c) => s + (c.montantPaye || 0), 0);
  
  const target = Math.round((BUDGET_TARGET / 365) * period);
  const diff = revenue - target;
  const diffPct = target > 0 ? Math.round((diff / target) * 100) : 0;

  // Par assurance
  const typesAcc = paid.reduce((acc, c) => {
    acc[c.typeAssuranceLabel] = (acc[c.typeAssuranceLabel] || 0) + (c.montantPaye || 0);
    return acc;
  }, {} as Record<string, number>);

  // Par assureur (simulation car données non rattachées)
  const typeMap: Record<string, string[]> = {
    'Assurance Automobile': ['AXA Assurances', 'SONAS'],
    'Assurance Habitation': ['SONAS', 'AXA Assurances'],
    'Violence Politique & Terrorisme': ['Activa Assurances', 'SONAS'],
    'Multirisque Professionnelle': ['Activa Assurances', 'AXA Assurances']
  };

  const assureursAcc: Record<string, number> = {};
  paid.forEach(c => {
    const assureurs = typeMap[c.typeAssuranceLabel] || ['SONAS'];
    const assigned = assureurs[Math.abs(c.id.charCodeAt(c.id.length - 1)) % assureurs.length];
    assureursAcc[assigned] = (assureursAcc[assigned] || 0) + (c.montantPaye || 0);
  });

  return (
    <>
      {/* Modal interface for config */}
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-box" style={{ maxWidth: 450 }}>
          <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
               <FileText size={20} color="var(--accent)" /> Exporter Rapport PDF
            </h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
          </div>
          
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Sélectionnez la période pour générer le rapport PDF. Celui-ci s'imprimera avec un format professionnel adapté à du format A4.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {periods.map(p => (
                <button 
                  key={p.days} 
                  className="btn" 
                  style={{ 
                    justifyContent: 'center', 
                    background: period === p.days ? 'var(--accent)' : 'transparent',
                    color: period === p.days ? '#000' : 'var(--text-primary)',
                    border: `1px solid ${period === p.days ? 'var(--accent)' : 'var(--border)'}`
                  }}
                  onClick={() => setPeriod(p.days)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <button className="btn btn-primary" style={{ height: 44, justifyContent: 'center', marginTop: 10, fontSize: 14 }} onClick={() => window.print()}>
              <Download size={16} /> Générer et Sauvegarder en PDF
            </button>
          </div>
        </div>
      </div>

      {/* Hidden layout specifically for print (A4 output) */}
      {createPortal(
        <div id="print-report" style={{ background: '#fff', color: '#000', padding: '40px', fontFamily: 'sans-serif', margin: 0 }}>
          
          {/* Header */}
          <div style={{ borderBottom: '2px solid #16c784', paddingBottom: 20, marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#111827' }}>WAIRB Assurances</h1>
              <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0 0' }}>Rapport financier et des inscriptions</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#111827' }}>Période : {periods.find(p => p.days === period)?.label}</p>
              <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0 0' }}>Édité le {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>

          {/* Global KPIs */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
            <div style={{ flex: 1, padding: 15, background: '#f3f4f6', borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', color: '#4b5563', margin: '0 0 6px 0', fontWeight: 700 }}>Total encaissé</p>
              <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color: '#16a34a' }}>${revenue.toLocaleString()} USD</p>
            </div>
            <div style={{ flex: 1, padding: 15, background: '#f3f4f6', borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', color: '#4b5563', margin: '0 0 6px 0', fontWeight: 700 }}>Prévisions ({periods.find(p => p.days === period)?.label})</p>
              <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color: '#2563eb' }}>${target.toLocaleString()} USD</p>
            </div>
            <div style={{ flex: 1, padding: 15, background: diff >= 0 ? '#dcfce7' : '#fee2e2', borderRadius: 8, border: `1px solid ${diff >= 0 ? '#bbf7d0' : '#fecaca'}` }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', color: diff >= 0 ? '#166534' : '#991b1b', margin: '0 0 6px 0', fontWeight: 700 }}>Comparatif Prévisionnel</p>
              <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color: diff >= 0 ? '#15803d' : '#b91c1c' }}>
                {diff > 0 ? '+' : ''}{diffPct.toLocaleString()}% (${Math.abs(diff).toLocaleString()})
              </p>
            </div>
          </div>

          {/* Performances Split Layout */}
          <div style={{ display: 'flex', gap: 30, marginBottom: 40 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 15, borderBottom: '1px solid #e5e7eb', paddingBottom: 8, marginBottom: 16 }}>Performance par Assurance</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <tbody>
                  {Object.entries(typesAcc).sort((a,b)=>b[1]-a[1]).map(([type, amount]) => (
                    <tr key={type} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 0', color: '#374151' }}>{type}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: '#111827' }}>${amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  {Object.keys(typesAcc).length === 0 && <tr><td colSpan={2} style={{ padding: 12, textAlign: 'center', color: '#9ca3af' }}>Aucune donnée</td></tr>}
                </tbody>
              </table>
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 15, borderBottom: '1px solid #e5e7eb', paddingBottom: 8, marginBottom: 16 }}>Performance par Assureur (Partenaire)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <tbody>
                  {Object.entries(assureursAcc).sort((a,b)=>b[1]-a[1]).map(([assureur, amount]) => (
                    <tr key={assureur} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 0', color: '#374151' }}>{assureur}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: '#111827' }}>${amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  {Object.keys(assureursAcc).length === 0 && <tr><td colSpan={2} style={{ padding: 12, textAlign: 'center', color: '#9ca3af' }}>Aucune donnée</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clients Payés */}
          <h3 style={{ fontSize: 15, background: '#f9fafb', padding: '8px 12px', borderLeft: '4px solid #16a34a', margin: '0 0 16px 0', color: '#111827' }}>
            Clients Ayant Payé ({paid.length})
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, marginBottom: 40 }}>
            <thead>
              <tr style={{ background: '#f3f4f6', color: '#374151', textAlign: 'left' }}>
                <th style={{ padding: 8 }}>Matricule</th>
                <th style={{ padding: 8 }}>Nom</th>
                <th style={{ padding: 8 }}>Type</th>
                <th style={{ padding: 8 }}>Montant</th>
              </tr>
            </thead>
            <tbody>
              {paid.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: 8, fontFamily: 'monospace' }}>{c.matricule}</td>
                  <td style={{ padding: 8, fontWeight: 600, color: '#111827' }}>{c.nom}</td>
                  <td style={{ padding: 8, color: '#374151' }}>{c.typeAssuranceLabel}</td>
                  <td style={{ padding: 8, fontWeight: 700, color: '#16a34a' }}>${c.montantPaye}</td>
                </tr>
              ))}
              {paid.length === 0 && <tr><td colSpan={4} style={{ padding: 12, textAlign: 'center', color: '#9ca3af' }}>Aucun paiement ce mois-ci</td></tr>}
            </tbody>
          </table>

          {/* Clients en attente */}
          <h3 style={{ fontSize: 15, background: '#f9fafb', padding: '8px 12px', borderLeft: '4px solid #f59e0b', margin: '0 0 16px 0', color: '#111827' }}>
            Clients En Attente de Paiement ({pending.length})
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead>
              <tr style={{ background: '#f3f4f6', color: '#374151', textAlign: 'left' }}>
                <th style={{ padding: 8 }}>Matricule</th>
                <th style={{ padding: 8 }}>Nom</th>
                <th style={{ padding: 8 }}>Type / Détails</th>
                <th style={{ padding: 8 }}>Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: 8, fontFamily: 'monospace' }}>{c.matricule}</td>
                  <td style={{ padding: 8, fontWeight: 600, color: '#111827' }}>{c.nom}</td>
                  <td style={{ padding: 8, color: '#374151' }}>{c.typeAssuranceLabel}</td>
                  <td style={{ padding: 8, color: '#374151' }}>{new Date(c.dateInscription).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
              {pending.length === 0 && <tr><td colSpan={4} style={{ padding: 12, textAlign: 'center', color: '#9ca3af' }}>Aucune attente</td></tr>}
            </tbody>
          </table>

        </div>,
        document.body
      )}
    </>
  );
}
