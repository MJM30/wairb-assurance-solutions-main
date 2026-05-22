import { useState, useCallback } from 'react';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';
import { saveClient, generateMatricule, getTypeLabel, type WairbClient } from '../lib/storage';
import { Button } from './ui/button';
import StepProgress from './StepProgress';
import ClientInfoForm, { type ClientInfo } from './ClientInfoForm';
import InsuranceTypeSelector from './InsuranceTypeSelector';
import HabitationForm from './forms/HabitationForm';
import ProfessionnelleForm from './forms/ProfessionnelleForm';
import PVTForm from './forms/PVTForm';
import AutoForm from './forms/AutoForm';
import CautionForm from './forms/CautionForm';
import SanteForm from './forms/SanteForm';
import RCManifestationForm from './forms/RCManifestationForm';
import RCProfessionnelleForm from './forms/RCProfessionnelleForm';
import TousRisquesChantiersForm from './forms/TousRisquesChantiersForm';
import ManipulationProduitsPetroliersForm from './forms/ManipulationProduitsPetroliersForm';

interface NewClientModalProps {
  onClose: () => void;
  onRefresh: () => void;
}

export default function NewClientModal({ onClose, onRefresh }: NewClientModalProps) {
  const [step, setStep] = useState(1);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    nom: '', email: '', telephone: '', adressePhysique: '',
    adressePostale: '', domaineActivite: '', ville: 'Kinshasa', pays: 'RDC',
  });
  const [insuranceType, setInsuranceType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const handleSelectType = useCallback((type: string) => {
    setInsuranceType(type);
    setStep(3);
  }, []);

  const handleSubmit = useCallback((data: Record<string, unknown>) => {
    const matricule = generateMatricule(insuranceType);
    setRefNumber(matricule);
    
    const newClient: WairbClient = {
      id: `cli_${Date.now()}`,
      nom: clientInfo.nom,
      email: clientInfo.email,
      telephone: clientInfo.telephone,
      adressePhysique: clientInfo.adressePhysique,
      adressePostale: clientInfo.adressePostale,
      domaineActivite: clientInfo.domaineActivite,
      ville: clientInfo.ville,
      pays: clientInfo.pays,
      typeAssurance: insuranceType,
      typeAssuranceLabel: getTypeLabel(insuranceType),
      matricule,
      dateInscription: new Date().toISOString(),
      statut: 'en_attente',
      detailsAssurance: data,
    };

    saveClient(newClient);
    setSubmitted(true);
    onRefresh();
  }, [clientInfo, insuranceType, onRefresh]);

  const resetForm = useCallback(() => {
    setStep(1);
    setClientInfo({ nom: '', email: '', telephone: '', adressePhysique: '', adressePostale: '', domaineActivite: '', ville: 'Kinshasa', pays: 'RDC' });
    setInsuranceType('');
    setSubmitted(false);
    onClose();
  }, [onClose]);

  const stepLabels = ["Informations", "Type d'assurance", "Détails"];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && resetForm()}>
      <div className="modal-box" style={{ maxWidth: 700 }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
            {submitted ? <CheckCircle2 size={20} color="var(--accent)" /> : <UserPlus size={20} color="var(--accent)" />} 
            {submitted ? "Inscription Réussie" : "Inscrire un Nouveau Client"}
          </h2>
          <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ 
                width: 64, height: 64, borderRadius: 16, backgroundColor: 'var(--accent-bg)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' 
              }}>
                <CheckCircle2 size={32} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Le client a été inscrit !</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                Le dossier a été créé avec succès dans la base de données.
              </p>
              <div style={{ 
                display: 'inline-block', padding: '12px 20px', borderRadius: 12, 
                backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)', marginBottom: 24 
              }}>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
                  Numéro de Matricule
                </p>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)', fontFamily: 'monospace' }}>
                  {refNumber}
                </p>
              </div>
              <div>
                <Button onClick={resetForm} style={{ width: '100%' }}>Fermer</Button>
              </div>
            </div>
          ) : (
            <>
              <StepProgress currentStep={step} totalSteps={3} labels={stepLabels} />

              {step === 1 && (
                <ClientInfoForm data={clientInfo} onChange={setClientInfo} onNext={() => setStep(2)} />
              )}
              {step === 2 && (
                <InsuranceTypeSelector onSelect={handleSelectType} onBack={() => setStep(1)} />
              )}
              {step === 3 && insuranceType === "habitation" && (
                <HabitationForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "professionnelle" && (
                <ProfessionnelleForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "pvt" && (
                <PVTForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "auto" && (
                <AutoForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "caution" && (
                <CautionForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "sante" && (
                <SanteForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "rc_manifestation" && (
                <RCManifestationForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "rc_pro" && (
                <RCProfessionnelleForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "trc" && (
                <TousRisquesChantiersForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
              {step === 3 && insuranceType === "petrole" && (
                <ManipulationProduitsPetroliersForm onBack={() => setStep(2)} onSubmit={handleSubmit} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
