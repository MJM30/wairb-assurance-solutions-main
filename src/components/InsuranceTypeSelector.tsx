import { Home, Building2, AlertTriangle, Car, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const types = [
  { id: "habitation", icon: Home, title: "Assurance Habitation", desc: "Multirisque habitation", badge: "Particulier" },
  { id: "professionnelle", icon: Building2, title: "Multirisque Professionnelle", desc: "Protection entreprise", badge: "Entreprise" },
  { id: "pvt", icon: AlertTriangle, title: "Violence Politique & Terrorisme", desc: "Risques spéciaux (PVT)", badge: "Spécialisé" },
  { id: "auto", icon: Car, title: "Assurance Automobile", desc: "Véhicules et RC auto", badge: "Véhicule" },
];

interface InsuranceTypeSelectorProps {
  onSelect: (type: string) => void;
  onBack: () => void;
}

const InsuranceTypeSelector = ({ onSelect, onBack }: InsuranceTypeSelectorProps) => {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-foreground">Type d'assurance</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Sélectionnez le type d'assurance souhaité.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((t) => (
          <div
            key={t.id}
            className="group bg-background border rounded-xl p-5 hover:border-primary/30 hover:card-shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => onSelect(t.id)}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <t.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-foreground">{t.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-foreground mt-2 group-hover:gap-2.5 transition-all">
                  Sélectionner <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start pt-2">
        <Button variant="outline" onClick={onBack} className="gap-2 rounded-lg text-sm">
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour
        </Button>
      </div>
    </div>
  );
};

export default InsuranceTypeSelector;
