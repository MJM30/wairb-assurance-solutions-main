import { useState, useCallback } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepProgress from "@/components/StepProgress";
import ClientInfoForm, { ClientInfo } from "@/components/ClientInfoForm";
import InsuranceTypeSelector from "@/components/InsuranceTypeSelector";
import HabitationForm from "@/components/forms/HabitationForm";
import ProfessionnelleForm from "@/components/forms/ProfessionnelleForm";
import PVTForm from "@/components/forms/PVTForm";
import AutoForm from "@/components/forms/AutoForm";

interface MultiStepFormProps {
  open: boolean;
  onClose: () => void;
  preselectedType?: string;
}

const generateRef = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "WAIRB-";
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
};

const MultiStepForm = ({ open, onClose, preselectedType }: MultiStepFormProps) => {
  const [step, setStep] = useState(1);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    nom: "", email: "", telephone: "", adressePhysique: "",
    adressePostale: "", domaineActivite: "", ville: "", pays: "RDC",
  });
  const [insuranceType, setInsuranceType] = useState(preselectedType || "");
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const handleSelectType = useCallback((type: string) => {
    setInsuranceType(type);
    setStep(3);
  }, []);

  const handleSubmit = useCallback((_data: Record<string, unknown>) => {
    const ref = generateRef();
    setRefNumber(ref);
    setSubmitted(true);
  }, []);

  const resetForm = useCallback(() => {
    setStep(1);
    setClientInfo({ nom: "", email: "", telephone: "", adressePhysique: "", adressePostale: "", domaineActivite: "", ville: "", pays: "RDC" });
    setInsuranceType("");
    setSubmitted(false);
    setRefNumber("");
    onClose();
  }, [onClose]);

  const stepLabels = ["Informations", "Type d'assurance", "Formulaire"];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 backdrop-blur-sm overflow-y-auto py-6 transition-opacity duration-[2000ms] ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={(e) => e.target === e.currentTarget && resetForm()}
    >
      <div className={`bg-card w-full max-w-3xl mx-4 rounded-xl border card-shadow-lg reveal ${open ? "active" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Soumettre une demande d'assurance
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Remplissez le formulaire ci-dessous</p>
          </div>
          <button onClick={resetForm} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="mx-auto w-16 h-16 rounded-xl bg-accent flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                Demande envoyée avec succès !
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Votre demande a été enregistrée. Notre équipe vous contactera sous 24h.
              </p>
              <div className="inline-block px-5 py-3 rounded-xl bg-accent border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Numéro de référence</p>
                <p className="text-lg font-extrabold text-accent-foreground font-mono mt-0.5">{refNumber}</p>
              </div>
              <div>
                <Button onClick={resetForm} className="rounded-lg">Fermer</Button>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
